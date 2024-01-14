import { Dimensions, Platform } from "react-native"

// WINDOW
export const WINDOW_HEIGHT = Dimensions.get("window").height
export const WINDOW_WIDTH = Dimensions.get("window").width

// THEME
export const THEME_COLOR = "#753EFF"
export const GRAY_COLOR = "#130B22"

export const TABS_BAR_HEIGHT = WINDOW_WIDTH / 7.5
export const TABS_ITEM_SIZE = 27
export const TABS_ITEM_COLOR = "#6E6E78"

// API
export const BASE_URL = Platform.OS === "android" ? "http://192.168.1.4:8000" : "http://localhost:8000"

export const API_VERSION = 1
export const API_URL = BASE_URL + "/api/v" + API_VERSION
export const CDN_URL = BASE_URL
