import { useAuth } from "@/features/auth";
import { useQuery } from "@tanstack/react-query";
import { eventService } from "../services/eventService";

export function useJoinedEvents() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["events", "joined"],
    queryFn: () => eventService.getJoined(token!),
    enabled: !!token,
  });
}
