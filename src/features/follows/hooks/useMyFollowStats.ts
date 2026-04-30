import { useAuth } from "@/features/auth";
import { useQuery } from "@tanstack/react-query";
import { followService } from "../services/followService";

export function useMyFollowStats() {
  const { token } = useAuth();

  const followers = useQuery({
    queryKey: ["follows", "me", "followers"],
    queryFn: () => followService.getMyFollowers(token!),
    enabled: !!token,
  });

  const following = useQuery({
    queryKey: ["follows", "me", "following"],
    queryFn: () => followService.getMyFollowing(token!),
    enabled: !!token,
  });

  return {
    followersCount: followers.data?.length ?? 0,
    followingCount: following.data?.length ?? 0,
    isLoading: followers.isLoading || following.isLoading,
  };
}
