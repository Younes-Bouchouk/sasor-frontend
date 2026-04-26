import { fetchAPI } from "@/services/api";
import type { AuthResponse, RegisterPayload } from "../types";

export const authService = {
  async loginUser(email: string, password: string): Promise<AuthResponse> {
    return fetchAPI("/auth/login", "POST", null, { email, password });
  },

  async registerUser(payload: RegisterPayload): Promise<AuthResponse> {
    return fetchAPI("/auth/register", "POST", null, payload);
  },
};
