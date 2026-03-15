
export interface Plan {
  id: string;
  name: string;
  slug: string;
  types: "Basic" | "Premium" | "Gold";
  price: number;
  tables: number;
  billingPeriod: "month" | "year";
  features: string[];
  isPopular?: boolean;
  subscribers:number;
}

export interface respPlan{
    message:string,
    success:boolean,
     data:Plan[],
   };

export interface PlanCardProps {
  plan: Plan;
  selected:string;
 setShowForm: React.Dispatch<React.SetStateAction<boolean | null>>;
  selectPlan:()=>void;
  onEdit: (plan: Plan) => void;
  onSelect: (planId: string) => void;

}

