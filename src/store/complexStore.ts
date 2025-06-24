import { createGlobalState, createDerivedState } from "./index";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  status: 'idle' | 'checkout' | 'processing';
}

const initialState: CartState = {
  items: [],
  status: 'idle'
};

export const useCartStore = createGlobalState<CartState>("cart", initialState, {
  persist: true
});

// Derived states
export const useCartTotal = createDerivedState<CartState, number>(
  useCartStore,
  (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// Actions
export const useCartActions = () => {
  const { setData } = useCartStore();

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setData(state => {
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    });
  };

  return { addItem };
};