import useSessionStore from "@/src/stores/auth-store";
import { Redirect, Stack } from "expo-router";

export default function MenuStack() {
  const { session } = useSessionStore();

  if (session) {
    return <Redirect href={"/"} />;
  }
  return (
    <Stack>
      <Stack.Screen
        name='sign-in'
        options={{
          title: "Sign in",
        }}
      />
      <Stack.Screen
        name='sign-up'
        options={{
          title: "Sign up",
        }}
      />
    </Stack>
  );
}
