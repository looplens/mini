import axios from "axios"

import { API_URL } from "../constants"

interface ApiRequest {
  url: string
  data?: any
  callback?: (data?: any) => void
  exception?: (data?: any) => void
  method?: "GET" | "POST" | "PUT" | "DELETE"
}

async function apiRequest({ url, data = {}, method = "POST", callback, exception = () => {} }: ApiRequest) {
  try {
    const response = await axios({
      url: API_URL + url,
      data,
      method,
    })

    return callback ? callback(response) : response
  } catch (error: any) {
    return exception(error.response)
  }
}

export default apiRequest
