"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { BrandLogo } from '../ui/BrandLogo';
import { navigation, siteConfig } from '../../config/content';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              </div>
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
};
