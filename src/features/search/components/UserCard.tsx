import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

interface UserCardProps {
  user: any;
  isFollowing: boolean;
  onFollow: (userId: string) => void;
  onUnfollow: (userId: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  isFollowing,
  onFollow,
  onUnfollow,
}) => {
  const [pending, setPending] = useState(false);

  const handlePress = async () => {
    if (pending) return;
    
    setPending(true);
    try {
      if (isFollowing) {
        await onUnfollow(user.id);
      } else {
        await onFollow(user.id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-800">
      <View className="flex-row items-center gap-3 flex-1">
        <Image
          source={{
            uri: user?.profilePicture || user?.image || `https://i.pravatar.cc/150?u=${user?.id}`,
          }}
          className="w-12 h-12 rounded-full"
        />
        <View className="flex-1">
          <Text className=" text-base font-semibold">
            {user?.pseudo || "Utilisateur"}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handlePress}
        disabled={pending}
        className={`px-4 py-2 rounded-3xl min-w-[100px] items-center ${
          isFollowing ? "bg-gray-700" : "bg-white"
        }`}
      >
        {pending ? (
          <ActivityIndicator size="small" color={isFollowing ? "#fff" : "#000"} />
        ) : (
          <Text className={isFollowing ? "text-gray-300" : "text-black"}>
            {isFollowing ? "Ne plus suivre" : "Suivre"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};