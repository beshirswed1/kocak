import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Order, OrderStatus } from "@/types";

interface OrdersState {
  orders: Order[];
  loading: boolean;
}

const initialState: OrdersState = {
  orders: [],
  loading: true,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.loading = false;
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: OrderStatus }>
    ) => {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload);
    },
  },
});

export const { setOrders, updateOrderStatus, removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
