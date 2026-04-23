import { Text } from "react-native";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const TitleScreen = ({children, className}: Props) => {
  return (
    <Text className={`text-foreground text-center font-bold text-2xl ${className}`}>
      {children}
    </Text>
  )
}