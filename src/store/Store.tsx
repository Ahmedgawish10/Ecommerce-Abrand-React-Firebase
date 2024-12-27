import { configureStore } from '@reduxjs/toolkit'
import productsSlice from "./products/ProductsSlice"
import wishLists from "./wishLists/WishListsSlice"
import CartSlice from "./carts/CartsSlice"
import OrdersSlice from "./orders/UserOrdersSlice"

export  const store= configureStore({
  reducer: {
    products: productsSlice,
    wishlists:wishLists,
    cart:CartSlice,
    order:OrdersSlice,

  },
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({serializableCheck: false}),
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch




