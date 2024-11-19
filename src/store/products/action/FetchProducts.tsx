import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '../../../types/Shared'; 
import { db } from '../../../config/Firebase';

const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const productsCollection = collection(db, 'products');
    const productSnapshot = await getDocs(productsCollection);

    return productSnapshot.docs.map((doc) => {
      const data = doc.data() as Product; 
      
      return {
        id: doc.id,
        ...data,
      };
    });
  }
);

export default fetchProducts;
