import Button from "@/src/components/Button";
import CartListItem from "@/src/components/CartListItem";
import useCartStore from "@/src/stores/cart-store";
import { StatusBar } from "expo-status-bar";
import { View, Text, Platform, FlatList } from "react-native";

const CartScreen = () => {
  const { items } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      <Text style={{ fontWeight: "bold", marginTop: 20, fontSize: 20 }}>
        Total: ${total}
      </Text>
      <Button text='Checkout' />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
