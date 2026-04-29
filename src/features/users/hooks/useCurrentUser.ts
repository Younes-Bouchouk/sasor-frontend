import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { userService } from "../services/userService";

export function useCurrentUser() {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: () => userService.getMe(token!),
    enabled: !!token,
  });
}
