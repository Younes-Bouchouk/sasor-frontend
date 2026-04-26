import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAPI } from "../services/api";
interface EventData {
  name: string;
  sport: string;
  location: string;
  plannedAt: string;
  maxParticipants:   string;
  visibility: "PUBLIC" | "PRIVATE" | "FRIENDS";
  description: string;
}

export function useCreateEvent() {
  return useMutation<EventData, Error, EventData>({
    mutationFn: async (eventData) => {
      console.log("📤 Tentative de création de l'événement...");

      //  Récupérer le token d'authentification
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error(" Aucun token trouvé, veuillez vous reconnecter.");
      }
      // Vérifier et formater la date
      if (!eventData.plannedAt || typeof eventData.plannedAt !== "string") {
        throw new Error(" Date invalide ou manquante !");
      }

      const formattedDate = `${eventData.plannedAt}T00:00:00.000Z`;
      const parsedDate = new Date(formattedDate);
      if (isNaN(parsedDate.getTime())) {
        throw new Error(" Format de date incorrect !");
      }

      const cleanEventData = {
        ...eventData,
        maxParticipants: parseInt(eventData.maxParticipants) || 0,
        plannedAt: parsedDate.toISOString(),
      };

      console.log("✅ Données envoyées :", cleanEventData);

      return fetchAPI("/events", "POST", token, cleanEventData);
    },
    onSuccess: () => {
      console.log(" Événement créé avec succès !");
    },
    onError: (error) => {
      console.error(" Erreur lors de la création de l'événement :", error);
    },
  });
}
