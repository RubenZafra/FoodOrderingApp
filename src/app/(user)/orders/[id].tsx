import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import OrderProduct from "@/src/components/OrderProduct";

export default function OrderId() {
  const { id } = useLocalSearchParams();
  const order = orders.find((order) => order.id.toString() === id);

  if (!order) {
    return <Text style={styles.notFound}>Order not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <OrderListItem order={order} />
      {order.order_items?.map((item) => (
        <OrderProduct key={item.id} orderProduct={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  notFound: {
    fontSize: 24,
    textAlign: "center",
  },
  container: {
    flex: 1,
    padding: 10,
  },
});
