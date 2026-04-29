import { useAuth } from "@/features/auth";
import { useQuery } from "@tanstack/react-query";
import { eventService } from "../services/eventService";

export function useEvents() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["events"],
    queryFn: () => eventService.getAll(token!),
    enabled: !!token,
  });
}
