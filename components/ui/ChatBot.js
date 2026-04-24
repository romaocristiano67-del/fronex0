"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { services, siteConfig } from '../../config/content';

const servicesSummary = services
  .map((service) => `• ${service.title}: ${service.priceLabel}`)
  .join('\n');

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Ola! Sou o assistente da Fronex. Posso ajudar com servicos, precos base, hospedagem ou encaminhar voce para o WhatsApp.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const knowledgeBase = {
    servicos: [
      `Hoje a Fronex trabalha com:\n${servicesSummary}`,
      'Temos sites personalizados, software de gestao, seguranca de dados, edicao pro, apps customizados e hospedagem premium.',
    ],
    precos: [
      `Precos base atuais:\n${servicesSummary}`,
      'Os valores base ajudam a iniciar a conversa, mas o escopo final depende da complexidade e das integracoes.',
    ],
    whatsapp: [
      `O canal mais rapido e o WhatsApp ${siteConfig.contact.whatsappDisplay}. Os botoes do site ja abrem com contexto automatico.`,
    ],
    hospedagem: [
      'A Hospedagem Premium Fronex custa 700 Kz por dia e cobre publicacao assistida, estabilidade e acompanhamento comercial.',
    ],
    prazo: [
      'Depois do diagnostico, alinhamos escopo, visual e prazo. Projetos menores andam mais rapido; sistemas e apps dependem das integracoes.',
    ],
    contato: [
      `Pode falar conosco por WhatsApp em ${siteConfig.contact.whatsappDisplay} ou por email em ${siteConfig.contact.email}.`,
    ],
  };

  const getResponse = (userInput) => {
    const normalized = userInput.toLowerCase();

    if (normalized.includes('site') || normalized.includes('app') || normalized.includes('software') || normalized.includes('servico')) {
      return knowledgeBase.servicos[0];
    }
    if (normalized.includes('preco') || normalized.includes('valor') || normalized.includes('custo')) {
      return knowledgeBase.precos[0];
    }
    if (normalized.includes('whatsapp') || normalized.includes('falar') || normalized.includes('atendimento')) {
      return knowledgeBase.whatsapp[0];
    }
    if (normalized.includes('hospedagem') || normalized.includes('vercel') || normalized.includes('deploy')) {
      return knowledgeBase.hospedagem[0];
    }
    if (normalized.includes('prazo') || normalized.includes('tempo')) {
      return knowledgeBase.prazo[0];
    }
    if (normalized.includes('email') || normalized.includes('contacto') || normalized.includes('contato')) {
      return knowledgeBase.contato[0];
    }
    if (normalized.includes('ola') || normalized.includes('oi')) {
      return 'Ola! Diga-me qual servico interessa mais e eu resumo o preco base e o melhor proximo passo.';
    }

    return 'Posso ajudar com servicos, precos base, hospedagem e canais de contato. Se quiser, escolha um servico e eu resumo para voce.';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const currentInput = input;
    setMessages((prev) => [...prev, { role: 'user', content: currentInput }]);
    setInput('');
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: getResponse(currentInput) }]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-5 right-5 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full p-0"
          aria-label="Abrir assistente"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.4-4 8-9 8a9.8 9.8 0 0 1-4.2-.9L3 20l1.4-3.7A8.4 8.4 0 0 1 3 12c0-4.4 4-8 9-8s9 3.6 9 8Z" />
          </svg>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[24rem] max-w-[calc(100vw-1.5rem)]">
      <div className="overflow-hidden rounded-[1.8rem] border border-white/[0.12] bg-slate-950/[0.78] shadow-[0_24px_70px_rgba(2,10,24,0.42)] backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Assistente Fronex</h3>
            <p className="text-xs text-white/[0.45]">orientacao rapida para servicos e contato</p>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="outline"
            size="small"
            className="h-9 w-9 rounded-full p-0"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="M6 6 18 18M6 18 18 6" />
            </svg>
          </Button>
        </div>

        <div className="h-80 space-y-4 overflow-y-auto px-4 py-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === 'user'
                    ? 'bg-cyan-300/[0.18] text-white'
                    : 'border border-white/10 bg-white/[0.06] text-white/[0.84]'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/55" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/55 [animation-delay:120ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/55 [animation-delay:240ms]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte sobre um servico..."
              className="flex-1 rounded-full border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none placeholder:text-white/[0.35] focus:border-cyan-300/[0.35]"
            />
            <Button onClick={handleSend} size="small" className="rounded-full px-4" disabled={!input.trim() || isTyping}>
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
