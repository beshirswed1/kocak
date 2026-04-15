import { configureStore } from "@reduxjs/toolkit"
import restaurantReducer from "./slices/restaurantSlice"
import uiReducer from "./slices/uiSlice"
import cartReducer from "./slices/cartSlice"
import ordersReducer from "./slices/ordersSlice"

export const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    ui: uiReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
