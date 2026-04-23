import React from "react";
import { ScrollView } from "react-native";
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
        ${modal ? "pt-8" : "pt-2"}
        ${className} 
      `}
      style={{paddingBottom: bottom + 60}}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {children}
    </ScrollView>
  );
}
