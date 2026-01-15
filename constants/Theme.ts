import { Colors } from './Colors';

export const Theme = {
  colors: Colors,
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      color: Colors.text,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      color: Colors.text,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      color: Colors.text,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      color: Colors.textSecondary,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400' as const,
      color: Colors.textTertiary,
    },
  },
};

