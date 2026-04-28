import { User } from "@/features/search/types/userTypes";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface UserCardProps {
  user: User;
  onFollow: (userId: number) => void;
  onUnfollow: (userId: number) => void;
  isPending?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onFollow,
  onUnfollow,
  isPending = false,
}) => {
  const isFollowing = user.isFollower;

  const handlePress = () => {
    if (isFollowing) {
      onUnfollow(user.id);
    } else {
      onFollow(user.id);
    }
  };

  return (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-800">
      <View className="flex-row items-center gap-3 flex-1">
        <Image
          source={{
            uri: user.image || "https://i.pravatar.cc/150?img=" + user.id,
          }}
          className="w-12 h-12 rounded-full"
        />
        <View className="flex-1">
          <Text className=" text-base font-semibold">{user.pseudo}</Text>
          {user.isFollowing && (
            <View className="flex-row items-center mt-1">
              <Ionicons name="person-add" size={12} color="#10B981" />
              <Text className="text-green-500 text-xs ml-1">Vous suit</Text>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={handlePress}
        disabled={isPending}
        className={`
          px-4 py-2 rounded-lg
          ${isFollowing ? "bg-gray-700" : "bg-white"}
        `}
      >
        <Text className={isFollowing ? "text-gray-300" : "text-black"}>
          {isFollowing ? "Ne plus suivre" : "Suivre"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
