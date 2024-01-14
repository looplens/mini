import { StyleSheet } from "react-native"

import { THEME_COLOR, WINDOW_HEIGHT, WINDOW_WIDTH } from "../../constants"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
  },
  go_back_button_container: {
    padding: 20,
    paddingBottom: 0,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  go_back_title: {
    fontFamily: "GilroyBold",
    fontSize: 20,
    color: "#fff",
  },
  greettings_header: {
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#5454543F",
    borderBottomWidth: 1,
  },
  logo: {
    height: 80,
    width: 80,
    borderRadius: 10,
    objectFit: "contain",
  },
  greettings_header_title: {
    marginTop: 20,
    fontSize: 22,
    fontFamily: "GilroyBold",
    color: "#fff",
    textAlign: "center",
  },
  greettings_header_subtitle: {
    fontSize: 16,
    fontFamily: "GilroyMedium",
    color: "#FFFFFFCA",
    marginTop: 5,
    textAlign: "center",
  },
  form_container: {
    marginTop: 10,
    gap: 20,
    padding: 20,
    width: WINDOW_WIDTH,
    position: "relative",
  },
  form_item: {
    width: "100%",
    gap: 3,
  },
  form_title: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "GilroyBold",
  },
  form_warning: {
    fontSize: 14,
    color: "#FF9317",
    fontFamily: "GilroyMedium",
  },
  form_textinput: {
    backgroundColor: "#1C1C1DF9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1C1C1DF9",
    color: "#fff",
    padding: 15,
    marginTop: 5,
    fontFamily: "Arial",
    width: "100%",
  },

  form_button: {
    backgroundColor: THEME_COLOR,
    borderRadius: 10,
    color: "#fff",
    padding: 16,
    marginTop: 5,
    fontFamily: "GilroyBold",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  form_button_text: {
    color: "#fff",
    fontFamily: "GilroyBold",
  },
  form_textinput_focus: {
    borderColor: THEME_COLOR,
    backgroundColor: "#0F0F10F9",
  },
  form_bottom_texts: {
    marginTop: -10,
    color: THEME_COLOR,
  },
  form_bottom_texts_gray: {
    color: "gray",
  },

  loading_container: {
    height: WINDOW_HEIGHT / 2,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default styles
