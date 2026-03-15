import type { Plan } from "./planType";


export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    slug: "this is sub  latest version",
    types: "Basic",
    price: 999,
    tables: 44,
    billingPeriod: "month",
    features: ["5 Restaurants", "Basic Support", "Monthly Reports"],
    subscribers:5
  },
  {
    id: "pro",
    name: "Pro",
    slug: "this is sub title",
    types: "Premium",
    price: 1999,
    tables: 14,
    billingPeriod: "month",
    features: ["Unlimited Restaurants", "Priority Support", "Analytics Dashboard"],
    isPopular: true,
      subscribers:5
  },
  {
    id: "enterprise",
    name: "Enterprise",
    slug: "this is sub title",
    types: "Gold",
    price: 4999,
    tables: 4,
    billingPeriod: "month",
    features: ["Custom Features", "Dedicated Manager", "24/7 Support"],
      subscribers:5
  },
];
export default plans;

export const respPlanData={
  message: "success",
  success: true,
  data:plans

}