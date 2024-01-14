import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View, Text, Platform } from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Tabs from "../components/Tabs";
import styles from "./styles";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants";
import LayoutProps from "./types";
import tinycolor from "tinycolor2";
import * as NavigationBar from "expo-navigation-bar";

function Layout({ tabs = true, backgroundColor, children }: LayoutProps) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    console.log(insets)


    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#000")
      NavigationBar.setButtonStyleAsync("light")
    }
  }, [])

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={tabs ? {
            height: Math.abs((WINDOW_HEIGHT - (insets.top + insets.bottom)) - 55),
            flex: 0,
          } : {
            height: Math.abs((WINDOW_HEIGHT - (insets.top + insets.bottom))),
            flex: 0,
          }}>{children}</View>

          {tabs && (
            <Tabs routes={[
              {
                title: "Feed",
                callback: () => console.log("Feed"),
                icons: {
                  filled_icon: "",
                  outline_icon: ""
                }
              }
            ]} />
          )}
        </View>
      </SafeAreaView>

      <StatusBar style={backgroundColor ? tinycolor(backgroundColor).isLight() ? "dark" : "light" : "auto"} />

      {backgroundColor && (<>
        <View style={{
          backgroundColor: backgroundColor,
          top: 0,
          height: insets.top,
          position: "absolute",
          width: "100%"
        }} />

        <View style={{
          backgroundColor: backgroundColor,
          bottom: 0,
          height: insets.bottom,
          position: "absolute",
          width: "100%"
        }} />
      </>)}
    </>
  )
}

export default Layout
