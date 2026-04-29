import { useAuth } from "@/features/auth";
import { useQuery } from "@tanstack/react-query";
import { eventService } from "../services/eventService";

export function useFollowersEvents() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["events", "followers"],
    queryFn: () => eventService.getFollowers(token!),
    enabled: !!token,
  });
}
