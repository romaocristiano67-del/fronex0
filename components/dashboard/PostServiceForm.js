"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '../../utils/supabase/client';
import { DAILY_RATE_KZ } from '../../config/pricing';

/**
 * PostServiceForm — Formulario para criar um novo anuncio no marketplace.
 *
 * Antes de permitir a submissao, o componente verifica no lado do cliente
 * se o utilizador tem permissao (plano activo com slots disponiveis).
 * A validacao final e feita no servidor via Server Action.
 */
export const PostServiceForm = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [planInfo, setPlanInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  // Verifica o plano do utilizador ao carregar o componente
  useEffect(() => {
    async function checkPlan() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setPlanInfo({ allowed: false, reason: 'Sessao nao encontrada.' });
          setLoading(false);
          return;
        }

        // Verificar subscricao activa
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select(`
            id, status, ends_at,
            plan:subscription_plans ( name, slug, max_listings )
          `)
          .eq('user_id', user.id)
          .eq('status', 'active')
          .gte('ends_at', new Date().toISOString())
          .order('ends_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Contar anuncios existentes
        const { count } = await supabase
          .from('listings')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .in('status', ['active', 'pending', 'pending_review']);

        const planName = subscription?.plan?.name || 'Gratuito';
        const maxListings = subscription?.plan?.max_listings ?? 3;
        const used = count || 0;

        setPlanInfo({
          allowed: used < maxListings,
          planName,
          used,
          max: maxListings,
          reason: used >= maxListings
            ? `Atingiste o limite de ${maxListings} anuncios do plano ${planName}.`
            : null,
        });
      } catch {
        setPlanInfo({ allowed: true, planName: 'Gratuito', used: 0, max: 3 });
      }
      setLoading(false);
    }
    checkPlan();
  }, [supabase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Sessao expirada.');

      // Submeter via Server Action (importacao dinamica para evitar bundling no cliente)
      const formData = new FormData();
      formData.set('title', title);
      formData.set('price', price);
      formData.set('description', description);

      const { createPost } = await import('../../lib/actions/posts');
      const result = await createPost(formData);

      if (!result.success) {
        setMessage(result.error);
        setMessageType('error');
        return;
      }

      setMessage(result.message);
      setMessageType('success');
      setTitle('');
      setPrice('');
      setDescription('');
      setImageFile(null);

      // Actualizar contagem
      if (planInfo) {
        setPlanInfo(prev => ({ ...prev, used: prev.used + 1, allowed: prev.used + 1 < prev.max }));
      }
    } catch (error) {
      console.error(error);
      setMessage('Erro ao publicar o servico. Tenta novamente.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-xl md:p-8">
      <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white">Criar Novo Anuncio</h2>
          {!loading && planInfo && (
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
              <span className="font-medium text-white/70">{planInfo.planName}</span>
              <span className="text-white/30">|</span>
              <span>{planInfo.used}/{planInfo.max} anuncios</span>
            </div>
          )}
        </div>

        {/* Bloqueio por plano */}
        {!loading && planInfo && !planInfo.allowed && (
          <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 text-center backdrop-blur-md">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
              <svg className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <p className="mb-1 text-sm font-medium text-amber-400">{planInfo.reason}</p>
            <p className="mb-4 text-xs text-white/40">Desbloqueia mais anuncios a partir de {DAILY_RATE_KZ} Kz/dia.</p>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Ver Planos
            </a>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-indigo-400"></div>
          </div>
        )}

        {/* Feedback message */}
        {message && (
          <div className={`mb-6 rounded-lg p-4 text-sm font-medium ${
            messageType === 'error'
              ? 'border border-red-500/20 bg-red-500/10 text-red-400'
              : 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
          }`}>
            {message}
          </div>
        )}

        {/* Formulario (visivel apenas se tem permissao) */}
        {!loading && planInfo?.allowed && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-medium text-white/70">
                Titulo do Servico
              </label>
              <input
                type="text"
                id="title"
                required
                minLength={5}
                maxLength={100}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-indigo-500/50 focus:bg-white/10 focus:ring-1 focus:ring-indigo-500/50"
                placeholder="Ex: Desenvolvimento Web Personalizado"
              />
            </div>

            <div>
              <label htmlFor="price" className="mb-2 block text-sm font-medium text-white/70">
                Preco Base (Kz)
              </label>
              <input
                type="number"
                id="price"
                required
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-indigo-500/50 focus:bg-white/10 focus:ring-1 focus:ring-indigo-500/50"
                placeholder="Ex: 50000"
              />
            </div>

            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-medium text-white/70">
                Descricao do Servico
              </label>
              <textarea
                id="description"
                required
                rows={4}
                minLength={20}
                maxLength={2000}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-indigo-500/50 focus:bg-white/10 focus:ring-1 focus:ring-indigo-500/50"
                placeholder="Descreve detalhadamente o que esta incluido no teu servico..."
              />
            </div>

            <div>
              <label htmlFor="image" className="mb-2 block text-sm font-medium text-white/70">
                Imagem de Capa
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="block w-full rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm text-white/50 outline-none transition-all file:mr-4 file:rounded-full file:border-0 file:bg-indigo-500/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-400 hover:file:bg-indigo-500/30 focus:border-indigo-500/50"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center overflow-hidden rounded-xl bg-indigo-500 px-4 py-3 font-medium text-white transition-all hover:bg-indigo-600 disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    A Publicar...
                  </>
                ) : (
                  'Publicar Servico'
                )}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
