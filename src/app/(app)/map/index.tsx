// src/app/(app)/map/index.tsx
import EventMap from "@/features/map/components/EventMap";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function MapScreen() {
  return (
    <>
      <View style={styles.container}>
        <EventMap />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", 
  },
});
