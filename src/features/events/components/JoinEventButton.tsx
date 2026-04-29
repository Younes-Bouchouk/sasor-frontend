import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { useJoinEvent } from "../hooks/useJoinEvent";
import { useLeaveEvent } from "../hooks/useLeaveEvent";

type Props = {
  eventId: string;
  isParticipant: boolean;
  isOrganizer: boolean;
};

export function JoinEventButton({ eventId, isParticipant, isOrganizer }: Props) {
  const { mutate: join, isPending: isJoining } = useJoinEvent();
  const { mutate: leave, isPending: isLeaving } = useLeaveEvent();
  const isPending = isJoining || isLeaving;

  if (isOrganizer) return null;

  return (
    <TouchableOpacity
      className={`mx-md mb-md mt-sm py-sm rounded-xl items-center ${
        isParticipant ? "border border-red-500" : "bg-primary"
      } ${isPending ? "opacity-40" : ""}`}
      onPress={() => (isParticipant ? leave(eventId) : join(eventId))}
      disabled={isPending}
    >
      {isPending ? (
        <ActivityIndicator size={17} color={isParticipant ? "#ef4444" : "#fff"} />
      ) : (
        <Text
          className={`font-semibold ${
            isParticipant ? "text-red-500" : "text-primary-foreground"
          }`}
        >
          {isParticipant ? "Quitter" : "Rejoindre"}
        </Text>
      )}
    </TouchableOpacity>
  );
}
