import { Tabs, useLocalSearchParams } from 'expo-router';
import React from 'react';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const path = useLocalSearchParams();

  return (
    <Tabs
      initialRouteName="profile"
      screenOptions={{
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: '#2EBFA5',
        tabBarStyle: { padding: 8, height: 65, paddingBottom: 8 },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="profile"
        initialParams={path}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => {
            return (
              <FontAwesome
                name="user"
                color={!focused ? 'black' : '#2EBFA5'}
                size={24}
              />
            );
          },
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tabs.Screen
        name="contact"
        initialParams={path}
        options={{
          title: 'Contact Details',
          tabBarIcon: ({ color, focused }) => {
            return (
              <MaterialIcons
                name="contact-page"
                color={!focused ? 'black' : '#2EBFA5'}
                size={24}
              />
            );
          },
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      />
    </Tabs>
  );
}
