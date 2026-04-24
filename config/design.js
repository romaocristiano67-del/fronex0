export const designConfig = {
  colors: {
    primary: '#3b82f6',
    secondary: '#a855f7',
    accent: '#06b6d4',
    dark: '#0f172a',
  },
  
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.08)',
    dark: 'rgba(0, 0, 0, 0.2)',
    border: 'rgba(255, 255, 255, 0.2)',
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    accent: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    dark: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  },
  
  shadows: {
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    card: '0 4px 30px rgba(0, 0, 0, 0.1)',
    button: '0 4px 15px 0 rgba(31, 38, 135, 0.2)',
  },
  
  animations: {
    duration: {
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
}

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}
