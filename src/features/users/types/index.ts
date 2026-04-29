import type { Sexe } from "@/features/auth";

export type User = {
  id: number;
  pseudo: string;
  email: string;
  profilePicture: string | null;
  sexe: Sexe;
  birthday: string;
};
