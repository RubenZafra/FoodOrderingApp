import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Order } from "@/src/types";
import { Link, useSegments } from "expo-router";
import { formatDateRelative } from "@/src/utils/format-date";

interface OrderListItemProps {
  order: Order;
}

export default function OrderListItem({ order }: OrderListItemProps) {
  const { id, created_at, status } = order;
  const segments = useSegments();

  return (
    <Link href={{ pathname: `/${segments[0]}/orders/${order.id}` }} asChild>
      <Pressable style={styles.item}>
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Order #{id}</Text>
          <Text
            style={{
              fontStyle: "italic",
              color: "gainsboro",
              fontWeight: "600",
            }}
          >
            {formatDateRelative(created_at)}
          </Text>
        </View>
        <Text style={{ fontWeight: "bold" }}>{status}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
