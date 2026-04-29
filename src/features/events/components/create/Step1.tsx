import { FormInput } from "@/components/ui/FormInput";
import { useSports } from "@/features/sports";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { CreateEventFormData } from "../../types";

type Props = {
  data: CreateEventFormData;
  onChange: (fields: Partial<CreateEventFormData>) => void;
  errors?: Partial<Record<keyof CreateEventFormData, string>>;
};

export function Step1({ data, onChange, errors }: Props) {
  const { data: sports, isLoading } = useSports();

  return (
    <View className="gap-lg">
      <FormInput
        label="Nom de l'événement"
        placeholder="Ex : Match de foot du dimanche"
        value={data.name}
        onChangeText={(v) => onChange({ name: v })}
        error={errors?.name}
      />

      <View className="gap-1">
        <Text className="text-foreground opacity-60 text-sm">Sport</Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View className="flex-row flex-wrap gap-sm">
            {sports?.map((sport) => {
              const selected = data.sportId === sport.id;
              return (
                <TouchableOpacity
                  key={sport.id}
                  onPress={() => onChange({ sportId: sport.id })}
                  className={`px-sm py-xs rounded-full border ${
                    selected ? "bg-primary border-primary" : "border-border"
                  }`}
                >
                  <Text
                    className={
                      selected ? "text-primary-foreground" : "text-foreground"
                    }
                  >
                    {sport.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>

      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-foreground font-medium">Événement privé</Text>
          <Text className="text-foreground opacity-50 text-xs">
            Seules les personnes invitées peuvent rejoindre
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => onChange({ isPrivate: !data.isPrivate })}
          className={`w-12 h-6 rounded-full justify-center px-1 ${
            data.isPrivate ? "bg-primary" : "bg-border"
          }`}
        >
          <View
            className={`w-4 h-4 rounded-full bg-white ${
              data.isPrivate ? "ml-auto" : ""
            }`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
