import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import OrderProduct from "@/src/components/OrderProduct";
import { OrderStatusList } from "@/src/types";
import Colors from "@/src/constants/Colors";

export default function OrderId() {
  const { id } = useLocalSearchParams();
  const order = orders.find((order) => order.id.toString() === id);

  if (!order) {
    return <Text style={styles.notFound}>Order not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      {/* <OrderListItem order={order} /> This is cool for making it stay on top */}

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderProduct orderProduct={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => <OrderListItem order={order} />} // This is to make it scroll all together
        // ListFooterComponent={() => <OrderListItem order={order} />} // This is to make it scroll all together but footer
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => console.warn("Update status")}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
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
