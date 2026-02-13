import type { Plan } from "./planType";

  const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 999,
    slug:"this is sub title",
    tables:44,
    billingPeriod: "month",
    features: ["5 Restaurants", "Basic Support", "Monthly Reports"],
  },
  {
    id: "pro",
    name: "Pro",
     slug:"this is sub title",
    tables:14,
    price: 1999,
    billingPeriod: "month",
    features: ["Unlimited Restaurants", "Priority Support", "Analytics Dashboard"],
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 4999,
    slug:"this is sub title",
    tables:4,
    billingPeriod: "month",
    features: ["Custom Features", "Dedicated Manager", "24/7 Support"],
  },
];

export default plans;

