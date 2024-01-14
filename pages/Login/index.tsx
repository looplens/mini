import { View, Text, TextInput, Image, Platform, TouchableOpacity } from "react-native";
import Layout from "../../layout";
import styles from "./styles"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GRAY_COLOR, WINDOW_HEIGHT, WINDOW_WIDTH } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";

function Login() {
  const insets = useSafeAreaInsets();

  return (
    <Layout tabs={false} backgroundColor={"transparent"}>
      <View style={{...styles.container, top: -(insets.top), justifyContent: "center"}}>
        <LinearGradient
          colors={["#0C031F4E", "#0C031F8C", "#070017"]}
          style={styles.gradient_container}>

            <View style={{
              top: insets.top,
              height: WINDOW_HEIGHT - (insets.top + insets.bottom) }}>


              <View style={styles.login_content}>
                <View style={styles.logo_container}>
                  <Image
                    source={require("../../assets/square.png")}
                    style={styles.logo}
                  />
                </View>

                <View style={styles.welcome_text_container}>
                  <Text style={styles.welcome_text_title}>Looplens'e hoş geldin!</Text>
                  <Text style={styles.welcome_text_subtitle}>Topluluklarla ve arkadaşlarınla güvenli ve özgür bir şekilde iletişim kur.</Text>
                </View>

                <View style={styles.action_buttons}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.action_button}>
                    <Text style={styles.action_button_text}>Kaydol</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{...styles.action_button, backgroundColor: "#1E0E46"}}>
                    <Text style={styles.action_button_text}>Giriş Yap</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>

        </LinearGradient>

        <Image
          source={require("../../assets/splash-5.png")}
          style={styles.login_splash}
        />
      </View>

    </Layout>
  )
}

export default Login
