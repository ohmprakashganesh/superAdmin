import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import PrimaryBtn from '../ui/PrimaryBtn';
import { X, Trash2, Plus, Info } from 'lucide-react';
import type { Plan } from '../../screens/plans/planType';

interface PlanFormProps {
  initialData?: Plan | null;
  onCancel: () => void;
  loading?: boolean;
}

const initialFormState: Plan = {
  id: "",
  name: '',
  slug: '',
  price: 0,
  tables: 1,
  features: [""],
  isPopular: false,
  types: "Basic",
  billingPeriod: "month",
};

export const PlanForm: React.FC<PlanFormProps> = ({
  initialData,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState<Plan>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(initialData ? { ...initialData } : initialFormState);
    setErrors({});
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Plan name is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required (e.g. basic-plan)';
    if (formData.price < 0) newErrors.price = 'Price cannot be negative';
    if (formData.tables < 1) newErrors.tables = 'At least 1 table required';
    
    // Validate that at least one feature has text
    const validFeatures = formData.features.filter(f => f.trim() !== "");
    if (validFeatures.length === 0) newErrors.features = "Add at least one feature";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? Number(value) : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    // Clear error when user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // --- Feature Handlers ---
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFeature();
    }
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      setFormData(prev => ({
        ...prev, 
        features: prev.features.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("hello");
      alert("hello")

      //clean data for features
      const cleanData: Plan = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== "")
      };
      
      console.log("Plan Form Submitted Data:", cleanData);
        onCancel();
      
    }
  };

  return (
    <div className="w-full bg-amber-500 mx-auto">
      <Card className="p-0 overflow-hidden border-none shadow-2xl">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {initialData ? 'Edit Pricing Plan' : 'Create New Plan'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">Configure your subscription tier details</p>
          </div>
          <button 
            onClick={onCancel} 
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            type="button"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Row 1: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Plan Name*" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              error={errors.name} 
              placeholder="e.g. Pro Membership"
            />

            <Input 
              label="Slug (URL identifier)*" 
              name="slug" 
              value={formData.slug} 
              onChange={handleChange} 
              error={errors.slug} 
              placeholder="pro-membership"
            />
          </div>

          {/* Row 2: Type & Billing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1.5">Plan Category</label>
              <select 
                name="types" 
                value={formData.types} 
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Gold">Gold</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1.5">Billing Period</label>
              <select 
                name="billingPeriod" 
                value={formData.billingPeriod} 
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="month">Monthly Billing</option>
                <option value="year">Yearly Billing</option>
              </select>
            </div>
          </div>

          {/* Row 3: Pricing & Limits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Price (INR)*" 
              name="price" 
              type="number" 
              value={formData.price} 
              onChange={handleChange} 
              error={errors.price} 
              placeholder="0.00"
            />

            <Input 
              label="Table Limit*" 
              name="tables" 
              type="number" 
              value={formData.tables} 
              onChange={handleChange} 
              error={errors.tables} 
              placeholder="10"
            />
          </div>

          {/* Features Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-700">Plan Features</label>
              <span className="text-[10px] text-gray-400 flex items-center gap-1">
                <Info size={12} /> Press Enter for new line
              </span>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2 group">
                  <div className="flex-1 relative">
                    <input
                      className={`w-full border rounded-lg px-4 py-2 text-sm transition-all focus:ring-2 focus:ring-blue-100 outline-none ${
                        errors.features ? 'border-red-300' : 'border-gray-200'
                      }`}
                      value={feature}
                      placeholder="e.g. 24/7 Priority Support"
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      autoFocus={index === formData.features.length - 1 && index !== 0}
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeFeature(index)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            
            {errors.features && <p className="text-xs text-red-500">{errors.features}</p>}

         
          </div>

          {/* Submit Actions */}
          <div className="pt-4 flex  justify-center  flex-col sm:flex-row gap-3">
<div className='w-[80%] mx-auto md:w-1/2 '>
  
            <PrimaryBtn 
              type="submit" 
              className="flex-1 py-3 rounded-xl shadow-lg shadow-blue-100" 
              disabled={loading}
            >
              {loading ? 'Saving Changes...' : initialData ? 'Update Plan Configuration' : 'Save & Publish Plan'}
            </PrimaryBtn>
</div>
            
          </div>
        </form>
      </Card>
    </div>
  );
};