import { configureStore } from '@reduxjs/toolkit'
import productsSlice from "./products/ProductsSlice"
import wishLists from "./wishLists/WishListsSlice"
import CartSlice from "./carts/CartsSlice"

export  const store= configureStore({
  reducer: {
    products: productsSlice,
    wishlists:wishLists,
    cart:CartSlice,

  },
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({serializableCheck: false}),
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch




