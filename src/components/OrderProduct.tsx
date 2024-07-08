import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { OrderItem, Product } from "@/src/types";
import Colors from "@/src/constants/Colors";

export default function OrderProduct({
  orderProduct,
}: {
  orderProduct: OrderItem;
}) {
  const { id, products, quantity, size } = orderProduct;
  const { name, image, id: itemId, price } = products;
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: image || defaultPizzaImage }}
          style={{ width: 75, height: 75, aspectRatio: 1 }}
        />
        <View
          style={{
            flexDirection: "column",
            marginLeft: 10,
            gap: 5,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 18 }}>{name}</Text>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: Colors.light.tint,
              }}
            >
              ${price}
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 16 }}>
              Size: {size}
            </Text>
          </View>
        </View>
      </View>
      <Text style={{ fontWeight: "600", fontSize: 16, marginRight: 10 }}>
        {quantity}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
  },
});
