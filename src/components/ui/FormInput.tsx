import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export function FormInput({ label, error, ...props }: Props) {
  return (
    <View className="gap-1">
      <Text className="text-foreground opacity-60 text-sm">{label}</Text>
      <TextInput
        className={`border rounded-lg px-md py-sm text-foreground bg-transparent ${
          error ? "border-red-500" : "border-border"
        }`}
        placeholderTextColor="rgba(128,128,128,0.6)"
        {...props}
      />
      {error && <Text className="text-red-500 text-xs">{error}</Text>}
    </View>
  );
}
