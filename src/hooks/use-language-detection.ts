import { useContext } from "react";
import { LanguageDetectionContext } from "@/context/language-detection-context";

export const useLanguageDetection = (): string => {
  const context = useContext(LanguageDetectionContext);
  return context.detectedLanguage;
};
