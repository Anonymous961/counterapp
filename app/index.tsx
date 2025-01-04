import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, Text, View } from "react-native";

export default function Home() {
  return (
    <ThemedView>
      <ThemedText>Login Page</ThemedText>
      <Button title="Sign in" />
    </ThemedView>
  );
}
