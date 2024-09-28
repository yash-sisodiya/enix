import { Tabs, useLocalSearchParams } from 'expo-router';
import React from 'react';

import { FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
  const path = useLocalSearchParams();

  return (
    <Tabs
      initialRouteName="profile"
      screenOptions={{
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'red',
        tabBarStyle: { padding: 8, height: 55, paddingBottom: 8 },
        tabBarLabelStyle: {
          fontSize: 12,
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
              <FontAwesome5
                name="user"
                color={!focused ? 'black' : 'red'}
                size={18}
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
          title: 'Contact',
          tabBarIcon: ({ color, focused }) => {
            return (
              <FontAwesome5
                name="user"
                color={!focused ? 'black' : 'red'}
                size={18}
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
