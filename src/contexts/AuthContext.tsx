// AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  planId: string;
  setPlanId: (id: string) => void;
  user: {
    _id: string;
    email: string;
    username?: string;
    name: string;
    telefone: string;
    plano: string;
    lojas: [
      {
        _id: string;
        nome: string;
        nomePersonalizado: string;
        plataforma: string;
        logo: string;
        status: string;
        nameAffiliate: string;
      }
    ];
  } | null;
  updateLojas: (lojasAtualizadas: any) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setProductsContext: React.Dispatch<React.SetStateAction<IProducts[] | null>>;
  productsContext: IProducts[] | null;
};

interface User {
  _id: string;
  email: string;
  name: string;
  telefone: string;
  plano: string;
  lojas: [
    {
      _id: string;
      nome: string;
      nomePersonalizado: string;
      plataforma: string;
      logo: string;
      status: string;
      nameAffiliate: string;
    }
  ];
}

interface IProducts {
  image: string;
  name: string;
  originalPrice: string;
  price: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [planId, setPlanIdState] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [productsContext, setProductsContext] = useState<IProducts[] | null>(
    null
  );
  console.log("🎯 productsContext no componente:", productsContext);

  // const [user, setUser] = useState<User | null>(null);
  // Carrega planId do localStorage quando a app iniciar
  useEffect(() => {
    const savedPlanId = localStorage.getItem("planId");
    const savedUser = localStorage.getItem("usuario");
    // const productsSite = localStorage.getItem("product");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
    if (savedPlanId) {
      setPlanIdState(savedPlanId);
    }
    // if (productsSite) {
    //   setProductsContext(JSON.parse(productsSite));
    // }
  }, []);

  // Sempre que o planId mudar, salva no localStorage
  const setPlanId = (id: string) => {
    localStorage.setItem("planId", id);
    setPlanIdState(id);
  };

  const updateLojas = (lojasAtualizadas: any) => {
    setUser((prev: any) => ({ ...prev, lojas: lojasAtualizadas }));
  };

  return (
    <AuthContext.Provider
      value={{
        planId,
        setPlanId,
        user,
        updateLojas,
        setUser,
        setProductsContext,
        productsContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
