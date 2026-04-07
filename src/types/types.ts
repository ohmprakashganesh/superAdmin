import type { Interface } from "readline";
import type { Plan } from "../screens/plans/planType";

// types/index.ts
export interface Owner {
  name: string;
  email: string;
  password: string;
}

export interface Subscription {
  plan: 'Basic' | 'Premium' | 'Enterprise';
  status:"Active"|"Inactive"
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
  plans:Plan[];
  summery:[]|null;
  loading: boolean;
  error: string | null;
  selectedRestaurant: Restaurant | null;
  selectedPlan:Plan |null;
  isFormOpen:boolean;
  isProfileOpen:boolean;
  sideStatus:boolean;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface summeryData {
    totalSubscriber:number, totalPlans:number; activeSubscriber:number
};

export interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  method: string;
}

export interface initialData {
  id: string;
  name: string;
  email: string;
  logoUrl?: string;
  isActive: boolean;
  packageTier: 'Basic' | 'Standard' | 'Premium' | 'Enterprise';
  nextBillingDate: string;
  totalOrders: number;
  staffLimit: number;
  currentStaffCount: number;
  paymentHistory: PaymentHistory[];
}

export interface CompanyProfileProps {
  company: initialData;
  onEdit: () => void;
  onView:()=>void;
  onClose: () => void;
  onManageSubscription: (id: string) => void;
  onToggleStatus: (id: string, status: boolean) => void;
}

 export interface SummeryData{
  totalSubscriber:number; totalPlans:number; activeSubscriber:number
}