/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { ThemeContext } from '@/styles/ThemeProviders';
import { useContext } from 'react';

export function useThemeColor() {
  const context = useContext(ThemeContext);
  return context;
}
