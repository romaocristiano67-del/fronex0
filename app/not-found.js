import React from 'react';
import { Button } from '../components/ui/Button';

export const metadata = {
  title: 'Pagina nao encontrada',
  description: 'A pagina procurada nao existe ou foi movida.',
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-28">
      <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-cyan-300/[0.12] blur-3xl" />
      <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-blue-500/[0.12] blur-3xl" />

      <div className="relative z-10 w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 text-center shadow-[0_30px_100px_rgba(2,10,24,0.4)] backdrop-blur-2xl md:p-12">
        <div className="text-sm uppercase tracking-[0.32em] text-white/[0.42]">erro 404</div>
        <div className="mt-6 text-7xl font-semibold text-white md:text-8xl">Pagina nao encontrada</div>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/[0.62]">
          O link pode ter mudado ou a rota ainda nao foi criada. Volte para a pagina inicial ou abra a secao de
          servicos para continuar a navegacao.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href="/#top" size="large">
            Voltar ao inicio
          </Button>
          <Button href="/#services" variant="secondary" size="large">
            Ver servicos
          </Button>
        </div>
      </div>
    </div>
  );
}
