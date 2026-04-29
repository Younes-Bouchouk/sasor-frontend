import { useAuth } from "@/features/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eventService } from "../services/eventService";
import type { CreateEventFormData } from "../types";

export function useCreateEvent() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEventFormData) => eventService.create(data, token!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}
