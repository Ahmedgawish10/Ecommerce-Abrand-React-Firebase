export  interface Product {
  orders: any;
  totalAmount: number;
  createdAt: string | number | Date;
  userId: any;
  id?: string;
  name?: string;
  price?: number;
  imageUrl?:string;
  category?:string;
  timeStamp?:string
}

export interface AddToOrdersPayload {
  order: Product;  
  orderUserId: string; 
}
export interface Orders {
  createdAt?:string;
  orderFlow?:string;
  orders?: Product[];  
  status?:string;
  totalAmount?:number;
  userId?: string; 
}


