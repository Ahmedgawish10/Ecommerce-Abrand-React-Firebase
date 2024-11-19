import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { Product } from '../../../types/Shared'; 
import { db } from '../../../config/Firebase';

// Fetch Wishlist
export const fetchUserWishlists = createAsyncThunk<Product[], string>(
  'wishlist/fetchWishlist',
  async (userId) => {
    const wishlistCollection = collection(db, `users/${userId}/wishlist`);
    const wishlistSnapshot = await getDocs(wishlistCollection);

    return wishlistSnapshot.docs.map((doc) => {
      const data = doc.data() as Product;
      return {
        id: doc.id,
        ...data,
      };
    });
  }
);
// add to wishlist
export const addToWishlist = createAsyncThunk<Product, { userId: string; product: Product }>(
  'wishlist/addToWishlist',
  async ({ userId, product }) => {
    const wishlistDoc = doc(db, `users/${userId}/wishlist/${product.name}`);
    await setDoc(wishlistDoc, { ...product, userId }); 

    return product; 
  }
);
// remove from wishlist
export const removeFromWishlist = createAsyncThunk<Product, { userId: string; product: Product }>(
  'wishlist/removeFromWishlist',
  async ({ userId, product }) => {
    const wishlistDoc = doc(db, `users/${userId}/wishlist/${product.name}`);
    await deleteDoc(wishlistDoc);

    return product; 
  }
);



