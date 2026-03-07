import React, { useState } from 'react'


 import plans from "./mock";
import PlanCard from './PlanCard';
import type { Plan } from './planType';
import PrimaryBtn from '../../components/ui/PrimaryBtn';
import { PlanForm } from '../../components/formUi/PlanFrom';

const Plans: React.FC = () => {
    const [showForm, setShowForm] = useState<boolean | null>(false);

  const handleSelect = (planId: string) => {
    console.log("Selected Plan:", planId);
  };

  return (
    <div className="grid grid-cols-3    gap-6"> 
    <div className='col-span-3 flex justify-end   pb-8'>
      <div className='w-1/6'>
       <PrimaryBtn onClick={() => {setShowForm(true) }}  value={"button"} >Add Plan</PrimaryBtn>

      </div>
      </div>
    <div className="grid col-span-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-6"> 
      {plans.map((plan:Plan) => (
        <PlanCard key={plan.id} plan={plan} onSelect={handleSelect} />
      ))}
      </div>
      
      {showForm && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
               <div className="bg- w-4xl bg-amber-500 p-2 rounded-2xl shadow-2xl">
                  <PlanForm onCancel={() => setShowForm(false)} />
               </div>
            </div>
          )}
    </div>
  );
};

export default Plans;