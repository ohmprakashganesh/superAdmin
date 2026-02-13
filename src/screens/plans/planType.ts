export interface Plan {
  id: string;
  name: string;
  slug:string;
  types:"Basic|Premium|Gold";
  price: number;
  tables:number;
  billingPeriod: "month | year";
  features: string[];
  isPopular?: boolean;
}

 export interface PlanCardProps {
  plan: Plan;
  onSelect: (planId: string) => void;
}