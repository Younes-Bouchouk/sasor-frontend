import { fetchAPI } from "@/services/api";
import type { Sport } from "../types";

export const sportService = {
  getAll: (): Promise<Sport[]> => fetchAPI("/sports", "GET"),
};
