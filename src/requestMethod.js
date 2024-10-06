import axios from "axios";
const user = getTokenFromCookie();
function getTokenFromCookie() {
  const cookieString = document.cookie;
  const cookies = cookieString.split(";");

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=").map((c) => c.trim());
    if (name === "token") {
      return value;
    }
  }

  return null; // Return null if the token cookie is not found
}
// const url = "https://admin.netme.eu/netmeapi";

const url = "http://localhost:8001";

const BASE_URL = url;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic TkVUTUU6TkVUTUVRV0VSVFlVSU9Q",
  },
});
export const fileRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Basic TkVUTUU6TkVUTUVRV0VSVFlVSU9Q",
  },
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + user,
  },
});
