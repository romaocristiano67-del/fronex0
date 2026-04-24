// Sistema de moderação leve para validação de conteúdo

export class ContentModerator {
  constructor() {
    // Lista de palavras ofensivas (simplificada)
    this.forbiddenWords = [
      'palavra1', 'palavra2', 'spam', 'scam', 'fraude',
      'burla', 'golpe', 'ilegal', 'proibido'
    ];

    // Padrões de spam
    this.spamPatterns = [
      /compre agora/gi,
      /clique aqui/gi,
      /oferta limitada/gi,
      /dinheiro fácil/gi,
      /trabalhe em casa/gi,
      /milagre/gi,
      /curta instantaneamente/gi
    ];

    // Padrões de contato suspeito
    this.suspiciousPatterns = [
      /\d{3,}/g, // Muitos números
      /(http|www\.|\.com)/gi, // Links excessivos
      /([A-Z]{3,})/g // Músculas excessivas
    ];
  }

  // Validação de texto mínimo
  validateMinLength(text, minLength = 10) {
    if (!text || typeof text !== 'string') {
      return {
        valid: false,
        reason: 'O texto é obrigatório'
      };
    }

    if (text.trim().length < minLength) {
      return {
        valid: false,
        reason: `O texto deve ter pelo menos ${minLength} caracteres`
      };
    }

    return { valid: true };
  }

  // Validação de título
  validateTitle(title) {
    const minLength = 5;
    const maxLength = 100;

    if (!title || typeof title !== 'string') {
      return {
        valid: false,
        reason: 'O título é obrigatório'
      };
    }

    if (title.trim().length < minLength) {
      return {
        valid: false,
        reason: `O título deve ter pelo menos ${minLength} caracteres`
      };
    }

    if (title.length > maxLength) {
      return {
        valid: false,
        reason: `O título deve ter no máximo ${maxLength} caracteres`
      };
    }

    return { valid: true };
  }

  // Validação de descrição
  validateDescription(description) {
    const minLength = 20;
    const maxLength = 2000;

    if (!description || typeof description !== 'string') {
      return {
        valid: false,
        reason: 'A descrição é obrigatória'
      };
    }

    if (description.trim().length < minLength) {
      return {
        valid: false,
        reason: `A descrição deve ter pelo menos ${minLength} caracteres`
      };
    }

    if (description.length > maxLength) {
      return {
        valid: false,
        reason: `A descrição deve ter no máximo ${maxLength} caracteres`
      };
    }

    return { valid: true };
  }

  // Validação de preço
  validatePrice(price) {
    if (price === null || price === undefined) {
      return { valid: true }; // Preço opcional
    }

    const numPrice = parseFloat(price);
    
    if (isNaN(numPrice) || numPrice < 0) {
      return {
        valid: false,
        reason: 'O preço deve ser um número válido e positivo'
      };
    }

    if (numPrice > 10000000) {
      return {
        valid: false,
        reason: 'O preço máximo permitido é 10.000.000 Kz'
      };
    }

    return { valid: true };
  }

  // Validação de email
  validateEmail(email) {
    if (!email || typeof email !== 'string') {
      return { valid: true }; // Email opcional
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return {
        valid: false,
        reason: 'O email informado não é válido'
      };
    }

    return { valid: true };
  }

  // Validação de telefone
  validatePhone(phone) {
    if (!phone || typeof phone !== 'string') {
      return { valid: true }; // Telefone opcional
    }

    // Remove caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length < 9 || cleanPhone.length > 15) {
      return {
        valid: false,
        reason: 'O telefone deve ter entre 9 e 15 dígitos'
      };
    }

    return { valid: true };
  }

  // Detecção de conteúdo ofensivo
  detectOffensiveContent(text) {
    if (!text || typeof text !== 'string') {
      return { detected: false };
    }

    const lowerText = text.toLowerCase();
    
    for (const word of this.forbiddenWords) {
      if (lowerText.includes(word)) {
        return {
          detected: true,
          reason: 'Conteúdo ofensivo detectado',
          word: word
        };
      }
    }

    return { detected: false };
  }

  // Detecção de spam
  detectSpam(text) {
    if (!text || typeof text !== 'string') {
      return { detected: false };
    }

    // Verificar padrões de spam
    for (const pattern of this.spamPatterns) {
      if (pattern.test(text)) {
        return {
          detected: true,
          reason: 'Padrão de spam detectado'
        };
      }
    }

    // Verificar repetição excessiva de caracteres
    const repeatedChars = text.match(/(.)\1{4,}/g);
    if (repeatedChars && repeatedChars.length > 2) {
      return {
        detected: true,
        reason: 'Repetição excessiva de caracteres'
      };
    }

    // Verificar proporção de maiúsculas
    const upperCaseRatio = (text.match(/[A-Z]/g) || []).length / text.length;
    if (upperCaseRatio > 0.5 && text.length > 20) {
      return {
        detected: true,
        reason: 'Excesso de letras maiúsculas'
      };
    }

    return { detected: false };
  }

  // Detecção de comportamento suspeito
  detectSuspiciousContent(text) {
    if (!text || typeof text !== 'string') {
      return { detected: false };
    }

    let suspiciousScore = 0;
    const reasons = [];

    // Verificar muitos números
    const numbers = text.match(/\d{3,}/g);
    if (numbers && numbers.length > 3) {
      suspiciousScore += 1;
      reasons.push('Muitos números no texto');
    }

    // Verificar links
    const links = text.match(/(http|www\.|\.com)/gi);
    if (links && links.length > 2) {
      suspiciousScore += 2;
      reasons.push('Muitos links no texto');
    }

    // Verificar palavras em maiúsculas
    const excessiveCaps = text.match(/([A-Z]{3,})/g);
    if (excessiveCaps && excessiveCaps.length > 3) {
      suspiciousScore += 1;
      reasons.push('Muitas palavras em maiúsculas');
    }

    return {
      detected: suspiciousScore >= 2,
      score: suspiciousScore,
      reasons: reasons
    };
  }

  // Validação completa de conteúdo
  validateContent(content) {
    const results = {
      valid: true,
      errors: [],
      warnings: [],
      moderationFlags: []
    };

    // Validações básicas
    const titleValidation = this.validateTitle(content.title);
    if (!titleValidation.valid) {
      results.valid = false;
      results.errors.push(titleValidation.reason);
    }

    const descriptionValidation = this.validateDescription(content.description);
    if (!descriptionValidation.valid) {
      results.valid = false;
      results.errors.push(descriptionValidation.reason);
    }

    const priceValidation = this.validatePrice(content.price);
    if (!priceValidation.valid) {
      results.valid = false;
      results.errors.push(priceValidation.reason);
    }

    const emailValidation = this.validateEmail(content.email);
    if (!emailValidation.valid) {
      results.valid = false;
      results.errors.push(emailValidation.reason);
    }

    const phoneValidation = this.validatePhone(content.phone);
    if (!phoneValidation.valid) {
      results.valid = false;
      results.errors.push(phoneValidation.reason);
    }

    // Moderação de conteúdo
    const fullText = `${content.title || ''} ${content.description || ''}`;
    
    const offensiveCheck = this.detectOffensiveContent(fullText);
    if (offensiveCheck.detected) {
      results.valid = false;
      results.errors.push(offensiveCheck.reason);
      results.moderationFlags.push('offensive_content');
    }

    const spamCheck = this.detectSpam(fullText);
    if (spamCheck.detected) {
      results.valid = false;
      results.errors.push(spamCheck.reason);
      results.moderationFlags.push('spam');
    }

    const suspiciousCheck = this.detectSuspiciousContent(fullText);
    if (suspiciousCheck.detected) {
      results.warnings.push('Conteúdo suspeito detectado');
      results.moderationFlags.push('suspicious');
      results.suspiciousScore = suspiciousCheck.score;
      results.suspiciousReasons = suspiciousCheck.reasons;
    }

    // Status recomendado
    if (results.valid) {
      if (results.moderationFlags.includes('suspicious')) {
        results.recommendedStatus = 'pending_review';
      } else {
        results.recommendedStatus = 'pending';
      }
    } else {
      results.recommendedStatus = 'rejected';
    }

    return results;
  }

  // Sanitização de texto
  sanitizeText(text) {
    if (!text || typeof text !== 'string') {
      return '';
    }

    return text
      .trim()
      .replace(/\s+/g, ' ') // Remove espaços extras
      .replace(/[<>]/g, '') // Remove tags HTML básicas
      .substring(0, 2000); // Limita tamanho
  }

  // Geração de hash para detecção de duplicatas
  generateContentHash(content) {
    const normalized = `${content.title || ''} ${content.description || ''}`
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
    
    // Hash simples (em produção, usar algoritmo mais robusto)
    let hash = 0;
    for (let i = 0; i < normalized.length; i++) {
      const char = normalized.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString();
  }
}

export const moderator = new ContentModerator();
