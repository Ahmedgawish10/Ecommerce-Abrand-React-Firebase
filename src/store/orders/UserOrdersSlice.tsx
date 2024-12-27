import { Product } from "../../types/Shared";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";
import { AddToOrdersPayload } from "../../types/Shared";
import { Orders } from "../../types/Shared";

// add New order
export const addToOrders = createAsyncThunk<Orders, { order:any; orderUserId: string } >(
  "orders/addToOrders",async ({order,orderUserId}) => {   
  console.log("hi1",order);
  console.log("hi2",orderUserId);
    const orderDoc = doc(db, `users/${auth.currentUser?.uid}/orders/${new Date().getTime()}`);
    const totalAmount = order.reduce((acuTotal: number, item: any) => acuTotal + (item.price ?? 0) * (item.quantity ?? 1), 0);
    let OrderUser={
      userId: auth.currentUser?.uid,
      orders: order, 
      createdAt: new Date().toISOString(),
      totalAmount: totalAmount, 
      status:"Processing",
      orderFlow:orderUserId
            }
    await setDoc(orderDoc, OrderUser);   
     return OrderUser;
  }
);
// get All Orders 
export const getAllOrders = createAsyncThunk<Orders[], {userId:string}>("orders/getAllOrders",
  async ({ userId }) => {
    const ordersCollection = collection(db, `users/${userId}/orders`);
    const ordersSnapshot = await getDocs(ordersCollection);

    const orders: Orders[] = ordersSnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as any[];

    return orders;
  }
);

interface OrdersState {
  orders: Orders[];
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
      .addCase(addToOrders.fulfilled, (state, action: PayloadAction<Orders> ) => {
        state.loading = false;
        state.orders.push(action.payload);                
      })
      .addCase(addToOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add to orders.";
      })
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action: PayloadAction<Orders[]>) => {
        state.loading = false;
        state.orders = action.payload;        
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders.";
      });
  },
});

export default ordersSlice.reducer;
