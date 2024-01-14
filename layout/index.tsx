import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { Image, View, Text, Platform, ActivityIndicator } from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Tabs from "../components/Tabs";
import styles from "./styles";
import { CDN_URL, TABS_BAR_HEIGHT, TABS_ITEM_COLOR, TABS_ITEM_SIZE, WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants";
import LayoutProps from "./types";
import tinycolor from "tinycolor2";
import * as NavigationBar from "expo-navigation-bar";
import React from "react";
import { readLocal, saveLocal } from "../utils/localStorage";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setSessionStatus, setUser } from "../store/reducers/sessionSlice";
import apiRequest from "../utils/apiRequest";
import { Ionicons } from '@expo/vector-icons'
import tabStyles from "../components/Tabs/styles"
import useCdn from "../hooks/useCdn";
import { Icon } from 'react-native-eva-icons';

function Layout({ tabs = true, statusBar, backgroundColor, children }: LayoutProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation() as any

  const session = useSelector((state: any) => state.session);
  const dispatch = useDispatch();

  const [onLoading, setLoading] = useState(false);

  const evaIcon = useCallback((name: string) => {
    return <Icon name={name} width={TABS_ITEM_SIZE} height={TABS_ITEM_SIZE} fill={TABS_ITEM_COLOR} />
  }, [])

  async function startSession() {
    if (session.session_activated)
      return console.log("oturum başlatılmış aga");

    setLoading(true);
    const token = await readLocal("user_token");

    if (token !== null) {
      apiRequest({
        url: "/users/session_start",
        data: { token },
        method: "POST",
        callback: async (response) => {
          if (response.data.status) {
            dispatch(setToken(token))
            dispatch(setSessionStatus(true))
            dispatch(setUser(response.data.user))
            setLoading(false)
          } else {
            await saveLocal("user_token", "");
            setLoading(false)
            navigation.navigate("Welcome")
          }
        }
      })
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    startSession()

    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#000")
      NavigationBar.setButtonStyleAsync("light")
    }
  }, [])

  return (
    <>
      {onLoading && (
        <View style={styles.loading_container}>
          <ActivityIndicator size={"large"} color={"#fff"} />
        </View>
      )}

      <SafeAreaView>
        {!onLoading && (
          <View style={styles.container}>
            <View style={tabs ? {
              height: Math.abs((WINDOW_HEIGHT - (insets.top + insets.bottom)) - TABS_BAR_HEIGHT),
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
                    filled_icon: evaIcon("home"),
                    outline_icon: evaIcon("home-outline")
                  }
                },
                {
                  title: "Search",
                  callback: () => console.log("Search"),
                  icons: {
                    filled_icon: evaIcon("search"),
                    outline_icon: evaIcon("search")
                  }
                },
                {
                  title: "Loops",
                  callback: () => console.log("Loops"),
                  icons: {
                    filled_icon: evaIcon("flash"),
                    outline_icon: evaIcon("flash-outline")
                  }
                },
                {
                  title: "CreatePost",
                  callback: () => console.log("CreatePost"),
                  icons: {
                    filled_icon: evaIcon("plus-square"),
                    outline_icon: evaIcon("plus-square-outline")
                  }
                },
                {
                  title: "Profil1e",
                  callback: () => console.log("Profile"),
                  icons: {
                    filled_icon: <Image source={{ uri: useCdn(session.user.avatar) }} style={tabStyles.user_avatar} />,
                    outline_icon: <Image source={{ uri: useCdn(session.user.avatar) }} style={tabStyles.user_avatar} />
                  }
                }
              ]} />
            )}
          </View>
        )}
      </SafeAreaView>

      <StatusBar style={
        typeof statusBar !== "undefined" ?
          statusBar : backgroundColor ?
            tinycolor(backgroundColor).isLight() ?
              "dark" : "light"
              : "auto"
      } />

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
