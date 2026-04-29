import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { FormInput } from "@/components/ui/FormInput";
import type { CreateEventFormData } from "../../types";

type Props = {
  data: CreateEventFormData;
  onChange: (fields: Partial<CreateEventFormData>) => void;
  errors?: Partial<Record<keyof CreateEventFormData, string>>;
};

function formatDate(date: Date) {
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export function Step3({ data, onChange, errors }: Props) {
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const currentDate = data.startAt ?? new Date();

  const handleDateChange = (_: unknown, selected?: Date) => {
    setShowDate(Platform.OS === "ios");
    if (!selected) return;
    const updated = new Date(currentDate);
    updated.setFullYear(selected.getFullYear(), selected.getMonth(), selected.getDate());
    onChange({ startAt: updated });
  };

  const handleTimeChange = (_: unknown, selected?: Date) => {
    setShowTime(Platform.OS === "ios");
    if (!selected) return;
    const updated = new Date(currentDate);
    updated.setHours(selected.getHours(), selected.getMinutes());
    onChange({ startAt: updated });
  };

  return (
    <View className="gap-lg">
      <View className="gap-1">
        <Text className="text-foreground opacity-60 text-sm">Date</Text>
        <TouchableOpacity
          onPress={() => setShowDate(true)}
          className={`border rounded-lg px-md py-sm ${
            errors?.startAt ? "border-red-500" : "border-border"
          }`}
        >
          <Text className="text-foreground">
            {data.startAt ? formatDate(data.startAt) : "Choisir une date..."}
          </Text>
        </TouchableOpacity>
        {errors?.startAt && (
          <Text className="text-red-500 text-xs">{errors.startAt}</Text>
        )}
      </View>

      <View className="gap-1">
        <Text className="text-foreground opacity-60 text-sm">Heure</Text>
        <TouchableOpacity
          onPress={() => setShowTime(true)}
          className="border border-border rounded-lg px-md py-sm"
        >
          <Text className="text-foreground">
            {data.startAt ? formatTime(data.startAt) : "Choisir une heure..."}
          </Text>
        </TouchableOpacity>
      </View>

      <FormInput
        label="Image (URL optionnelle)"
        placeholder="https://..."
        value={data.image}
        onChangeText={(v) => onChange({ image: v })}
        keyboardType="url"
        autoCapitalize="none"
      />

      {showDate && (
        <DateTimePicker
          value={currentDate}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={handleDateChange}
        />
      )}
      {showTime && (
        <DateTimePicker
          value={currentDate}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}
