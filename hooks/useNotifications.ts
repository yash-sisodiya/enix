import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useRef, useState } from 'react';
import { Platform } from 'react-native';

import { AppError } from '@/common/interface';
import { useCustomError } from './useCustomError';

// Custom Hook for Notification functionality
const useNotifications = () => {
  const { handleError } = useCustomError();
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    [],
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const registerForPushNotificationsAsync = async (): Promise<
    string | null
  > => {
    try {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      if (!Device.isDevice) {
        alert('Must use physical device for Push Notifications');
        return null;
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // if (existingStatus !== 'granted') {
      //   const { status } = await Notifications.requestPermissionsAsync();
      //   finalStatus = status;
      // }

      if (finalStatus !== 'granted') {
        // alert('Failed to get push token for push notification!');
        return null;
      }

      const projectId = process.env.EXPO_PUBLIC_PROJECT_ID;
      if (!projectId) {
        throw new Error('Project ID not found');
      }

      const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
        .data;
      setExpoPushToken(token);
      return token;
    } catch (error) {
      console.error('Error registering for notifications:', error);
      handleError(error as AppError);
      return null;
    }
  };

  React.useEffect(() => {
    registerForPushNotificationsAsync();

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value =>
        setChannels(value ?? []),
      );
    }

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return {
    expoPushToken,
    channels,
    notification,
  };
};

export default useNotifications;

export const useScheduleNotification = () => {
  const { handleError } = useCustomError();
  const schedulePushNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You've got mail! 📬",
          body: 'Here is the notification body',
          data: { data: 'goes here', test: { test1: 'more data' } },
        },
        trigger: { seconds: 1 },
      });
    } catch (error) {
      handleError(error as AppError);
      console.error('Error scheduling notification:', error);
    }
  };
  return { schedulePushNotification };
};
