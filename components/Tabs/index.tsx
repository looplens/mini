import { View, Text } from "react-native";
import styles from "./styles"
import React from "react";
import ScaleButton from "../ScaleButton";
import { useRoute } from "@react-navigation/native"

function Tabs({ routes }: Tabs) {
  const route = useRoute()

  return (
    <View style={styles.container}>
      {routes && routes.map((item, index: number) => {
        return (
          <ScaleButton
            activeScale={0.6}
            contentContainerStyle={styles.tab_button}
            onPress={() => console.log("buton dürtüldü")}
            key={index}>
            {route.name === item.title ?
              item.icons.filled_icon :
              item.icons.outline_icon}
          </ScaleButton>
        )
      })}
    </View>
  )
}

export default Tabs
