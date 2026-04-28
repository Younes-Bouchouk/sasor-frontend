import { ScreenView } from "@/components/ui/ScreenView";
import { TitleScreen } from "@/components/ui/TitleScreen";
import { Event, EventCard } from "@/features/events";
import { router } from "expo-router";
import { FlatList, View } from "react-native";

const EVENTS_TEST: Event[] = [
  {
    id: "1",
    title: "Tournoi de football",
    sport: "Football",
    date: "15 Mars 2024",
    location: "Stade Charléty, Paris",
    description:
      "Tournoi 5v5 en salle, ouvert à tous niveaux. Matchs de 20 minutes, phase de poules puis élimination directe.",
    image: "https://picsum.photos/seed/football/800/400",
  },
  {
    id: "2",
    title: "Match de basketball",
    sport: "Basketball",
    date: "20 Mars 2024",
    location: "Gymnase Japy, Paris",
    description:
      "Match amical 3v3 sur terrain extérieur. Ambiance détendue, idéal pour progresser et rencontrer de nouveaux joueurs.",
    image: "https://picsum.photos/seed/basket/800/400",
  },
  {
    id: "3",
    title: "Sortie tennis",
    sport: "Tennis",
    date: "25 Mars 2024",
    location: "Tennis Club de la Croix Catelan",
    description:
      "Session doubles mixtes sur courts en terre battue. Niveau intermédiaire requis. Raquettes disponibles sur place.",
    image: "https://picsum.photos/seed/tennis/800/400",
  },
  {
    id: "4",
    title: "Course à pied",
    sport: "Running",
    date: "2 Avril 2024",
    location: "Bois de Vincennes, Paris",
    description:
      "Sortie running de 10 km à allure libre. Départ groupé, chacun court à son rythme. Ravitaillement prévu à mi-parcours.",
    image: "https://picsum.photos/seed/running/800/400",
  },
  {
    id: "5",
    title: "Séance de natation",
    sport: "Natation",
    date: "8 Avril 2024",
    location: "Piscine Olympique d'Aubervilliers",
    description:
      "Séance technique avec un coach bénévole. Travail des 4 nages et des virages. Niveau débutant accepté.",
    image: "https://picsum.photos/seed/swimming/800/400",
  },
  {
    id: "6",
    title: "Volleyball de plage",
    sport: "Volleyball",
    date: "14 Avril 2024",
    location: "Terrain de la Villette, Paris",
    description:
      "Beach volley 2v2 et 4v4 selon les présents. Venez en équipe ou seul, on vous intègre ! Prévoir de l'eau et de la crème solaire.",
    image: "https://picsum.photos/seed/volleyball/800/400",
  },
  {
    id: "7",
    title: "Badminton en salle",
    sport: "Badminton",
    date: "20 Avril 2024",
    location: "Gymnase de la Rotonde, Lyon",
    description:
      "Soirée badminton sur 4 terrains. Rotation toutes les 15 minutes. Volants et raquettes fournis pour les débutants.",
    image: "https://picsum.photos/seed/badminton/800/400",
  },
  {
    id: "8",
    title: "Cyclisme urbain",
    sport: "Cyclisme",
    date: "27 Avril 2024",
    location: "Place de la République, Paris",
    description:
      "Balade vélo de 25 km à travers Paris. Itinéraire pistes cyclables uniquement. Vélo obligatoire, casque fortement recommandé.",
    image: "https://picsum.photos/seed/cycling/800/400",
  },
  {
    id: "9",
    title: "Arts martiaux mixtes",
    sport: "MMA",
    date: "5 Mai 2024",
    location: "Salle Kimura, Marseille",
    description:
      "Initiation MMA pour débutants : grappling, boxe, clinch. Session de 2h avec un instructeur certifié. Tenue souple requise.",
    image: "https://picsum.photos/seed/mma/800/400",
  },
];

export default function EventsScreen() {
  return (
    <ScreenView scrollable={false}>
      <TitleScreen>MES EVENTS</TitleScreen>
      <View className="flex-1">
        <FlatList
          data={EVENTS_TEST}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              onPress={() => router.push(`/(app)/events/${item.id}`)}
            />
          )}
        />
      </View>
    </ScreenView>
  );
}
