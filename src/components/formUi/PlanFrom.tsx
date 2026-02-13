// components/restaurants/RestaurantForm.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';

import type { Restaurant } from '../../types/types';
import { Input } from '../ui/Input';
import PrimaryBtn from '../ui/PrimaryBtn';
import { X } from 'lucide-react';
import type { Plan } from '../../screens/plans/planType';

interface RestaurantFormProps {
  initialData?: Restaurant | null;
  onSubmit: (data: Restaurant) => void;
  onCancel: () => void;
  loading?: boolean;
}
 id: string;
  name: string;
  slug:string;
  types:"Basic|Premium|Gold";
  price: number;
  tables:number;
  billingPeriod: "month" | "year";
  features: string[];
  isPopular?: boolean;
const initialFormState:Plan = {
      name: '',
      slug: '',
      types:'',
      price:0,
      tables:0,
     features:[],
     isPopular:false,
    password: '',



  };

export const RestaurantForm: React.FC<RestaurantFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState<Restaurant>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Restaurant name is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
    if (formData.tables <= 0) newErrors.tables = 'Number of tables must be greater than 0';
    if (!formData.owner.name.trim()) newErrors['owner.name'] = 'Owner name is required';
    if (!formData.owner.email.trim()) {
      newErrors['owner.email'] = 'Owner email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.owner.email)) {
      newErrors['owner.email'] = 'Email is invalid';
    }
    if (!formData.owner.password.trim() && !initialData) {
      newErrors['owner.password'] = 'Password is required';
    }
    if (!formData.subscription.startDate) {
      newErrors['subscription.startDate'] = 'Start date is required';
    }
    if (!formData.subscription.endDate) {
      newErrors['subscription.endDate'] = 'End date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('owner.')) {
      const ownerField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        owner: {
          ...prev.owner,
          [ownerField]: value,
        },
      }));
    } else if (name.startsWith('subscription.')) {
      const subField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        subscription: {
          ...prev.subscription,
          [subField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <Card>
      <div className='flex w-full justify-between '>
        <h2 className="text-xl font-semibold mb-6">
        {initialData ? 'Edit Restaurant' : 'Add New Restaurant'}
      </h2>
      <h2><X  size={15} className=' rounded-md  w-10 text-black outline-1'    height={25} onClick={onCancel}/></h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-5">
          <div className="col-span-2 ">
            <h3 className="text-md  text-gray-700 mb-1 text-center underline font-semibold">Restaurant Information</h3>
          </div>
          
          <Input
            label="Restaurant Name*"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Pizza Corner"
          />
          
          <Input
            label="Slug*"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            error={errors.slug}
            placeholder="pizza-corner"
          />
          
          <Input
            label="Number of Tables*"
            name="tables"
            type="number"
            value={formData.tables}
            onChange={handleChange}
            error={errors.tables}
            min="1"
          />

          <div className="col-span-2">
            <h3 className="text-md  mt-2 text-gray-700 underline underline-offset-2 font-semibold text-center ">Owner Information</h3>
          </div>
          
          <Input
            label="Owner Name*"
            name="owner.name"
            value={formData.owner.name}
            onChange={handleChange}
            error={errors['owner.name']}
            placeholder="John Doe"
          />
          
          <Input
            label="Owner Email*"
            name="owner.email"
            type="email"
            value={formData.owner.email}
            onChange={handleChange}
            error={errors['owner.email']}
            placeholder="owner@example.com"
          />
          
          <Input
            label="Password*"
            name="owner.password"
            type="password"
            value={formData.owner.password}
            onChange={handleChange}
            error={errors['owner.password']}
            placeholder={initialData ? '••••••••' : 'Enter password'}
            required={!initialData}
          />

          <div className="col-span-2">
            <h3 className="text-md font-medium text-gray-700 mb-3 mt-2  text-center underline underline-offset-2">Subscription Details</h3>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
            <select
              name="subscription.plan"
              value={formData.subscription.plan}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          
          <Input
            label="Start Date"
            name="subscription.startDate"
            type="date"
            value={formData.subscription.startDate}
            onChange={handleChange}
            error={errors['subscription.startDate']}
          />
          
          <Input
            label="End Date"
            name="subscription.endDate"
            type="date"
            value={formData.subscription.endDate}
            onChange={handleChange}
            error={errors['subscription.endDate']}
          />
        </div>

        <div className="flex md:w-1/3 mx-auto lg:w-1/3 w-[90%] mt-6">
          <PrimaryBtn
            type="submit"
            disabled={loading}
          >
            {loading ? 'Saving...' : initialData ? 'Update Restaurant' : 'Create Restaurant'}
          </PrimaryBtn>
        </div>
      </form>
    </Card>
  );
};