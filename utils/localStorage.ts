import AsyncStorage from "@react-native-async-storage/async-storage"

export async function saveLocal(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.error("Veri yazılırken bir hata meydana geldi: ", error)
  }
}

export async function readLocal(key: string) {
  try {
    const token = await AsyncStorage.getItem(key)
    return token
  } catch (error) {
    console.error("Veri okunurken bir hata meydana geldi: ", error)
  }
}
