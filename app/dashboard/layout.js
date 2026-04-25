export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="relative z-10 flex min-h-screen pt-20">
        <aside className="w-64 border-r border-white/10 bg-slate-950/50 p-6 backdrop-blur-xl hidden md:block">
          <nav className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/50">Menu</h2>
            <a href="/dashboard" className="block rounded-lg bg-white/5 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-white/10 transition-all hover:bg-white/10">Visão Geral</a>
            <a href="/dashboard/anuncios" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/5 hover:text-white">Meus Anúncios</a>
            <a href="/dashboard/assinatura" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/5 hover:text-white">Assinatura</a>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-md md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
