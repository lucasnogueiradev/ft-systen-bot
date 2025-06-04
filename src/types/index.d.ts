export interface Category {
  type: string;
  category: string;
}

export interface CreateFluxoProps {
  onDataChange: (data: any) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}
export interface CreateMessageProps {
  onCancelar?: () => void;
  onDataChange?: (data: any) => void;
  setFormData?: React.Dispatch<React.SetStateAction<FormDataMessage>>;
  currentStep?: number;
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
}

export interface FormDataMessage {
  name: string;
  content: string;
}

export interface Model {
  name: string;
  language: string;
  content: {
    header?: string;
    text: string;
    baseboard?: string;
  };
  buttons: {
    quick: {
      cancel?: {
        type: string;
        textButton: string;
        textBaseboard?: string;
      };
      custom?: {
        type: string;
        textButton: string;
      };
    };
    action: {
      access?: {
        type: string;
        textButton: string;
        typeUrl: string;
        urlSite: string;
      };
      call?: {
        type: string;
        textButton: string;
        code: string;
        phone: string;
      };
      copy?: {
        type: string;
        textButton: string;
        codeOffer: string;
      };
    };
  };
}

export interface FormData {
  fluxo: {
    name: string;
  };
}
