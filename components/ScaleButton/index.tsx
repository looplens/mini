import React, { useEffect } from "react";
import Animated, { runOnJS, useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from "react-native-reanimated";
import { LongPressGestureHandler } from "react-native-gesture-handler";

export default function ScaleButton({
  children,
  onPress,
  activeScale = 0.9,
  springConfig = {
    damping: 10,
    mass: 1,
    stiffness: 200,
  },
  contentContainerStyle,
  handlerProps,
}: ScaleButton) {
  const scale = useSharedValue(1);
  const sz = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(scale.value, springConfig),
        },
      ],
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = activeScale;
    },
    onCancel: () => {
      scale.value = 1;
    },
    onEnd: () => {
      runOnJS(onPress)()
      scale.value = 1;
    },
  })

  return (
    <LongPressGestureHandler
      minDurationMs={0.5}
      maxDist={10}
      {...handlerProps}
      onGestureEvent={gestureHandler}
    >
      <Animated.View style={[sz, contentContainerStyle]}>
        {children}
      </Animated.View>
    </LongPressGestureHandler>
  )
}
