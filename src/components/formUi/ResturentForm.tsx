import React, { useState, useEffect } from "react";
import { Card } from "../ui/Card";
import type { Restaurant } from "../../types/types";
import { Input } from "../ui/Input";
import PrimaryBtn from "../ui/PrimaryBtn";
import { X, Store, User, CreditCard, StoreIcon } from "lucide-react";

interface RestaurantFormProps {
  initialData?: Restaurant | null;
  onSubmit: (data: Restaurant) => void;
  onClose: () => void;
  loading?: boolean;
}
const initialFormState: Restaurant = {
  name: "",
  slug: "",
  tables: 0,
  owner: { name: "", email: "", password: "" },
  subscription: { plan: "Basic", startDate: "", endDate: "" },
};

export const RestaurantForm: React.FC<RestaurantFormProps> = ({
  initialData,
  onSubmit,
  onClose,
  loading = false,
}) => {
  const [formData, setFormData] = useState<Restaurant>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialFormState);
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Restaurant Validation
    if (!formData.name.trim()) newErrors.name = "Restaurant name is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (formData.tables <= 0) newErrors.tables = "Must have at least 1 table";

    // Owner Validation
    if (!formData.owner.name.trim())
      newErrors["owner.name"] = "Owner name is required";
    if (!formData.owner.email.trim()) {
      newErrors["owner.email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.owner.email)) {
      newErrors["owner.email"] = "Invalid email format";
    }
    if (!initialData && !formData.owner.password?.trim()) {
      newErrors["owner.password"] = "Password is required for new accounts";
    }

    // Subscription Validation
    if (!formData.subscription.startDate)
      newErrors["subscription.startDate"] = "Start date required";
    if (!formData.subscription.endDate)
      newErrors["subscription.endDate"] = "End date required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      console.log("this is form resturent form",formData);
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        return {
          ...prev,
          [parent]: {
            ...(prev[parent as keyof Restaurant] as any),
            [child]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });

    console.log("this is form data",formData)

    // Clear error dynamically
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const SectionHeader = ({
    icon: Icon,
    title,
  }: {
    icon: any;
    title: string;
  }) => (
    <div className="col-span-2  flex items-center gap-2 border-b border-gray-100 pb-2 mb-4 mt-4">
      <Icon size={18} className="text-blue-600" />
      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
        {title}
      </h3>
    </div>
  );

  return (
    <Card className="max-w-3xl mx-auto shadow-xl border-none">
      {/* Header */}
      <div className="flex w-full justify-between items-center bg-gray-50 -m-6 p-6 rounded-t-xl border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {initialData ? "Edit Restaurant" : "Onboard Restaurant"}
          </h2>
          <p className="text-sm text-gray-500">
            Enter the details to manage the restaurant profile.
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className=" flex flex-col gap-y-6">
          <fieldset className="grid grid-cols-2 border-2 border-muted/40 rounded-2xl p-4 gap-x-6 w-full">
            <legend className="flex gap-x-3 mx-3">
              <StoreIcon /> <p>Business Identity</p>
            </legend>
            {/* <SectionHeader icon={Store} title="Business Identity"/> */}
            <Input
              label="Restaurant Name*"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="e.g. The Grand Bistro"
            />
            <Input
              label="Slug (URL identifier)*"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              error={errors.slug}
              placeholder="grand-bistro"
            />
            <Input
              label="Total Capacity (Tables)*"
              name="tables"
              type="number"
              value={formData.tables}
              onChange={handleChange}
              error={errors.tables}
            />
          </fieldset>

          <fieldset className="grid grid-cols-2 border-2 border-muted/40 rounded-2xl p-4 gap-x-6 w-full">
            <legend className="flex gap-x-3 mx-3">
              <User /> <p>Owner Credentials</p>
            </legend>
            <Input
              label="Full Name*"
              name="owner.name"
              value={formData?.owner?.name}
              onChange={handleChange}
              error={errors["owner.name"]}
              placeholder="John Doe"
            />
            <Input
              label="Login Email*"
              name="owner.email"
              type="email"
              value={formData?.owner?.email}
              onChange={handleChange}
              error={errors["owner.email"]}
              placeholder="owner@restaurant.com"
            />
            <Input
              label={initialData ? "Change Password" : "Password*"}
              name="owner.password"
              type="password"
              value={formData?.owner?.password}
              onChange={handleChange}
              error={errors["owner.password"]}
              placeholder="••••••••"
            />
          </fieldset>

          <fieldset className="grid grid-cols-2 border-2 border-muted/40 rounded-2xl p-4 gap-x-6 w-full">
            <legend className="flex gap-x-3 mx-3">
              <CreditCard />
              <p>Subscription Plan</p>
            </legend>
            <div className="flex flex-col mb-4">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                Select Tier
              </label>
              <select
                name="subscription.plan"
                value={formData.subscription.plan}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              >
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <div className="hidden md:block" /> {/* Spacer for grid */}
            <Input
              label="Activation Date"
              name="subscription.startDate"
              type="date"
              value={formData.subscription.startDate}
              onChange={handleChange}
              error={errors["subscription.startDate"]}
            />
            <Input
              label="Expiry Date"
              name="subscription.endDate"
              type="date"
              value={formData.subscription.endDate}
              onChange={handleChange}
              error={errors["subscription.endDate"]}
            />
          </fieldset>
        </div>

        {/* Action Buttons */}
        <div className=" flex items-center justify-center gap-4 mt-10 pt-6 border-t border-gray-100">
          <div className="w-48">
            <PrimaryBtn
              type="button"
              onClick={onClose}
              className="px-8 py-2.5 mt-1 text-sm font-semibold bg-red-600/70 hover:bg-red-600 rounded-md text-gray-600 hover:text-gray-800 transition-colors"
            >
              cancel
            </PrimaryBtn>
          </div>

          <div className="w-48">
            <PrimaryBtn type="submit" disabled={loading}>
              {loading
                ? "Processing..."
                : initialData
                  ? "Save Changes"
                  : "Confirm Onboarding"}
            </PrimaryBtn>
          </div>
        </div>
      </form>
    </Card>
  );
};
