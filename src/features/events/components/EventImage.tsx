import { Image } from "expo-image";
import { StyleProp, View, ViewStyle } from "react-native";

type Props = {
  image: string;
  style?: StyleProp<ViewStyle>;
};

export function EventImage({ image, style }: Props) {
  return (
    <View
      style={style}
      className="w-full aspect-event_image rounded-event_image overflow-hidden "
    >
      <Image
        source={image ? { uri: image } : require("@/../assets/images/icon.png")}
        contentFit="cover"
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}
