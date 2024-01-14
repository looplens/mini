import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Profile from './pages/Profile';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './pages/Login';
import { useFonts } from "expo-font";

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
    <SafeAreaProvider>
      <Login />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
