import React from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  className?: string;
  modal?: boolean;
  scrollable?: boolean;
  padding?: boolean;
};

export const ScreenView = ({
  children,
  className = "",
  modal = false,
  scrollable = true,
  padding = true,
}: Props) => {
  const { bottom } = useSafeAreaInsets();

  if (!scrollable) {
    return (
      <View
        className={`flex-1 bg-background ${padding && modal ? "pt-md" : "pt-xs"}`}
        style={{ paddingBottom: bottom + 60 }}
      >
        <View className={`flex-1 pxscreen_edge ${className}`}>{children}</View>
      </View>
    );
  }

  return (
    <ScrollView
      className={`
        flex-1 bg-background
        ${padding ? (modal ? "pt-md" : "pt-xs") : "p-0"}
      `}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: bottom + 60 }}
    >
      <View className={`flex-1 ${padding && "px-screen_edge"} ${className}`}>
        {children}
      </View>
    </ScrollView>
  );
};
