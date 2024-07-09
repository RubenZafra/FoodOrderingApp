import { ActivityIndicator, View } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import useSessionStore from "@/src/stores/auth-store";
import { supabase } from "@/src/lib/supabase";

const index = () => {
  const { session, loading } = useSessionStore();
  console.log({ session });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text='User' />
      </Link>

      <Link href={"/(admin)"} asChild>
        <Button text='Admin' />
      </Link>

      <Link href={"/(auth)/sign-in"} asChild>
        <Button text='Auth' />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text='Sign out' />
    </View>
  );
};

export default index;
