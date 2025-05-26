import { Helmet } from "react-helmet-async";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useState } from "react";
import { CreateFluxo } from "../bot/create-fluxo";
import { CreateProfile } from "./create-profile";
import { FcShop } from "react-icons/fc";

export interface ProfileData {
  fluxo: {
    name: string;
  };
}

export const Profiles = () => {
  const [currentStep, setCurrentStep] = useState(1);

  console.log("currentStep", currentStep);

  const [formData, setFormData] = useState<ProfileData>({
    fluxo: {
      name: "",
    },
  });

  const handleDataChange = (step: number, data: any) => {
    setFormData((prevData: ProfileData) => {
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
        return (
          <>
            <div className="">
              <Card className="border-0 border-green-500 bg-blue-400/10 md:w-[400px]">
                <CardHeader className="flex-row justify-between">
                  <CardTitle className="text-base font-semibold text-muted-foreground bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center">
                    <p className="text-slate-800 text-2xl">M</p>
                  </CardTitle>

                  <p className="text-blue-500 cursor-pointer">
                    {" "}
                    {currentStep === 1 && (
                      <Button
                        onClick={handleNext}
                        className="flex items-center text-blue-500 bg-transparent font-bold text-1xl"
                      >
                        Editar
                      </Button>
                    )}
                  </p>
                </CardHeader>
                <CardContent className="space-y-1 pt-6">
                  <span className="text-1xl font-semibold tracking-tight text-">
                    <Label className="pb-3 flex text-muted-foreground">
                      Nome do perfil
                    </Label>
                    MagaluLucas
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Nome que será usado no seu site
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        );
      case 2:
        return (
          <CreateProfile
            onDataChange={(data) => handleDataChange(3, data)}
            setFormData={setFormData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        );
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(currentStep + 1);
      return;
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <Helmet title="Meus Perfis" />

      <h1 className="text-2xl font-500 tracking-tight text-foreground font-semibold flex-row items-center gap-2 flex">
        <span>Meus Perfis</span>
        <FcShop />
      </h1>

      <div className="rounded-md bg-card p-6 overflow-y-auto h-screen">
        {renderStep()}
      </div>
    </section>
  );
};
