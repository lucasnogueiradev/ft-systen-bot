import { Helmet } from "react-helmet-async";
import { Button } from "../../../components/ui/button";
import { BreadcrumbBot } from "../../../components/breadcrumb/breadcrumb";
import { useState } from "react";
import { TableBot } from "./table-fluxo";
import { CreateFluxo } from "./create-fluxo";
import { EditFluxo } from "./edit-fluxo";
import { FormData } from "../../../types/index";

export function ConsultarBot() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    fluxo: {
      name: "",
    },
  });

  console.log("formData", formData);
  const handleDataChange = (step: number, data: any) => {
    setFormData((prevData: FormData) => {
      if (step === 2) {
        return {
          ...prevData,
          fluxo: data,
        };
      }
      if (step === 3) {
        return {
          ...prevData,
          model: data,
        };
      }
      return prevData;
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TableBot />;
      case 2:
        return (
          <CreateFluxo
            onDataChange={(data) => handleDataChange(3, data)}
            setFormData={setFormData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        );
      case 3:
        return <EditFluxo />;
      default:
        return null;
    }
  };
  const handleNext = () => {
    if (currentStep === 2) {
      // toast("Preencha a categoria antes de avançar.");
      return;
    }
    if (currentStep === 3) {
      // alert("Ainda falta dados obrigatorios a ser preenchidos.");
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
    }
  };
  return (
    <>
      <Helmet title="Fluxos" />
      <section className="flex flex-col gap-4">
        <div>
          {" "}
          <BreadcrumbBot></BreadcrumbBot>
        </div>
        <div className="rounded-md bg-card p-6">
          <header className="flex flex-row items-center justify-between">
            {currentStep === 1 && (
              <Button
                onClick={handleNext}
                className="flex items-center justify-end text-white bg-green-600 my-4"
              >
                Criar bot
              </Button>
            )}
          </header>

          <div className="rounded-md bg-card bg-black">{renderStep()}</div>
        </div>
      </section>
    </>
  );
}
