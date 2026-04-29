import { useAuth } from "@/features/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eventService } from "../services/eventService";

export function useLeaveEvent() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId: string) => eventService.leave(eventId, token!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}
