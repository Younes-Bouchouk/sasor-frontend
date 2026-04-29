import { useAuth } from "@/features/auth";
import { useQuery } from "@tanstack/react-query";
import { eventService } from "../services/eventService";

export function useOrganizedEvents() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["events", "organized"],
    queryFn: () => eventService.getOrganized(token!),
    enabled: !!token,
  });
}
