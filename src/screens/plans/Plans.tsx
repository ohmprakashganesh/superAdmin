import React, { useState } from "react";
import PlanCard from "./PlanCard";
import type { Plan } from "./planType";
import PrimaryBtn from "../../components/ui/PrimaryBtn";
import { PlanForm } from "../../components/formUi/PlanFrom";
import { usePlan } from "../../hooks/usePlan";
import { PlusIcon } from "lucide-react";

const Plans: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const {
    selectPlan,
    selectedPlan,
    plans,
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
        <div className='absolute bg-black/50 overflow-scroll inset-0 z-50 w-full h-screen '>
          <div className='mx-auto lg:w-[70%] md:w-[55%] w-full px-5 mt-10 h-fit py-5'>
            <PlanForm
              selectedPlan={selectedPlan}
              setShowForm={setShowForm}
              onSubmit={selectedPlan ? handleUpdatePlan : handleCreatePlan}
            />
          </div>
        </div>
      )}

      
         <div className=' absolute bottom-10 right-10 flex justify-center items-center '>
            <PrimaryBtn
                onClick={() => {
              selectPlan(null); // Reset for new entry
              setShowForm(true);
            }}
            >
              <PlusIcon className=" md:size-5  lg:size-5 size-3  " />
            </PrimaryBtn>
          </div>
    </div>
  );
};

export default Plans;