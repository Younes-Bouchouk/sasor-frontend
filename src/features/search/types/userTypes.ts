export interface User {
  id: string; 
  pseudo: string;
  email?: string;
  profilePicture?: string;
  image?: string;
  isFollower?: boolean;
  isFollowing?: boolean;
}