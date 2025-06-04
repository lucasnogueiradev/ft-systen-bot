// hooks/useTextFormatting.ts
import { useCallback } from "react";

interface UseTextFormattingProps {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  text: string;
  setText: (text: string) => void;
  variables: { [key: string]: string };
  setVariables: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  counter: number;
  setCounter: (counter: number) => void;
  selectedValues: string[];
  setSelectedValues: (values: any) => void;
  setValue?: (key: string, value: any) => void;
}

export const useTextFormatting = ({
  textareaRef,
  text,
  setText,
  variables,
  setVariables,
  counter,
  setCounter,
  selectedValues,
  setSelectedValues,
  setValue,
}: UseTextFormattingProps) => {
  const applyFormatting = useCallback(
    (wrapper: string) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const { selectionStart, selectionEnd, value } = textarea;
      const selectedText = value.substring(selectionStart, selectionEnd);
      const formattedText = `${wrapper}${selectedText}${wrapper}`;

      setText(
        value.slice(0, selectionStart) +
          formattedText +
          value.slice(selectionEnd)
      );

      setTimeout(() => {
        textarea.setSelectionRange(
          selectionStart,
          selectionEnd + 2 * wrapper.length
        );
        textarea.focus();
      }, 0);
    },
    [textareaRef, setText]
  );

  const addBoldFormatting = () => applyFormatting("*");
  const addItalicFormatting = () => applyFormatting("_");
  const addStrikethroughFormatting = () => applyFormatting("~");

  const addCodeFormatting = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd, value } = textarea;
    const selectedText = value.substring(selectionStart, selectionEnd);
    const formattedText = `\`\`\`${selectedText}\`\`\``;

    setText(
      value.slice(0, selectionStart) + formattedText + value.slice(selectionEnd)
    );

    setTimeout(() => {
      textarea.setSelectionRange(selectionStart, selectionEnd + 6);
      textarea.focus();
    }, 0);
  };

  const addEmoji = (emojiObject: { emoji: string }) => {
    const emoji = emojiObject?.emoji || "";
    if (emoji) {
      setText(text + emoji);
    }
  };

  const addVariable = () => {
    const variableName = `${counter}`;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd, value } = textarea;
    const formattedText = `{{${variableName}}}`;

    setText(
      value.slice(0, selectionStart) + formattedText + value.slice(selectionEnd)
    );

    setVariables({
      ...variables,
      [variableName]: "",
    });

    setCounter(counter + 1);

    setTimeout(() => {
      textarea.setSelectionRange(
        selectionStart,
        selectionStart + formattedText.length
      );
      textarea.focus();
    }, 0);
  };

  const handleInputChange = (variableName: string, value: string) => {
    setVariables((prev: { [key: string]: string }) => ({
      ...prev,
      [variableName]: value,
    }));
  };

  const handleTextChange = (newText: string) => {
    if (newText === text) return;

    setText(newText);

    const variableRegex = /{{(\d+)}}/g;
    const matches = [...newText.matchAll(variableRegex)];
    const variablesInText = matches.map((match) => match[1]);

    setVariables((prev) =>
      variablesInText.reduce((acc, variable) => {
        acc[variable] = prev[variable] || "";
        return acc;
      }, {} as { [key: string]: string })
    );

    setCounter(
      variablesInText.length > 0
        ? Math.max(...variablesInText.map(Number)) + 1
        : 1
    );

    if (setValue) {
      setValue("content.text", newText);
    }
  };

  const handleSelectChanges = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues((prev: any[]) => prev.filter((item) => item !== value));
    } else {
      setSelectedValues((prev: any) => [...prev, value]);
    }
  };

  const handleRemoveSelected = (value: string) => {
    setSelectedValues((prev: any[]) => prev.filter((val) => val !== value));
  };

  return {
    addBoldFormatting,
    addItalicFormatting,
    addCodeFormatting,
    addStrikethroughFormatting,
    addEmoji,
    addVariable,
    handleInputChange,
    handleTextChange,
    handleSelectChanges,
    handleRemoveSelected,
  };
};
