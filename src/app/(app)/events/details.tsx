// app/(app)/event-detail.tsx
import { router, useLocalSearchParams } from "expo-router";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

export default function EventDetailScreen() {
  const params = useLocalSearchParams();
  const eventId = (params.id as string);

  // Données exemple
  const eventData = {
    "1": {
      title: "Foot",
      date: "15 Mars 2024, 20:00",
      location: "Sartroubanks",
      description:
        "Match de foot de fou",
    },
    "2": {
      title: "Basket",
      date: "20 Mars 2024, 09:00",
      location: "Station F, Paris",
      description:
        "Basket tah Kuroko",
    },
    "3": {
      title: "Golf",
      date: "25 Mars 2024, 18:30",
      location: "Terrain , Lyon",
      description:
        "Venez testez c'est gratuit",
    },
  };

  const event = eventData[eventId as keyof typeof eventData] || eventData["1"];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text>Lets GOOO {eventId}</Text>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.subtitle}>ID de l&apos;événement: {eventId}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{event.date}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Lieu:</Text>
          <Text style={styles.detailValue}>{event.location}</Text>
        </View>

        <View style={styles.description}>
          <Text style={styles.descriptionLabel}>Description:</Text>
          <Text style={styles.descriptionText}>{event.description}</Text>
        </View>
      </View>

      <View style={styles.navigationSection}>
        <Text style={styles.sectionTitle}>Navigation</Text>

        <View style={styles.buttonGroup}>
          {/* Retour simple */}
          <Button
            title="← Retour à la liste"
            onPress={() => router.back()}
            color="#FF3B30"
          />

          {/* Retour à une page spécifique */}
          <Button
            title="Retour à Events"
            onPress={() => router.navigate("/(app)/events")}
            color="#8E8E93"
          />

          <Button
            title="Detail plus plus"
            onPress={() => router.push("/(app)/events/details2")}
            color="#8E8E93"
          />

          {/* Simuler un retour avec historique */}
          <Button
            title="Retour (peut fermer modal)"
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.push("/(app)/events");
              }
            }}
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            • `router.back()` retourne à la page précédente{"\n"}• Fonctionne
            avec la flèche physique Android{"\n"}• Compatible avec le swipe back
            iOS{"\n"}• Maintient l&apos;historique de navigation
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    backgroundColor: "#007AFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  details: {
    padding: 20,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  detailLabel: {
    fontWeight: "600",
    width: 80,
    color: "#333",
  },
  detailValue: {
    flex: 1,
    color: "#666",
  },
  description: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  descriptionLabel: {
    fontWeight: "600",
    marginBottom: 10,
    fontSize: 16,
  },
  descriptionText: {
    lineHeight: 24,
    color: "#444",
  },
  navigationSection: {
    padding: 20,
    marginTop: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    margin: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  buttonGroup: {
    gap: 10,
  },
  infoBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e3f2fd",
    borderRadius: 8,
  },
  infoText: {
    lineHeight: 22,
    color: "#1976d2",
  },
});
