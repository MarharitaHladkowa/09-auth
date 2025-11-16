import axios from "axios";
import type { Note, NewNote } from "@/types/note";
import nextServer from "next/dist/server/next-server";
import type { User } from "@/types/user";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

axios.defaults.headers.common.Authorization = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;
interface SignUpRequest {
  email: string;
  password: string;
}

interface SignUpSuccessResponse {
  user: User;
  token: string;
}

export const signUpRequest = async (
  credentials: SignUpRequest
): Promise<SignUpSuccessResponse> => {
  const { data } = await axios.post<SignUpSuccessResponse>(
    "/users/register",
    credentials
  );
  return data;
};

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  query: string,
  page: number,
  tag: string | undefined
) => {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      search: query,
      page,
      perPage: 12,
      tag,
    },
  });
  return response.data;
};
export const createNote = async (newNote: NewNote) => {
  const response = await axios.post<Note>("/notes", newNote);
  return response.data;
};
export const deleteNote = async (noteId: string) => {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
};
export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};
export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};
type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/auth/me");
  return data;
};
export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};
export type UpdateUserRequest = {
  userName?: string;
  photoUrl?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.put<User>("/auth/me", payload);
  return res.data;
};
