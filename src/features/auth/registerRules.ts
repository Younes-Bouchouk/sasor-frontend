import type { Sexe } from "./types";

/**
 * Règles d'inscription à respecter côté front (UX / validation locale).
 * Le backend applique les mêmes contraintes via RegisterDto — cette liste est indicative pour l'UI.
 */
export const REGISTER_FRONT_RULES = {
  pseudo: ["Non vide", "Chaîne de caractères"],
  email: ["Non vide", "Format email valide"],
  password: ["Non vide", "Entre 8 et 20 caractères"],
  birthday: ["Non vide", "Date au format ISO-8601"],
  sexe: ["Valeur obligatoire parmi : masculin, féminin, autre"],
} as const;

/** Points à afficher pour la validation du mot de passe (barre de critères, etc.) */
export const REGISTER_PASSWORD_CRITERIA = ["8 à 20 caractères"] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Date saisie au format calendaire YYYY-MM-DD, envoyée en ISO via Date#toISOString */
const ISO_DATE_ONLY_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/** Retourne un message d'erreur affichable ou null si tout est valide. */
export function validateRegisterForm(input: {
  pseudo: string;
  email: string;
  password: string;
  birthday: string;
  sexe: Sexe | null;
}): string | null {
  const pseudo = input.pseudo.trim();
  const email = input.email.trim();
  const birthdayRaw = input.birthday.trim();

  if (!pseudo) {
    return "Le pseudo est requis.";
  }
  if (!email) {
    return "L'email est requis.";
  }
  if (!EMAIL_REGEX.test(email)) {
    return "Format d'email invalide.";
  }
  if (!input.password) {
    return "Le mot de passe est requis.";
  }
  if (
    input.password.length < 8 ||
    input.password.length > 20
  ) {
    return "Le mot de passe doit contenir entre 8 et 20 caractères.";
  }
  if (!input.sexe) {
    return "Veuillez sélectionner votre sexe.";
  }
  if (!birthdayRaw) {
    return "La date de naissance est requise.";
  }
  if (!ISO_DATE_ONLY_REGEX.test(birthdayRaw)) {
    return "Utilisez une date au format YYYY-MM-DD.";
  }
  const birth = new Date(birthdayRaw);
  if (Number.isNaN(birth.getTime())) {
    return "Date de naissance invalide.";
  }
  return null;
}
