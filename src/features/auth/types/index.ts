export type Sexe = "masculin" | "féminin" | "autre";
export const SEXE_OPTIONS: Sexe[] = ["masculin", "féminin", "autre"];

export interface AuthResponse {
  access_token: string;
}

export interface RegisterPayload {
  pseudo: string;
  email: string;
  password: string;
  birthday: string;
  sexe: Sexe;
}
