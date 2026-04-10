export type RequestItem = {
  productId: number;
  productName: string;
  quantity: number;
};

export type StockRequest = {
  id: number;
  items: RequestItem[];
  status: "pending" | "approved" | "rejected";
};

export const products = [
  { id: 1, name: "Paracetamol" },
  { id: 2, name: "Vitamin C" },
];

export const stockRequests: StockRequest[] = [];

export const batches = [
  {
    id: 1,
    productId: 1,
    batchCode: "A001",
    quantity: 5,
    expiryDate: "2025-04-20",
  },
  {
    id: 2,
    productId: 1,
    batchCode: "A002",
    quantity: 20,
    expiryDate: "2025-05-01",
  },
  {
    id: 3,
    productId: 2,
    batchCode: "B001",
    quantity: 15,
    expiryDate: "2025-04-18",
  },
];
