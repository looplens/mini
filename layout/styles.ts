import { StyleSheet } from "react-native";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants";

const styles = StyleSheet.create({
  loading_container: {
    backgroundColor: "#000000",
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 0,
    height: "100%",
    position: "relative",
  },
});

export default styles;
