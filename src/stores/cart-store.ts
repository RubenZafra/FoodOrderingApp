import { CartItem, Product } from "@/src/types";
import { create } from "zustand";
import { randomUUID } from "expo-crypto";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (id: string, amount: -1 | 1) => void;
  // removeAllItemsFromCart: () => void;
}

const useCartStore = create<CartStore>()((set, get) => ({
  items: [],
  addItem: (product, size) => {
    const items = get().items;
    const existingItem = items.find(
      (item) => item.product_id === product.id && item.size === size
    );

    if (existingItem) {
      get().updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    set((state) => ({
      items: [...state.items, newCartItem],
    }));
  },
  updateQuantity: (id: string, amount: -1 | 1) => {
    const updatedItems = set((state) => {
      const item = state.items.find((item) => item.id === id);

      if (!item) {
        return state;
      }

      return {
        ...state,
        items: state.items
          .map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity: item.quantity + amount,
              };
            }
            return item;
          })
          .filter((item) => item.quantity > 0),
      };
    });
    return updatedItems;
  },
  // todo remove item
  // todo removeAllItemsFromCart: () => set({ items: [] }),
}));

export default useCartStore;
