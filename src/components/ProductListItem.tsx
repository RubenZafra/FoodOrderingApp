import { Image, StyleSheet } from "react-native";
import { Text, View } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";

interface ProductListItemProps {
  product: {
    name: string;
    price: number;
    image: string;
  };
}

export const ProductListItem = ({ product }: ProductListItemProps) => {
  const { name, price, image } = product;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
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
