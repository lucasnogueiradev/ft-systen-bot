import React, { useState } from "react";

interface VariableDropdownProps {
  onSelect: (variable: string) => void;
}

export const VariableDropdown: React.FC<VariableDropdownProps> = ({
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const variables = [
    { label: "Produto", value: "{{produto}}" },
    { label: "Preço", value: "{{preco}}" },
    { label: "Preço Original", value: "{{preco_original}}" },
    { label: "Parcelamento", value: "{{parcelamento}}" },
    { label: "Link Afiliado", value: "{{link_afiliado}}" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2 px-3 border border-blue-500 rounded-md bg-blue-400 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="mr-2 font-semibold">Add variável</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
          {variables.map((variable) => (
            <li key={variable.value}>
              <button
                onClick={() => {
                  onSelect(variable.value);
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                {variable.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
