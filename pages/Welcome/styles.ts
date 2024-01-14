import { Platform, StyleSheet } from "react-native"

import { THEME_COLOR, WINDOW_HEIGHT, WINDOW_WIDTH } from "../../constants"

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: WINDOW_HEIGHT,
  },
  gradient_container: {
    width: "100%",
    height: WINDOW_HEIGHT,
    opacity: 1,
    position: "absolute",
    zIndex: 2,
  },
  login_splash: {
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
    resizeMode: "cover",
    position: "absolute",
    zIndex: 1,
  },

  login_content: {
    bottom: 0,
    paddingHorizontal: 20,
    position: "absolute",
    width: WINDOW_WIDTH,
  },

  logo: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  welcome_text_title: {
    color: "#fff",
    fontSize: 27,
    fontWeight: "bold",
    fontFamily: "GilroyBold",
  },
  welcome_text_subtitle: {
    color: "#fff",
    fontSize: 18,
    marginTop: 5,
    fontFamily: "GilroyMedium",
  },

  action_buttons: {
    paddingVertical: 25,
    flexDirection: "column",
    gap: 15,
    width: "100%",
  },
  action_button: {
    backgroundColor: THEME_COLOR,
    padding: 15,
    textAlign: "center",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  action_button_text: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "GilroyBold",
    fontSize: Platform.OS === "android" ? 16 : 17,
  },
})

export default styles
