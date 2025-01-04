import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, Text, View } from "react-native";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect } from "react";

GoogleSignin.configure({
  webClientId:
    "905576859551-o0k3pgui6lnjg0pq23g8m222r5tbi350.apps.googleusercontent.com",
});

export default function Home() {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log("sign in entered");
      if (isSuccessResponse(response)) {
        console.log(response.data);
        // setState({ userInfo: response.data });
      } else {
        // sign in was cancelled by user
        console.log("signin canceled");
      }
    } catch (error) {
      console.log("error entered");
      console.log(error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };
  const check = async () => {
    try {
      const res = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      console.log(res);
      // google services are available
    } catch (err) {
      console.error("play services are not available");
    }
  };
  console.log("hello");

  const getCurrentUser = async () => {
    const currentUser = GoogleSignin.getCurrentUser();
    console.log("current user is", currentUser);
    // setState({ currentUser });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <ThemedView>
      <ThemedText>Login Page</ThemedText>
      <ThemedText>Login Page</ThemedText>
      <Button title="Sign in" onPress={signIn} />
      <Button title="check services" onPress={check} />
    </ThemedView>
  );
}
