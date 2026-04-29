import { User } from "@/features/users";
import { fetchAPI } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  userId: number | null;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
  updateUserImage: (imageUrl: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        if (storedToken) {
          setToken(storedToken);
          const userData = await fetchAPI("/users/me", "GET", storedToken);
          const storedImage = await AsyncStorage.getItem("userImage");
          setUserId(userData.id);
          setUser({ ...userData, image: storedImage ?? userData.image });
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données auth :", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAuthData();
  }, []);

  const fetchUserData = async (authToken: string) => {
    try {
      const userData = await fetchAPI("/users/me", "GET", authToken);
      setUserId(userData.id);
      setUser(userData);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données utilisateur :",
        error,
      );
    }
  };

  const updateUserImage = async (imageUrl: string) => {
    setUser((prevUser: any) => ({ ...prevUser, image: imageUrl }));
    await AsyncStorage.setItem("userImage", imageUrl);
  };

  const login = async (newToken: string) => {
    await AsyncStorage.setItem("authToken", newToken);
    setToken(newToken);
    await fetchUserData(newToken);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userImage");
    setToken(null);
    setUserId(null);
    setUser(null);
    router.replace("/(auth)/login");
  };

  const refetchUser = async () => {
    if (token) {
      await fetchUserData(token);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        user,
        token,
        isLoading,
        login,
        logout,
        refetchUser,
        updateUserImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};
