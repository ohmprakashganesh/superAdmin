import type { Restaurant } from "../types/types";

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
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
      startDate: "2026-02-10",
      endDate: "2026-03-10",
    },
  },
]