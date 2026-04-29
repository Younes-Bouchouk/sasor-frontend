import { FormInput } from "@/components/ui/FormInput";
import { View } from "react-native";
import type { CreateEventFormData } from "../../types";

type Props = {
  data: CreateEventFormData;
  onChange: (fields: Partial<CreateEventFormData>) => void;
  errors?: Partial<Record<keyof CreateEventFormData, string>>;
};

export function Step2({ data, onChange, errors }: Props) {
  return (
    <View className="gap-lg">
      <FormInput
        label="Lieu"
        placeholder="Ex : Stade Jean Bouin, Paris"
        value={data.location}
        onChangeText={(v) => onChange({ location: v })}
        error={errors?.location}
      />

      <FormInput
        label="Nombre de participants maximum"
        placeholder="Ex : 10"
        value={data.maxParticipants}
        onChangeText={(v) => onChange({ maxParticipants: v })}
        keyboardType="numeric"
        error={errors?.maxParticipants}
      />

      <FormInput
        label="Description (optionnelle)"
        placeholder="Décris ton événement..."
        value={data.description}
        onChangeText={(v) => onChange({ description: v })}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        className="border border-border rounded-lg px-md py-sm text-foreground bg-transparent min-h-24"
      />
    </View>
  );
}
