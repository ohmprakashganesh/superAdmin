import { ActivitySquare, PlaneIcon, Users2 } from "lucide-react";
import type { Restaurant } from "../types/types";

export const mockRestaurants: Restaurant[] = [
  {
    _id: "1",
    name: "Pizza Corner1",
    slug: "pizza-corner1",
    tables: 8,
    owner: {
      name: "Alice Smith",
      email: "alice@pizza.com",
      password: "123456",
    },
    subscription: {
      plan: "Basic",
      status:"Active",
      startDate: "2026-02-10",
      endDate: "2026-03-10",
    },
  },
  {
    _id: "2",
    name: "Burger House",
    slug: "burger-house",
    tables: 10,
    owner: {
      name: "Bob Johnson",
      email: "bob@burger.com",
      password: "123456",
    },
    subscription: {
      plan: "Premium",
       status:"Active",
      startDate: "2026-01-05",
      endDate: "2026-04-05",
    },
  },
  {
    _id: "3",
    name: "Sushi World",
    slug: "sushi-world",
    tables: 12,
    owner: {
      name: "Charlie Lee",
      email: "charlie@sushi.com",
      password: "123456",
    },
    subscription: {
      plan: "Basic",
       status:"Active",
      startDate: "2026-02-01",
      endDate: "2026-05-01",
    },
  },
  {
    _id: "4",
    name: "Taco Fiesta",
    slug: "taco-fiesta",
    tables: 6,
    owner: {
      name: "Diana Cruz",
      email: "diana@taco.com",
      password: "123456",
    },
    subscription: {
      plan: "Basic",
       status:"Active",
      startDate: "2026-03-01",
      endDate: "2026-04-01",
    },
  },
  {
    _id: "5",
    name: "Pasta Palace",
    slug: "pasta-palace",
    tables: 14,
    owner: {
      name: "Ethan Brown",
      email: "ethan@pasta.com",
      password: "123456",
    },
    subscription: {
      plan: "Premium",
       status:"Active",
      startDate: "2026-01-15",
      endDate: "2026-06-15",
    },
  },
  {
    _id: "6",
    name: "Grill Master",
    slug: "grill-master",
    tables: 9,
    owner: {
      name: "Fiona White",
      email: "fiona@grill.com",
      password: "123456",
    },
    subscription: {
      plan: "Enterprise",
       status:"Active",
      startDate: "2026-02-20",
      endDate: "2026-05-20",
    },
  },
  {
    _id: "7",
    name: "Seafood Delight",
    slug: "seafood-delight",
    tables: 11,
    owner: {
      name: "George Miller",
      email: "george@seafood.com",
      password: "123456",
    },
    subscription: {
      plan: "Basic",
       status:"Active",
      startDate: "2026-02-12",
      endDate: "2026-03-12",
    },
  },
  {
    _id: "8",
    name: "BBQ Nation",
    slug: "bbq-nation",
    tables: 16,
    owner: {
      name: "Hannah Wilson",
      email: "hannah@bbq.com",
      password: "123456",
    },
    subscription: {
      plan: "Premium",
       status:"Active",
      startDate: "2026-01-10",
      endDate: "2026-07-10",
    },
  },
  {
    _id: "9",
    name: "Veggie Garden",
    slug: "veggie-garden",
    tables: 7,
    owner: {
      name: "Ian Clark",
      email: "ian@veggie.com",
      password: "123456",
    },
    subscription: {
      plan: "Enterprise",
       status:"Active",
      startDate: "2026-03-01",
      endDate: "2026-06-01",
    },
  },
  {
    _id: "10",
    name: "Steak House",
    slug: "steak-house",
    tables: 18,
    owner: {
      name: "Julia Adams",
      email: "julia@steak.com",
      password: "123456",
    },
    subscription: {
      plan: "Premium",
       status:"Active",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
    },
  },
];



export const mockSummery = {
  message: "successfull",
  success: true,
  data: [
    {
      title: "Total Subscriber",
      icon: Users2,
      textColor:"white",
      bgColor: "bg-gradient-to-r  to-emerald-500 text-white",
      value: 55
    },
    {
      title: "Total Plans",
      icon: PlaneIcon,
      bgColor: "bg-gradient-to-r  to-indigo-500 text-white",
      value: 8
    },
    {
      title: "Active Subscriber",
      icon: ActivitySquare,
      bgColor: "bg-gradient-to-r  to-blue-400 text-white",
      value: 22
    }
  ]
};
     export const subscriptions= [
    {
      "plan": "Basic",
      "subscribers": 3,
      "percentage": 45
    },
    {
      "plan": "Premium",
      "subscribers": 3,
      "percentage": 35
    },
    {
      "plan": "Enterprise",
      "subscribers": 1,
      "percentage": 20
    }
  ]