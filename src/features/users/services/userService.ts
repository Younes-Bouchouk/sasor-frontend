import { fetchAPI } from "@/services/api";
import type { User } from "../types";

export const userService = {
  getMe: (token: string): Promise<User> => fetchAPI("/users/me", "GET", token),

  getById: (id: string): Promise<User> => fetchAPI(`/users/${id}`, "GET"),
};
