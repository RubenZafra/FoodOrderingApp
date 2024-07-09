import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { Link, Stack } from "expo-router";
import { supabase } from "@/src/lib/supabase";

const CreateProductScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  const validateInputs = () => {
    setErrors("");
    if (!email) {
      setErrors("Email is required");
      return false;
    }
    if (!password) {
      setErrors("Password is required");
      return false;
    }
    return true;
  };
  const onSubmit = () => {
    onLogin();
  };

  const onLogin = () => {
    if (!validateInputs()) {
      return;
    }
    console.warn("Create Account");
    resetFields();
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign in" }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder='johndoe@example.com'
        style={styles.input}
        autoCapitalize='none'
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        autoCapitalize='none'
        secureTextEntry
      />

      {errors && <Text style={{ color: "red" }}>{errors}</Text>}
      <Button
        onPress={signInWithEmail}
        disabled={loading}
        text={loading ? "Signing in..." : "Sign in"}
      />
      <Link style={styles.textButton} href={"/(auth)/sign-up"} asChild>
        <Text>Create Account</Text>
      </Link>
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: "grey",
    fontWeight: "bold",
  },
  textButton: {
    alignSelf: "center",
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
});
