// Expose all the components to the outside world here.
// Only the components that are exposed here will be available to other applications.
export { useInternationalization } from "@/hooks/use-internationalization";

export { InternationalizationProvider } from "@/context/internationalization-context";
export { LuwioInternationalization } from "@/domain";

export type { InternationalizationProps } from "@/context/internationalization-context";

export type {
  LuwioInternationalizationI,
  InternationalizationConfigI,
} from "@/contracts";

export { LanguageDetectionProvider } from "@/context/language-detection-context";
export type { LanguageDetectionProviderProps } from "@/context/language-detection-context";
export { useLanguageDetection } from "@/hooks/use-language-detection";
export { detectLanguageFromUrl } from "@/context/language-detection-context";
