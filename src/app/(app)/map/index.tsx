// src/app/(app)/map/index.tsx
import EventMap from "@/features/map/components/EventMap";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function MapScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Carte",
          headerShown: true,
          headerStyle: { backgroundColor: "#000" },
          headerTitleStyle: { color: "#18FD9C" },
        }}
      />
      <View style={styles.container}>
        <EventMap />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Changé de #fff à #000 pour cohérence
  },
});
