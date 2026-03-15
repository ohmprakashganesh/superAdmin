import React, { useState } from "react";
import PlanCard from "./PlanCard";
import type { Plan } from "./planType";
import PrimaryBtn from "../../components/ui/PrimaryBtn";
import { PlanForm } from "../../components/formUi/PlanFrom";
import { usePlan } from "../../hooks/usePlan";

const Plans: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const {
    selectPlan,
    selectedPlan,
    plans,
    summery,
    removePlan,
    addPlan,
    editPlan,
  } = usePlan();


  const handleCreatePlan = async (data: Plan) => {
    try {
      await addPlan(data);
      closeAndReset();
    } catch (error) {
      console.error('Failed to create plan:', error);
    }
  };

  const handleUpdatePlan = async (data: Plan) => {
    if (selectedPlan) {
      try {
        await editPlan(selectedPlan.id, data);
        closeAndReset();
      } catch (error) {
        console.error('Failed to update plan:', error);
      }
    }
  };

  const closeAndReset = () => {
    setShowForm(false);
    selectPlan(null); // Clear selection so "Add Plan" starts fresh next time
  };

  const onEditTrigger = (plan: Plan) => {
    selectPlan(plan);
    setShowForm(true);
  };

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      <div className="col-span-3 flex justify-end pb-8">
        <div className="w-1/6">
          <PrimaryBtn
            onClick={() => {
              selectPlan(null); // Reset for new entry
              setShowForm(true);
            }}
          >
            Add Plan
          </PrimaryBtn>
        </div>
      </div>
      
      <div className="grid col-span-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {plans.map((plan: Plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onEdit={onEditTrigger}
            onDelete={removePlan}
          />
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-4xl p-2">
            <PlanForm
              selectedPlan={selectedPlan}
              setShowForm={setShowForm}
              onSubmit={selectedPlan ? handleUpdatePlan : handleCreatePlan}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;