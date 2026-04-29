import type { Event } from "../types";

/** Libellé sport pour l’UI — API peut omettre `sport`, renvoyer `{ name }` ou parfois une chaîne. */
export function formatSportLabel(
  sport: Event["sport"] | string | null | undefined,
): string {
  if (sport == null) return "";
  if (typeof sport === "string") return sport;
  return sport.name ?? "";
}
