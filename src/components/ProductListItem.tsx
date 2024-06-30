import { Image, StyleSheet, Pressable } from "react-native";
import { Text, View } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import { Product } from "@/src/types";
import { Link, useSegments } from "expo-router";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

interface ProductListItemProps {
  product: Product;
}

export const ProductListItem = ({ product }: ProductListItemProps) => {
  const { name, price, image } = product;
  const segments = useSegments();

  return (
    <Link
      href={{
        pathname: `/${segments[0]}/menu/${product.id}`,
      }}
      asChild
    >
      <Pressable style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: image || defaultPizzaImage }}
          resizeMode='contain'
        />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
