import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import PrimaryBtn from '../ui/PrimaryBtn';
import { X, Trash2, Info } from 'lucide-react';
import type { Plan } from '../../screens/plans/planType';

interface PlanFormProps {
  selectedPlan?: Plan | null;
  setShowForm: (val: boolean) => void;
  onSubmit: (data: Plan) => void;
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
  selectedPlan,
  setShowForm,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState<Plan>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedPlan) {
      setFormData({ ...selectedPlan });
    } else {
      setFormData(initialFormState);
    }
  }, [selectedPlan]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.slug.trim()) newErrors.slug = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? Number(value) : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const cleanData: Plan = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== "")
      };
      onSubmit(cleanData); 
    }
  };

  return (
    <Card className="p-0 overflow-hidden   z-50  border-none shadow-2xl bg-white">
      <div className="bg-gray-50  py-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">{selectedPlan ? 'Edit Plan' : 'Create Plan'}</h2>
        <button onClick={() => setShowForm(false)}><X /></button>
      </div>

      <form onSubmit={handleSubmit} className=" mt-3 space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
          <Input label="Slug" name="slug" value={formData.slug} onChange={handleChange} error={errors.slug} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Price" name="price" type="number" value={formData.price} onChange={handleChange} />
          <Input label="Tables" name="tables" type="number" value={formData.tables} onChange={handleChange} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Features</label>
          {formData.features.map((f, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input 
                className="flex-1 border p-2 rounded" 
                value={f} 
                onChange={(e) => {
                  const newFeat = [...formData.features];
                  newFeat[i] = e.target.value;
                  setFormData({...formData, features: newFeat});
                }}
              />
              <button type="button" onClick={() => {
                setFormData({...formData, features: formData.features.filter((_, idx) => idx !== i)});
              }}><Trash2 size={18}/></button>
            </div>
          ))}
          <button 
            type="button" 
            className="text-blue-600 text-sm"
            onClick={() => setFormData({...formData, features: [...formData.features, ""]})}
          >
            + Add Feature
          </button>
        </div>

        <PrimaryBtn type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Plan'}
        </PrimaryBtn>
      </form>
    </Card>
  );
};
export default PlanForm;