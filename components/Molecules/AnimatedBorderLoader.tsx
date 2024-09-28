import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

export const AnimatedBorderLoader = ({
  isLoading = false,
}: {
  isLoading?: boolean;
}) => {
  const borderWidthAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (isLoading) {
      animationRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(borderWidthAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(borderWidthAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ]),
      );
      animationRef.current.start();
    } else {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    }
  }, [isLoading, borderWidthAnim]);

  const borderWidth = borderWidthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      {isLoading && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 2,
            width: borderWidth,
            backgroundColor: '#2EBFA5',
          }}
        />
      )}
    </View>
  );
};
