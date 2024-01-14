import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import React, { useMemo, useCallback } from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import styles from "./styles"
import { WINDOW_HEIGHT } from "../../constants"
import Layout from "../../layout"

function Welcome() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation() as any

  const containerStyle: any = useMemo(
    () => ({
      ...styles.container,
      top: -insets.top,
      justifyContent: "center",
    }),
    [insets],
  )

  const handleRegister = useCallback(() => navigation.push("Register"), [navigation])
  const handleLogin = useCallback(() => navigation.push("Login"), [navigation])

  return (
    <Layout tabs={false} backgroundColor="transparent">
      <View style={containerStyle}>
        <LinearGradient colors={["#0C031F4E", "#0C031F8C", "#070017"]} style={styles.gradient_container}>
          <View
            style={{
              top: insets.top,
              height: WINDOW_HEIGHT - (insets.top + insets.bottom),
            }}>
            <View style={styles.login_content}>
              <Image source={require("../../assets/square.png")} style={styles.logo} />
              <Text style={styles.welcome_text_title}>Looplens'e hoş geldin!</Text>
              <Text style={styles.welcome_text_subtitle}>
                Topluluklarla ve arkadaşlarınla güvenli ve özgür bir şekilde iletişim kur.
              </Text>
              <View style={styles.action_buttons}>
                <TouchableOpacity onPress={handleRegister} activeOpacity={0.8} style={styles.action_button}>
                  <Text style={styles.action_button_text}>Kaydol</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleLogin}
                  activeOpacity={0.8}
                  style={[styles.action_button, { backgroundColor: "#1E0E46" }]}>
                  <Text style={styles.action_button_text}>Giriş Yap</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
        <Image source={require("../../assets/splash-5.png")} style={styles.login_splash} />
      </View>
    </Layout>
  )
}

export default Welcome
