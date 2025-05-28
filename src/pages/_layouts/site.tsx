// Layoutsite.jsx
import { Outlet } from "react-router-dom";

export const Layoutsite = () => {
  return (
    <div className="min-h-screen w-full bg-zinc-50 flex flex-col items-center">
      {/* Você pode personalizar esse cabeçalho depois, ou deixá-lo genérico */}
      <div className="w-full max-w-7xl">
        <Outlet />
      </div>
    </div>
  );
};
