import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import '@/styles/global.css';
import 'react-native-reanimated';

import { ToastProvider } from '@/components/Molecules/Toast';
import AppProvider from '@/providers/AppProvider';
import { persistor, store } from '@/store';
import { ThemeProvider } from '@/styles/ThemeProviders';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ToastProvider position="top">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <GestureHandlerRootView>
                <BottomSheetModalProvider>
                  <AppProvider>
                    <Stack>
                      <Stack.Screen
                        name="index"
                        options={{
                          headerShown: false,
                          animation: 'slide_from_right',
                        }}
                      />
                      <Stack.Screen
                        name="(tabs)"
                        options={{
                          headerShown: false,
                          animation: 'slide_from_right',
                        }}
                      />
                      <Stack.Screen
                        name="+not-found"
                        options={{
                          headerShown: false,
                          animation: 'slide_from_right',
                        }}
                      />
                    </Stack>
                  </AppProvider>
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </ThemeProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
}
