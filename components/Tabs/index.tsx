import { View } from "react-native";
import styles from "./styles"

function Tabs({ routes }: Tabs) {
  return (
    <View style={styles.container}>
      {routes && routes.map((route, index: number) => {
        return (
          <View>
            <View>
              {route.icons.outline_icon}
            </View>
          </View>
        )
      })}
    </View>
  )
}

export default Tabs
