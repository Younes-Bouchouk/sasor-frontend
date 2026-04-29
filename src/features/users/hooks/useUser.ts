import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";

export function useUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => userService.getById(id),
    enabled: !!id,
  });
}
