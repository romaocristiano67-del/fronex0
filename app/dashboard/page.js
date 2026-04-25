import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { PostServiceForm } from '@/components/dashboard/PostServiceForm'
import Link from 'next/link'

// Evita prerender estatico — esta pagina requer autenticacao em runtime
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Painel de Controlo',
};

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  // Obter subscricao activa
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

  // Contar anuncios
  const { count: listingCount } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .in('status', ['active', 'pending', 'pending_review']);

  const planName = subscription?.plan?.name || 'Gratuito';
  const activeListings = listingCount || 0;

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">Bem-vindo(a), {user.user_metadata?.full_name || 'Utilizador'}</h1>
      <p className="mb-8 text-white/60">Este é o teu painel de controlo na Fronex.</p>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/20 blur-2xl"></div>
          <h3 className="mb-1 text-sm font-medium text-white/60">Status da Conta</h3>
          <p className="text-2xl font-semibold text-emerald-400">Ativa</p>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-indigo-500/20 blur-2xl"></div>
          <h3 className="mb-1 text-sm font-medium text-white/60">Anuncios Ativos</h3>
          <p className="text-2xl font-semibold text-white">{activeListings}</p>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-purple-500/20 blur-2xl"></div>
          <h3 className="mb-1 text-sm font-medium text-white/60">Plano Atual</h3>
          <p className="text-2xl font-semibold text-white">{planName}</p>
          <Link href="/pricing" className="mt-2 inline-block text-xs text-indigo-400 transition-colors hover:text-indigo-300">
            {planName === 'Gratuito' ? 'Fazer Upgrade →' : 'Gerir Plano →'}
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <h2 className="mb-4 text-xl font-semibold text-white">Atividade Recente</h2>
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-white/20 py-12">
            <p className="text-sm text-white/50">Nenhuma atividade recente encontrada.</p>
          </div>
        </div>

        <div>
          <PostServiceForm />
        </div>
      </div>
    </div>
  )
}
