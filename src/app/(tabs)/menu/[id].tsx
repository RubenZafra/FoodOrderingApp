import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: "Product Details" }} />
      <Text>Product details for: {id}</Text>
    </View>
  );
};

export default ProductDetailsScreen;
