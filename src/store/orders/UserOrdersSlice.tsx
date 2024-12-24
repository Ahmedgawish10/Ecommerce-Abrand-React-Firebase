import { Product } from "../../types/Shared";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";

// Add to Orders Thunk
export const addToOrders = createAsyncThunk<any, any>(
  "orders/addToOrders",
  async ({order,orderId}) => {   
    const orderDoc = doc(db, `users/${auth.currentUser?.uid}/orders/${new Date().getTime()}`);
    const totalAmount = order.reduce((total: number, item: any) => total + (item.price ?? 0) * (item.quantity ?? 1), 0);
    
    await setDoc(orderDoc, {
      userId: auth.currentUser?.uid,
      orders: order, 
      createdAt: new Date().toISOString(),
      totalAmount: totalAmount, 
      status:"Processing",
      orderFlow:orderId
    });    
    return { ...order};
  }
);
// Get All Orders Thunk
export const getAllOrders = createAsyncThunk<any, any>(
  "orders/getAllOrders",
  async ({ userId }:any) => {
    const ordersCollection = collection(db, `users/${userId}/orders`);
    const ordersSnapshot = await getDocs(ordersCollection);

    const orders: Product[] = ordersSnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as Product[];

    return orders;
  }
);



interface OrdersState {
  orders: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToOrders.fulfilled, (state, action: any) => {
        state.loading = false;
        state.orders.push(action.payload);
        console.log("lk",action.payload);
        
      })
      .addCase(addToOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add to orders.";
      })
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.orders = action.payload;
        console.log( action.payload);
        
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders.";
      });
  },
});

export default ordersSlice.reducer;
