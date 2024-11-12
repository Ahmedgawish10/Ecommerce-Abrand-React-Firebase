// src/features/products/fetchProducts.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '../../../types/Shared'; // Ensure this path is correct
import { db } from '../../../config/Firebase';

// Async action to fetch products from Firebase
 const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const productsCollection = collection(db, 'products');
    const productSnapshot = await getDocs(productsCollection);
    return productSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Product) // Cast to Product to ensure TypeScript compliance
    }));
  }
);
export default fetchProducts;