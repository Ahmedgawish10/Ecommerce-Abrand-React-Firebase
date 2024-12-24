export  interface Product {
  orders: any;
  totalAmount: any;
  createdAt: string | number | Date;
  userId: any;
  id?: string;
  name?: string;
  price?: number;
  imageUrl?:string;
  category?:string;
  timeStamp?:string
}
