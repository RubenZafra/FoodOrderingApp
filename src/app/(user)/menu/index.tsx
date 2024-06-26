import products from "@/assets/data/products";
import { ProductListItem } from "@/src/components/ProductListItem";
import { FlatList } from "react-native";

export default function MenuScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
