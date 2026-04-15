import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Order, OrderStatus } from "@/types";

interface OrdersState {
  items: Order[];
}

const initialState: OrdersState = {
  items: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload;
    },
    updateOrderStatusRedux: (state, action: PayloadAction<{ id: string; status: OrderStatus }>) => {
      const order = state.items.find(o => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
    removeOrderRedux: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(o => o.id !== action.payload);
    }
  },
});

export const { setOrders, updateOrderStatusRedux, removeOrderRedux } = ordersSlice.actions;

export default ordersSlice.reducer;
