import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Shared';
import { fetchUserCart, addToCart, removeFromCart } from './action/CartsActs';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import toast from 'react-hot-toast';

interface CartItem extends Product {
  quantity: number;
}


interface CartState {
  cart: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  cart: [],
  status: 'idle',
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product) {
        product.quantity = (product.quantity??0)+1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchUserCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserCart.fulfilled, (state, action: any) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch cart';
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<any>) => {
        const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);        
        if (itemIndex >= 0) {
          state.cart[itemIndex].quantity += action.payload.quantity;
          toast.success(`${state.cart[itemIndex].name} already in cart`)          
        } else {
          state.cart.push(action.payload);
          toast.success(`${action.payload.name} added to cart`)          

        }
        state.status = "succeeded";
            
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add to cart';
      })
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<Product>) => {
        const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
        if (itemIndex >= 0) {
          state.cart[itemIndex].quantity -= 1;
          if (state.cart[itemIndex].quantity === 0) {
            state.cart.splice(itemIndex, 1);
          }
        }
        state.status = "succeeded";
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to remove from cart';
      });
  },
});

export const { increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
