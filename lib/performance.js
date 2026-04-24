// Utilitários de performance para otimização

export class PerformanceOptimizer {
  constructor() {
    this.imageCache = new Map();
    this.componentCache = new Map();
    this.metrics = {
      loadTime: 0,
      renderTime: 0,
      cacheHits: 0,
      cacheMisses: 0
    };
  }

  // Lazy loading para imagens
  static createImageObserver(callback, options = {}) {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '50px'
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { ...defaultOptions, ...options }
    );

    return observer;
  }

  // Debounce para eventos de scroll/resize
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle para eventos frequentes
  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Preload de imagens críticas
  static preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  // Preload múltiplas imagens
  static async preloadImages(srcs) {
    const promises = srcs.map(src => this.preloadImage(src));
    return Promise.allSettled(promises);
  }

  // Otimização de carga de JavaScript
  static loadScript(src, async = true, defer = true) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = async;
      script.defer = defer;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Detectar conexão do usuário
  static getConnectionType() {
    if ('connection' in navigator) {
      return {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt,
        saveData: navigator.connection.saveData
      };
    }
    return null;
  }

  // Ajustar qualidade baseado na conexão
  static getOptimalQuality() {
    const connection = this.getConnectionType();
    if (!connection) return 'high';

    if (connection.saveData) return 'low';
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') return 'low';
    if (connection.effectiveType === '3g') return 'medium';
    return 'high';
  }

  // Sistema de cache simples
  static createCache(maxSize = 100) {
    const cache = new Map();
    
    return {
      get(key) {
        if (cache.has(key)) {
          // Move para o final (LRU)
          const value = cache.get(key);
          cache.delete(key);
          cache.set(key, value);
          return value;
        }
        return null;
      },
      
      set(key, value) {
        if (cache.size >= maxSize) {
          // Remove o item mais antigo
          const firstKey = cache.keys().next().value;
          cache.delete(firstKey);
        }
        cache.set(key, value);
      },
      
      has(key) {
        return cache.has(key);
      },
      
      clear() {
        cache.clear();
      },
      
      size() {
        return cache.size;
      }
    };
  }

  // Medir performance de componentes
  static measureComponentRender(componentName, renderFunction) {
    const startTime = performance.now();
    const result = renderFunction();
    const endTime = performance.now();
    
    console.log(`${componentName} render time: ${endTime - startTime}ms`);
    return result;
  }

  // Otimizar imagens para diferentes dispositivos
  static getResponsiveImageSrc(src, width, quality) {
    const connection = this.getConnectionType();
    const optimalQuality = quality || this.getOptimalQuality();
    
    const qualityMap = {
      low: 60,
      medium: 80,
      high: 90
    };
    
    // Se for uma URL do Supabase Storage, podemos adicionar parâmetros
    if (src.includes('supabase')) {
      const separator = src.includes('?') ? '&' : '?';
      return `${src}${separator}width=${width}&quality=${qualityMap[optimalQuality]}`;
    }
    
    return src;
  }

  // Virtual scrolling para listas grandes
  static createVirtualScroll(containerHeight, itemHeight, renderItem, items) {
    let scrollTop = 0;
    const visibleItems = Math.ceil(containerHeight / itemHeight) + 2;
    
    return {
      getVisibleItems() {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.min(startIndex + visibleItems, items.length);
        
        return {
          startIndex,
          endIndex,
          items: items.slice(startIndex, endIndex).map((item, index) => ({
            ...item,
            index: startIndex + index,
            style: {
              position: 'absolute',
              top: (startIndex + index) * itemHeight,
              height: itemHeight,
              width: '100%'
            }
          }))
        };
      },
      
      updateScrollTop(newScrollTop) {
        scrollTop = newScrollTop;
      },
      
      getTotalHeight() {
        return items.length * itemHeight;
      }
    };
  }

  // Detectar se é dispositivo móvel
  static isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Detectar se é retina display
  static isRetina() {
    return window.devicePixelRatio > 1;
  }

  // Otimizar para dispositivo
  static getDeviceOptimizations() {
    return {
      isMobile: this.isMobile(),
      isRetina: this.isRetina(),
      connection: this.getConnectionType(),
      quality: this.getOptimalQuality(),
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
  }

  // Lazy loading para componentes (use em client components com React.lazy)
  static createLazyComponent(importFunction) {
    // Deve ser usado com React.lazy no client component
    // Exemplo: const MyComp = React.lazy(() => import('./MyComp'))
    return importFunction;
  }

  // Sistema de retry para falhas de rede
  static async retry(fn, maxAttempts = 3, delay = 1000) {
    let lastError;
    
    for (let i = 0; i < maxAttempts; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        if (i < maxAttempts - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        }
      }
    }
    
    throw lastError;
  }

  // Monitorar performance
  static startPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'measure') {
            console.log(`Performance: ${entry.name} - ${entry.duration}ms`);
          }
        });
      });
      
      observer.observe({ entryTypes: ['measure', 'navigation'] });
      return observer;
    }
    return null;
  }
}

// Cache global para imagens
export const imageCache = PerformanceOptimizer.createCache(50);

// Cache global para dados
export const dataCache = PerformanceOptimizer.createCache(100);

// Funções utilitárias exportadas
export const debounce = PerformanceOptimizer.debounce;
export const throttle = PerformanceOptimizer.throttle;
export const preloadImage = PerformanceOptimizer.preloadImage;
export const preloadImages = PerformanceOptimizer.preloadImages;
export const getConnectionType = PerformanceOptimizer.getConnectionType;
export const getOptimalQuality = PerformanceOptimizer.getOptimalQuality;
export const getResponsiveImageSrc = PerformanceOptimizer.getResponsiveImageSrc;
export const isMobile = PerformanceOptimizer.isMobile;
export const isRetina = PerformanceOptimizer.isRetina;
export const getDeviceOptimizations = PerformanceOptimizer.getDeviceOptimizations;
