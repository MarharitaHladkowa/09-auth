import axios from "axios";
import { NoteListResponse } from "@/types/note";
export const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // дозволяє axios працювати з cookie
});
axios.defaults.baseURL = "http://localhost:3000/api";
export const getNotes = async (categoryId?: string) => {
  const res = await nextServer.get<NoteListResponse>("/notes", {
    params: { categoryId },
  });
  return res.data;
};
