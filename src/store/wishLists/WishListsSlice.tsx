import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Shared';
import { fetchUserWishlists, addToWishlist, removeFromWishlist } from './action/WishListsActs';

interface WishlistState {
  wishlist: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WishlistState = {
  wishlist: [],
  status: 'idle',
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserWishlists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserWishlists.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.wishlist = action.payload;
      })
      .addCase(fetchUserWishlists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch wishlist';
      })
      // Add to Wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToWishlist.fulfilled, (state,action:any) => {
        state.status = 'succeeded';
        const productExists = state.wishlist.filter((product: any) => product?.id === action?.payload.id );
        console.log("*");
        
          state.wishlist.push(action.payload); 
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add to wishlist';
      })
      // Remove from Wishlist
      .addCase(removeFromWishlist.pending, (state,action) => {
        state.status = 'loading';
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
           state.wishlist = state.wishlist.filter((product) => product.id !== action.payload.id);
          })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to remove from wishlist';
      });
  },
});

export default wishlistSlice.reducer;
