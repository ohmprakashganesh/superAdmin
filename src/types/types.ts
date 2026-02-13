// types/index.ts
export interface Owner {
  name: string;
  email: string;
  password: string;
}

export interface Subscription {
  plan: 'Basic' | 'Premium' | 'Enterprise';
  startDate: string;
  endDate: string;
}

export interface Restaurant {
  _id?: string;
  name: string;
  slug: string;
  tables: number;
  owner: Owner;
  subscription: Subscription;
  createdAt?: string;
  updatedAt?: string;
}

export interface RestaurantState {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
  selectedRestaurant: Restaurant | null;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}