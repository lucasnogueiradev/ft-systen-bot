import logo from "../../assets/logo-divulgadorpro.png";

interface AppLoaderProps {
  fullscreen?: boolean;
  size?: number;
}

export const AppLoader = ({
  fullscreen = true,
  size = 140,
}: AppLoaderProps) => {
  const containerClass = fullscreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-20 dark:bg-background dark:bg-opacity-20"
    : "flex flex-col items-center justify-center";

  return (
    <div
      className={containerClass}
      style={{
        backgroundColor: fullscreen
          ? "rgba(0, 0, 0, 0.4)" // modo claro
          : "rgba(var(--background-rgb), 0.2)", // modo escuro (exemplo)
      }}
    >
      {/* Logo com efeito bounce */}
      <img
        src={logo}
        alt="Logo carregando"
        style={{ width: size, height: "auto" }}
        className="mb-4 animate-logo-bounce"
      />

      {/* Bolinhas de carregamento */}
      <div className="flex space-x-1 ml-4">
        <span className="w-3 h-3 bg-primary rounded-full animate-bounce-delay-1" />
        <span className="w-3 h-3 bg-primary rounded-full animate-bounce-delay-2" />
        <span className="w-3 h-3 bg-primary rounded-full animate-bounce-delay-3" />
      </div>
    </div>
  );
};
