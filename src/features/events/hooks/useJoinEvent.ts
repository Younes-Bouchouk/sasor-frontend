import { useAuth } from "@/features/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eventService } from "../services/eventService";

export function useJoinEvent() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId: string) => eventService.join(eventId, token!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}
