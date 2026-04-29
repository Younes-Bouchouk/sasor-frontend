import { useQuery } from "@tanstack/react-query";
import { sportService } from "../services/sportService";

export function useSports() {
  return useQuery({
    queryKey: ["sports"],
    queryFn: sportService.getAll,
  });
}
