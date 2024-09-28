import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Animated, Text, View } from 'react-native';

const toastVariants = {
  default: 'bg-green-500',
  destructive: 'bg-[#ff0000]',
  success: 'bg-green-500',
  info: 'bg-blue-500',
};

interface ToastProps {
  id: number;
  message: string;
  onHide: (id: number) => void;
  onHideComplete?: () => void;
  variant?: keyof typeof toastVariants; // Directly setting variant
  duration?: number; // Optional duration
  showProgress?: boolean; // Optional progress bar
}

const Toast = ({
  id,
  message,
  onHide,
  onHideComplete,
  variant = 'default',
  duration = 3000,
  showProgress = true,
}: ToastProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 1,
        duration: duration - 1000,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide(id);
      if (onHideComplete) onHideComplete();
    });
  }, [duration, onHide, id, onHideComplete]);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
      }}
      className={`m-2 mb-1 rounded-lg p-4 shadow-md ${toastVariants[variant]}`}
    >
      <Text className="text-left font-semibold text-[#FDFDFD]">{message}</Text>
      {showProgress && (
        <View className="mt-2 rounded">
          <Animated.View
            className="h-2 rounded bg-white opacity-30 dark:bg-black"
            style={{
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            }}
          />
        </View>
      )}
    </Animated.View>
  );
};

interface ToastMessage {
  id: number;
  text: string;
  variant?: keyof typeof toastVariants; // Directly setting variant
  duration?: number; // Optional duration
  showProgress?: boolean; // Optional progress bar
  onHideComplete?: () => void; // Optional function to call after hiding
}

interface ToastContextProps {
  toast: (
    message: string,
    variant?: keyof typeof toastVariants,
    options?: {
      duration?: number;
      showProgress?: boolean;
      onHideComplete?: () => void;
    },
  ) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

const ToastProvider = ({
  children,
  position = 'top',
}: {
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const toast: ToastContextProps['toast'] = (
    message: string,
    variant: keyof typeof toastVariants = 'default',
    options: {
      duration?: number;
      showProgress?: boolean;
      onHideComplete?: () => void;
    } = {},
  ) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        text: message,
        variant,
        duration: options.duration,
        showProgress: options.showProgress,
        onHideComplete: options.onHideComplete,
      },
    ]);
  };

  const removeToast = (id: number) => {
    setMessages(prev => prev.filter(message => message.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <View
        className={`absolute left-0 right-0 ${position === 'top' ? 'top-[45px]' : 'bottom-0'}`}
      >
        {messages.map(message => (
          <Toast
            key={message.id}
            id={message.id}
            message={message.text}
            variant={message.variant}
            duration={message.duration}
            showProgress={message.showProgress}
            onHide={removeToast}
            onHideComplete={message.onHideComplete}
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export { ToastProvider, useToast };
