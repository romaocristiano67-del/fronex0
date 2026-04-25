import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

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
          <h3 className="mb-1 text-sm font-medium text-white/60">Anúncios Ativos</h3>
          <p className="text-2xl font-semibold text-white">0</p>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-purple-500/20 blur-2xl"></div>
          <h3 className="mb-1 text-sm font-medium text-white/60">Plano Atual</h3>
          <p className="text-2xl font-semibold text-white">Gratuito</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
        <h2 className="mb-4 text-xl font-semibold text-white">Atividade Recente</h2>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-white/20 py-12">
          <p className="text-sm text-white/50">Nenhuma atividade recente encontrada.</p>
          <a href="/dashboard/anuncios" className="mt-4 rounded-full bg-indigo-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-600">
            Criar Anúncio
          </a>
        </div>
      </div>
    </div>
  )
}
