import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedBorderLoader } from '../Molecules/AnimatedBorderLoader';

const MainLayout = ({
  children,
  isBack,
  title,
  loading = false,
}: {
  children: ReactNode;
  isBack?: boolean;
  title?: string;
  loading?: boolean;
}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FDFDFD' }}>
      <View className="flex-1 bg-primary pt-2">
        <View className="flex-row items-center justify-between gap-x-5 border-b border-b-secondary-skyMist px-4 pb-2">
          <TouchableOpacity
            className="p-2"
            onPress={() => (isBack ? router.back() : {})}
          >
            <Ionicons
              name={isBack ? 'arrow-back' : 'menu'}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
          <View className="flex-row items-center justify-center">
            <Text className="text-2xl font-bold">{title ? title : 'Enix'}</Text>
          </View>
          <TouchableOpacity className="rounded-full border border-primary-lightBlue p-2">
            <View>
              <Ionicons name="notifications-outline" size={24} color="#000" />
            </View>
            <View className="absolute right-0 h-3 w-3 rounded-full bg-secondary-red" />
          </TouchableOpacity>
        </View>
        <AnimatedBorderLoader isLoading={loading} />
        <View className="mt-2 flex-1">{children}</View>
      </View>
    </SafeAreaView>
  );
};

export default MainLayout;
