import { StyleSheet } from "react-native"

import { TABS_BAR_HEIGHT, TABS_ITEM_COLOR } from "../../constants"

const styles = StyleSheet.create({
  container: {
    flex: 0,
    borderTopColor: TABS_ITEM_COLOR,
    borderTopWidth: 0,
    position: "absolute",
    height: TABS_BAR_HEIGHT,
    width: "100%",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  tab_button: {
    height: TABS_BAR_HEIGHT,
    width: TABS_BAR_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  svg_icon: {
    color: "#000",
    fontSize: 26,
  },
  user_avatar: {
    height: 30,
    width: 30,
    borderRadius: 100,
  },
})

export default styles
