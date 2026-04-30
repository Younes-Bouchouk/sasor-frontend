import { useQuery } from "@tanstack/react-query";
import { followService } from "../services/followService";

export function useUserFollowStats(userId: string) {
  const followers = useQuery({
    queryKey: ["follows", userId, "followers"],
    queryFn: () => followService.getUserFollowers(userId),
    enabled: !!userId,
  });

  const following = useQuery({
    queryKey: ["follows", userId, "following"],
    queryFn: () => followService.getUserFollowing(userId),
    enabled: !!userId,
  });

  return {
    followersCount: followers.data?.length ?? 0,
    followingCount: following.data?.length ?? 0,
    isLoading: followers.isLoading || following.isLoading,
  };
}
