'use server';

/**
 * ==========================================================================
 * FRONEX MARKETPLACE — Server Actions para Anuncios (Posts / Listings)
 * ==========================================================================
 *
 * Estas funcoes correm exclusivamente no servidor (Next.js Server Actions).
 * Garantem que:
 *  1. O utilizador esta autenticado.
 *  2. O utilizador tem um plano de subscricao activo.
 *  3. O limite de anuncios do plano nao foi excedido.
 *
 * REGRA DE NEGOCIO:
 *  - Plano Gratuito: max 3 anuncios
 *  - Plano Semanal:  max 10 anuncios (700 Kz/dia × 7 = 4.900 Kz)
 *  - Plano Mensal:   max 50 anuncios (700 Kz/dia × 30 = 21.000 Kz)
 *  - Plano Anual:    ilimitado       (189.000 Kz com desconto de fidelidade)
 *
 * ==========================================================================
 */

import { createClient } from '@/utils/supabase/server';

// ---------------------------------------------------------------------------
// Constantes do plano gratuito (fallback quando nao ha subscricao)
// ---------------------------------------------------------------------------
const FREE_PLAN_MAX_LISTINGS = 3;

// ---------------------------------------------------------------------------
// Verificar se o utilizador tem subscricao activa
// ---------------------------------------------------------------------------
async function getActiveSubscription(supabase, userId) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select(`
      id,
      status,
      starts_at,
      ends_at,
      plan:subscription_plans (
        id,
        name,
        slug,
        price,
        duration_days,
        max_listings,
        features
      )
    `)
    .eq('user_id', userId)
    .eq('status', 'active')
    .gte('ends_at', new Date().toISOString())
    .order('ends_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('[getActiveSubscription] Erro:', error.message);
    return null;
  }

  return data;
}

// ---------------------------------------------------------------------------
// Contar anuncios activos do utilizador
// ---------------------------------------------------------------------------
async function countActiveListings(supabase, userId) {
  const { count, error } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .in('status', ['active', 'pending', 'pending_review']);

  if (error) {
    console.error('[countActiveListings] Erro:', error.message);
    return 0;
  }

  return count || 0;
}

// ---------------------------------------------------------------------------
// Validar se o utilizador pode publicar um novo anuncio
// ---------------------------------------------------------------------------
export async function validatePostPermission() {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      allowed: false,
      reason: 'Precisas de iniciar sessao para publicar anuncios.',
      planName: null,
      listingsUsed: 0,
      listingsMax: 0,
    };
  }

  const subscription = await getActiveSubscription(supabase, user.id);
  const currentCount = await countActiveListings(supabase, user.id);

  // Se nao tem subscricao paga activa, aplica-se o plano gratuito
  const planName = subscription?.plan?.name || 'Gratuito';
  const planSlug = subscription?.plan?.slug || 'free';
  const maxListings = subscription?.plan?.max_listings ?? FREE_PLAN_MAX_LISTINGS;

  if (currentCount >= maxListings) {
    return {
      allowed: false,
      reason: `Atingiste o limite de ${maxListings} anuncios do plano ${planName}. Faz upgrade para continuar a publicar.`,
      planName,
      planSlug,
      listingsUsed: currentCount,
      listingsMax: maxListings,
    };
  }

  return {
    allowed: true,
    reason: null,
    planName,
    planSlug,
    listingsUsed: currentCount,
    listingsMax: maxListings,
    endsAt: subscription?.ends_at || null,
  };
}

// ---------------------------------------------------------------------------
// Server Action: Criar um novo anuncio (com validacao de plano)
// ---------------------------------------------------------------------------
export async function createPost(formData) {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: 'Sessao expirada. Faz login novamente.' };
  }

  // 1. Verificar permissao de publicacao
  const permission = await validatePostPermission();
  if (!permission.allowed) {
    return { success: false, error: permission.reason };
  }

  // 2. Extrair dados do formulario
  const title = formData.get('title')?.toString().trim();
  const price = parseFloat(formData.get('price'));
  const description = formData.get('description')?.toString().trim();

  // 3. Validacoes basicas
  if (!title || title.length < 5 || title.length > 100) {
    return { success: false, error: 'O titulo deve ter entre 5 e 100 caracteres.' };
  }
  if (!description || description.length < 20 || description.length > 2000) {
    return { success: false, error: 'A descricao deve ter entre 20 e 2000 caracteres.' };
  }
  if (isNaN(price) || price < 0) {
    return { success: false, error: 'Preco invalido.' };
  }

  // 4. Inserir na base de dados
  const { data, error } = await supabase
    .from('listings')
    .insert({
      user_id: user.id,
      title,
      description,
      price,
      status: 'pending_review',
    })
    .select('id')
    .single();

  if (error) {
    console.error('[createPost] Erro ao inserir:', error.message);
    return { success: false, error: 'Erro ao criar o anuncio. Tenta novamente.' };
  }

  return {
    success: true,
    listingId: data.id,
    message: 'Anuncio criado com sucesso! Sera revisto em breve.',
  };
}
