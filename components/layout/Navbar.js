"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { BrandLogo } from '../ui/BrandLogo';
import { navigation, siteConfig } from '../../config/content';
import { createClient } from '@/utils/supabase/client';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [supabase.auth]);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'pt-3' : 'pt-5'
      }`}
    >
      <Container>
        <div
          className={`rounded-full border transition-all duration-500 ${
            scrolled
              ? 'border-white/[0.12] bg-slate-950/[0.72] shadow-[0_18px_50px_rgba(2,10,24,0.35)] backdrop-blur-2xl'
              : 'border-white/10 bg-slate-950/[0.38] backdrop-blur-xl'
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <a href="#top" aria-label="Fronex" className="flex items-center">
              <BrandLogo compact={false} />
            </a>

            <div className="hidden items-center gap-7 md:flex">
              {navigation.main.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                >
                  {item.name}
                </a>
              ))}

              <Button
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                size="small"
              >
                Falar com a Fronex
              </Button>

              {user ? (
                <div className="flex items-center gap-4 border-l border-white/10 pl-7">
                  <a href="/dashboard" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    {user.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="Avatar" className="h-8 w-8 rounded-full border border-white/20 object-cover" />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </a>
                  <button onClick={handleLogout} className="text-sm text-white/50 transition-colors hover:text-white">Sair</button>
                </div>
              ) : (
                <div className="border-l border-white/10 pl-7">
                  <button onClick={handleLogin} className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 ring-1 ring-white/10">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Entrar
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white md:hidden"
              aria-label="Abrir menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                {isOpen ? <path d="M6 6 18 18M6 18 18 6" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>

          {isOpen && (
            <div className="border-t border-white/10 px-4 pb-4 pt-2 md:hidden">
              <div className="flex flex-col gap-2">
                {navigation.main.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="rounded-2xl px-4 py-3 text-white/[0.78] transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <Button
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Falar no WhatsApp
                </Button>
                
                {user ? (
                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 border border-white/10">
                    <a href="/dashboard" className="flex items-center gap-3">
                      {user.user_metadata?.avatar_url ? (
                        <img src={user.user_metadata.avatar_url} alt="Avatar" className="h-10 w-10 rounded-full border border-white/20 object-cover" />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-base font-bold text-white">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-white">{user.user_metadata?.full_name || 'Utilizador'}</p>
                        <p className="text-xs text-white/50">Painel de Controlo</p>
                      </div>
                    </a>
                    <button onClick={handleLogout} className="text-sm text-white/50 hover:text-white">Sair</button>
                  </div>
                ) : (
                  <button onClick={() => { setIsOpen(false); handleLogin(); }} className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/5 px-4 py-3 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-white/10">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Entrar com Google
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
};
