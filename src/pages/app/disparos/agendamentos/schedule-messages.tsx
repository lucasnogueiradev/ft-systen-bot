import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Helmet } from "react-helmet-async";
import { SelectGroup } from "./selecet-group";
import { FormDataMessage } from "../../../../types/index";
// import { toast } from "sonner";

import { TableMenssagens } from "./table-messages";
import { SelectMessage } from "./select-messages";
import { FinalStep } from "./final-step";

const initialFormData: FormDataGroup = {
  groups: [],
  message: { _id: "", content: "", name: "" },
};

export interface FormDataGroup {
  groups: Array<{
    _id?: string;
    groupId: string;
    groupLink: string;
    groupName: string;
  }>;
  message: { _id: string; name: string; content: string; userId?: string };
}

const STEPS = {
  TABLE: 1,
  GROUP: 2,
  MESSAGE: 3,
  FINAL: 4,
} as const;

export function ScheduleMessages() {
  const [currentStep, setCurrentStep] = useState<number>(STEPS.TABLE);
  const [formData, setFormData] = useState<FormDataGroup>(initialFormData);

  // const handleDataChange = (step: number, data: any) => {
  //   setFormData((prevData) => {
  //     if (step === 2) {
  //       return {
  //         ...prevData,
  //         group: data,
  //       };
  //     }
  //     if (step === 3) {
  //       return {
  //         ...prevData,
  //         message: data,
  //       };
  //     }
  //     return prevData;
  //   });
  // };

  const handleDataChange = (key: "group" | "message", data: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: data,
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };
  console.log("formData", formData);

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.TABLE:
        return <TableMenssagens />;
      case STEPS.GROUP:
        return (
          <SelectGroup
            currentStep={currentStep}
            onDataChange={(data) => handleDataChange("group", data)}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
          />
        );
      case STEPS.MESSAGE:
        return (
          <SelectMessage
            currentStep={currentStep}
            onDataChange={(data) => handleDataChange("message", data)}
            setCurrentStep={setCurrentStep}
            setFormData={setFormData}
          />
        );
      case STEPS.FINAL:
        return (
          <FinalStep
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            selectedGroups={formData.groups}
            selectedMessage={formData.message}
            onSubmit={(schedule) => {
              console.log("Agendamento confirmado:", { ...formData, schedule });
              // Aqui você pode fazer chamada API, salvar dados, etc.
              alert("Agendamento confirmado com sucesso!");
              setCurrentStep(STEPS.TABLE);
              setFormData(initialFormData);
            }}
          />
        );
    }
  };

  return (
    <>
      <Helmet title="Fluxos" />
      <section className="flex flex-col gap-4">
        <div className="rounded-md bg-card p-6">
          <header className="flex flex-row items-center pb-6 w-full  justify-end">
            {currentStep === STEPS.TABLE && (
              <Button
                onClick={handleNext}
                className="flex items-center bg-green-500 text-white"
              >
                Novo agendamento
              </Button>
            )}
          </header>

          {/* <FilterTableWhats /> */}
          <div className="rounded-md bg-card">{renderStep()}</div>
        </div>
      </section>
    </>
  );
}
