import { CDN_URL } from "../constants";

export default function useCdn(path: string = "") {
  if (path.charAt(0) === "/") path = path.substring(1);
  return CDN_URL + "/" + path
}
