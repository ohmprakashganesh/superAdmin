import React from 'react'


 import plans from "./mock";
import PlanCard from './PlanCard';
import type { Plan } from './planType';

const Plans: React.FC = () => {
  const handleSelect = (planId: string) => {
    console.log("Selected Plan:", planId);
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 p-8">
      {plans.map((plan:Plan) => (
        <PlanCard key={plan.id} plan={plan} onSelect={handleSelect} />
      ))}
    </div>
  );
};

export default Plans;