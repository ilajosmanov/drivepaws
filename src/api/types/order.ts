export type OrderResponse = {
  canWait: boolean;
  createdAt: string;
  documents: string[];
  injury: string;
  location: (string | number)[];
  name: string;
  orderStatus: number;
  phone: string;
  quantity: number;
  _id: string;
}
