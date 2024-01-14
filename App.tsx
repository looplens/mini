import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { store } from './store';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import { BASE_URL } from './constants';
import { Text } from "react-native"

const Stack = createNativeStackNavigator();

function Routes() {
  const session = useSelector((state: any) => state.session);

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      animation: 'slide_from_right'
    }}>
      {session.session_activated ? (
        <Stack.Screen name="Profile" component={Profile} />
      ) : (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [loaded] = useFonts({
    Bold: require("./assets/fonts/Satoshi/Satoshi-Black.ttf"),
    SoftBold: require("./assets/fonts/Satoshi/Satoshi-Bold.ttf"),
    Medium: require("./assets/fonts/Satoshi/Satoshi-Medium.ttf"),

    GilroyBold: require("./assets/fonts/Gilroy-Bold/Gilroy-Bold.ttf"),
    GilroyMedium: require("./assets/fonts/Gilroy-Medium/040a78b437acd0433612f92e61d04a1b.ttf"),
    Arial: require("./assets/fonts/FontsFree-Net-arial-bold.ttf"),
  })

  if (!loaded) return null

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
