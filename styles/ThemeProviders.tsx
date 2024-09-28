// src/shared-components/providers/ThemeProviders.tsx
import React, { createContext } from 'react';
import { View } from 'react-native';
import { themes } from '@/styles/color-theme';
import { StatusBar } from 'expo-status-bar';

interface ThemeProviderProps {
  children: React.ReactNode;
}
export const ThemeContext = createContext<{
  theme: Record<string, string>;
  color: string;
}>({
  theme: themes['light'],
  color: 'light',
});
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = 'light';

  return (
    <ThemeContext.Provider value={{ theme: themes[theme], color: 'light' }}>
      <StatusBar style={'dark'} backgroundColor={`#FDFDFD`} />
      <View style={themes[theme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};
