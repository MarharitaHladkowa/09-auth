import axios from "axios";
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
export const nextServer = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // дозволяє axios працювати з cookie
});
