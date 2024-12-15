// Expose all the components to the outside world here.
// Only the components that are exposed here will be available to other applications.

export { useTranslate } from "@/hooks/use-translate";
export { useLanguage } from "@/hooks/use-language";
export { useInternationalization } from "@/hooks/use-internationalization";

export { InternationalizationProvider } from "@/context/internationalization-context";
export { LuwioInternationalization } from "@/domain";

export type { InternationalizationProps } from "@/context/internationalization-context";

export type {
  LuwioInternationalizationI,
  InternationalizationConfigI,
} from "@/contracts";
