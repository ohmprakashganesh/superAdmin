import type { OrderItem } from "../features/user/cart/OrderTypes";

export interface Order {
  _id: string;
  tableNumber: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  status: string;
  createdAt: string;
}



export interface OrderResponse{
 message:string;
 orders:Order[];
};

export interface ProductResponse{
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  serveTime: number;
  isPopular: boolean;
  orders:OrderItem[];
  isTodaySpecial: boolean;
  image: {
    url: string;
    public_id: string;
  };
  createdAt: string;
  updatedAt: string;
};

export interface tableNumber{tableNumber:string};

export interface OrderPayload{
    tableNumber:number;
    productId:string;
    quantity:number;
}