import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Shared';
import { fetchWishlist, addToWishlist, removeFromWishlist } from './action/FetchProducts';

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
  reducers: {}, // No synchronous reducers in this case
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishlist.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.wishlist = action.payload;
        
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch wishlist';
      })

      // Add to Wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToWishlist.fulfilled, (state,action:any) => {
        state.status = 'succeeded';
        const productExists = state.wishlist.some(  (product: any) => product?.id === action?.payload.id );
        if (!productExists) {
          console.log(7);
          
          state.wishlist.push(action.payload); 
        }
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
        if (action.payload) {
          // If the payload exists, remove the product from the wishlist
           state.wishlist = state.wishlist.filter((product) => product.id !== action.payload.id);
        } else {
          console.error('Product to remove not found.');
        }
        // Optionally, remove the product locally from wishlist state
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to remove from wishlist';
      });
  },
});

export default wishlistSlice.reducer;
