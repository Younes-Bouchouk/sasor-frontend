import { ScreenView } from "@/components/ui/ScreenView";
import { TitleScreen } from "@/components/ui/TitleScreen";
import { Step1 } from "@/features/events/components/create/Step1";
import { Step2 } from "@/features/events/components/create/Step2";
import { Step3 } from "@/features/events/components/create/Step3";
import { useCreateEvent } from "@/features/events/hooks/useCreateEvent";
import type { CreateEventFormData } from "@/features/events/types";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const STEPS = ["L'essentiel", "Les détails", "Date & image"];

const initialData: CreateEventFormData = {
  name: "",
  description: "",
  sportId: null,
  maxParticipants: "",
  location: "",
  isPrivate: false,
  startAt: null,
  image: "",
};

function validate(step: number, data: CreateEventFormData) {
  const errors: Partial<Record<keyof CreateEventFormData, string>> = {};
  if (step === 1) {
    if (!data.name.trim()) errors.name = "Le nom est requis";
    if (!data.sportId) errors.sportId = "Choisis un sport";
  }
  if (step === 2) {
    if (!data.location.trim()) errors.location = "Le lieu est requis";
    if (!data.maxParticipants || Number(data.maxParticipants) < 2)
      errors.maxParticipants = "Minimum 2 participants";
  }
  if (step === 3) {
    if (!data.startAt) errors.startAt = "La date est requise";
  }
  return errors;
}

export default function CreateEventModal() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CreateEventFormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateEventFormData, string>>>({});
  const { mutate: createEvent, isPending } = useCreateEvent();

  const handleChange = (fields: Partial<CreateEventFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    const cleared = { ...errors };
    (Object.keys(fields) as (keyof CreateEventFormData)[]).forEach((k) => delete cleared[k]);
    setErrors(cleared);
  };

  const handleNext = () => {
    const stepErrors = validate(step, formData);
    if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }
    setStep((s) => s + 1);
  };

  const handleSubmit = () => {
    const stepErrors = validate(3, formData);
    if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }
    createEvent(formData, { onSuccess: () => router.back() });
  };

  return (
    <ScreenView modal scrollable>
      <TitleScreen>CRÉER UN ÉVÉNEMENT</TitleScreen>

      {/* Indicateur de progression */}
      <View className="flex-row justify-center gap-xl mb-lg mt-sm">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const active = n === step;
          const done = n < step;
          return (
            <View key={n} className="items-center gap-1">
              <View
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  done ? "bg-primary" : active ? "border border-primary" : "bg-border"
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    done ? "text-primary-foreground" : active ? "text-primary" : "text-foreground opacity-40"
                  }`}
                >
                  {done ? "✓" : n}
                </Text>
              </View>
              <Text
                className={`text-xs ${active ? "text-primary font-medium" : "text-foreground opacity-40"}`}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </View>

      <View className="flex-1">
        {step === 1 && <Step1 data={formData} onChange={handleChange} errors={errors} />}
        {step === 2 && <Step2 data={formData} onChange={handleChange} errors={errors} />}
        {step === 3 && <Step3 data={formData} onChange={handleChange} errors={errors} />}
      </View>

      <View className="flex-row gap-sm mt-lg mb-md">
        {step > 1 && (
          <TouchableOpacity
            onPress={() => setStep((s) => s - 1)}
            className="flex-1 border border-border rounded-xl py-sm items-center"
          >
            <Text className="text-foreground font-semibold">Retour</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={step < 3 ? handleNext : handleSubmit}
          disabled={isPending}
          className={`flex-1 bg-primary rounded-xl py-sm items-center ${isPending ? "opacity-40" : ""}`}
        >
          {isPending ? (
            <ActivityIndicator color="#fff" size={17} />
          ) : (
            <Text className="text-primary-foreground font-semibold">
              {step < 3 ? "Suivant" : "Créer l'événement"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScreenView>
  );
}
