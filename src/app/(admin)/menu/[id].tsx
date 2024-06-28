import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { useState } from "react";
import Button from "@/src/components/Button";
import useCartStore from "@/src/stores/cart-store";
import { PizzaSize } from "@/src/types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { addItem } = useCartStore();

  const router = useRouter();

  const [pizzaSize, setPizzaSize] = useState<PizzaSize>("M");

  const product = products.find((product) => product.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const addToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      pizzaSize
    );

    router.push("/cart");
  };

  const { name, image, price } = product;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: name }} />

      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text>Select size</Text>

      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setPizzaSize(size)}
            style={[
              styles.size,
              { backgroundColor: pizzaSize === size ? "gainsboro" : "white" },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                { color: pizzaSize === size ? "black" : "gray" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${price}</Text>
      <Button text='Add to cart' onPress={addToCart} />
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "600",
  },
});
