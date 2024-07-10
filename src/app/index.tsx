import { ActivityIndicator, View } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import useSessionStore from "@/src/stores/auth-store";

const index = () => {
  const { session, loading, isAdmin } = useSessionStore();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  if (!isAdmin) {
    return <Redirect href={"/(user)"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text='User' />
      </Link>

      <Link href={"/(admin)"} asChild>
        <Button text='Admin' />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text='Sign out' />
    </View>
  );
};

export default index;
