import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { useTexts } from '@/hooks/useTexts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function NotFoundScreen() {
  const texts = useTexts();
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!', headerShown: false }} />
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <View className="items-center justify-center">
          <MaterialIcons name="error" size={24} color="black" />{' '}
        </View>
        <Text className="px-14 text-center text-2xl text-primary-100">
          {texts.errors.networkDownTitle}
        </Text>
        <Text className="text-center text-lg">
          {texts.errors.networkDownDesc}
        </Text>
      </SafeAreaView>
    </>
  );
}
