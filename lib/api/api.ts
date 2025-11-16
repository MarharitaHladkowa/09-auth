import axios from "axios";
import { NoteListResponse } from "@/types/note";
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api`;
export const nextServer = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // дозволяє axios працювати з cookie
});
export const getNotes = async (categoryId?: string) => {
  const res = await nextServer.get<NoteListResponse>("/notes", {
    params: { categoryId },
  });
  return res.data;
};
