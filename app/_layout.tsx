import "react-native-reanimated";

import { Stack } from "expo-router";

import { VehicleInfoProvider } from "@/providers/VehicleInfoProvider";

export default function RootLayout() {
  return (
    <VehicleInfoProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </VehicleInfoProvider>
  );
}
