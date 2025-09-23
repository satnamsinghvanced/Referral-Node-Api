export  interface IPrice {
  daily?: number;
  monthly?: number;
  yearly?: number;
  custom?: string;
}

export interface ISubscription {
  title: string;
  description?: string;
  price: IPrice;
  pointTitle?: string;
  points?: string[];
  createdAt: Date;
}

export type ResponseStatus = "success" | "error";


