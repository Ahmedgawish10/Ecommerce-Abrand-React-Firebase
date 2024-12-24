import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';
import { Product } from '../../../types/Shared'; 
import { db } from '../../../config/Firebase';

// Fetch Cart
export const fetchUserCart = createAsyncThunk<Product[], string>(
  'cart/fetchCart',
  async (userId) => {    
    const cartCollection = collection(db, `users/${userId}/cart`);
    const cartSnapshot = await getDocs(cartCollection);

    return cartSnapshot.docs.map((doc) => {
      const data = doc.data() as Product;
      return {
        id: doc.id,
        ...data,
      };
    });
  }
);

// Add to Cart
export const addToCart = createAsyncThunk<Product, { userId: string; product: Product }>(
  'cart/addToCart',
  async ({ userId, product }) => {
    const cartDoc = doc(db, `users/${userId}/cart/${product.name}`);

    const cartDocSnapshot = await getDoc(cartDoc);    
    if (cartDocSnapshot.exists()) {      
      const currentQuantity = cartDocSnapshot.data()?.quantity ?? 0;
      await setDoc(cartDoc, { ...product, userId, quantity: currentQuantity + 1 });      
    }else {
      await setDoc(cartDoc, { ...product, userId, quantity: 1 });
    }
    return { ...product, quantity: 1 };
  }
);


// Remove from Cart
export const removeFromCart = createAsyncThunk<Product, { userId: string; product: Product }>(
  'cart/removeFromCart',
  async ({ userId, product }) => {
    const cartDoc = doc(db, `users/${userId}/cart/${product.name}`);
    const cartSnap = await getDoc(cartDoc);

    if (cartSnap.exists()) {
      const currentData = cartSnap.data();
      if (currentData.quantity > 1) {
        await updateDoc(cartDoc, { quantity: currentData.quantity - 1 });
      } else {
        await deleteDoc(cartDoc);
      }
    } else {
      throw new Error(`Cart item ${product.name} does not exist.`);
    }
    return product;
  }
);
//clear cart when use already payment 
export const clearCart = createAsyncThunk<void, string>(
  'cart/clearCart',
  async (userId) => {
    const cartCollection = collection(db, `users/${userId}/cart`);
    const cartSnapshot = await getDocs(cartCollection);
    // loop through each document and delete synchronously
    for (const doc of cartSnapshot.docs) {
      await deleteDoc(doc.ref); 
    }
  }
);
