import React from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  className?: string;
  modal? : boolean;
};

export const ScreenView = ({children, className = "", modal = false}: Props) => {
  
  const { bottom } = useSafeAreaInsets();
  
  return (
    <ScrollView
      className={`
        flex-1 bg-background 
        ${modal ? "pt-md" : "pt-xs"} 
      `}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: bottom + 60 }}
    >
      <View className={`flex-1 px-xs ${className}`}>
          {children}
      </View>
    </ScrollView>
  );
}
