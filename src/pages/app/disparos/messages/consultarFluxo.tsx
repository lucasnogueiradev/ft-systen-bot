import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Helmet } from "react-helmet-async";
import { FluxosWhatsApp } from "./whastApp";
// import { FormData } from "../../../../types/index";
// import { toast } from "sonner";

import { TableMenssagens } from "./table-messages";

export function MessagesWhatsApp() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TableMenssagens />;
      case 2:
        return <FluxosWhatsApp />;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet title="Fluxos" />
      <section className="flex flex-col gap-4">
        <div className="rounded-md bg-card p-6">
          <header className="flex flex-row items-center pb-6 w-full  justify-end">
            {currentStep === 1 && (
              <>
                <Button
                  onClick={handleNext}
                  className="flex items-center bg-green-500 text-white"
                >
                  Criar modelo
                </Button>
              </>
            )}
          </header>

          {/* <FilterTableWhats /> */}
          <div className="rounded-md bg-card">{renderStep()}</div>
        </div>
      </section>
    </>
  );
}
