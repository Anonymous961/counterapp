import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, Alert } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";

// Configure Google Sign-In
GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive"],
  webClientId:
    "905576859551-0f5esnj400ggu3ulehrph2lsc9ugl4er.apps.googleusercontent.com",
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  profileImageSize: 120,
});

export default function Home() {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  const signIn = async () => {
    if (isSigninInProgress) {
      return;
    }

    try {
      setIsSigninInProgress(true);

      // Check if play services are available
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Attempt to sign in
      const userInfo = await GoogleSignin.signIn();
      console.log("Sign-in successful:", userInfo);

      // Get tokens (optional)
      const tokens = await GoogleSignin.getTokens();
      console.log("Tokens:", tokens);

      // Here you can handle the successful sign-in
      // For example, send the tokens to your backend
    } catch (error: any) {
      console.error("Detailed error:", error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Sign in cancelled by user");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Sign in already in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Play services not available or outdated");
      } else if (error.code === "DEVELOPER_ERROR") {
        Alert.alert(
          "Configuration Error",
          "Please verify your Google Sign-In configuration, including webClientId and SHA fingerprints."
        );
      } else {
        Alert.alert(
          "Sign in error",
          error.message || "An unknown error occurred"
        );
      }
    } finally {
      setIsSigninInProgress(false);
    }
  };

  const checkPlayServices = async () => {
    try {
      const isAvailable = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      console.log("Play services available:", isAvailable);
      Alert.alert("Play Services Check", "Play Services are available");
    } catch (error) {
      console.error("Play services error:", error);
      Alert.alert(
        "Play Services Error",
        "Google Play Services are not available or outdated"
      );
    }
  };

  const getCurrentUser = async () => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();
      console.log("Current user:", currentUser);

      if (currentUser) {
        // Handle logged in user
        const isSignedIn = await GoogleSignin.isSignedIn();
        console.log("Is signed in:", isSignedIn);
      }
    } catch (error) {
      console.error("Get current user error:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <ThemedView>
      <ThemedText>Login Page</ThemedText>
      <Button
        title={isSigninInProgress ? "Signing in..." : "Sign in with Google"}
        onPress={signIn}
        disabled={isSigninInProgress}
      />
      <Button title="Check Google Play Services" onPress={checkPlayServices} />
    </ThemedView>
  );
}
