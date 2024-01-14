import { ColorValue } from "react-native"

export default interface LayoutProps {
  tabs?: boolean
  backgroundColor?: string,
  statusBar?: "dark" | "light" | "auto"
  children: any
}
