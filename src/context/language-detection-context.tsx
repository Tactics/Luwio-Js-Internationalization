import { createContext, FC, PropsWithChildren } from "react";
import { InternationalizationLogger } from "@/logger";

export interface LanguageDetectionContextType {
  detectedLanguage: string;
}

export const LanguageDetectionDefault = {
  detectedLanguage: "en",
};

export const LanguageDetectionContext =
  createContext<LanguageDetectionContextType>(LanguageDetectionDefault);

export interface LanguageDetectionProviderProps extends PropsWithChildren {
  detectLanguage: (fallback: string) => string;
  fallbackLanguage: string;
}

export const LanguageDetectionProvider: FC<LanguageDetectionProviderProps> = (
  props: LanguageDetectionProviderProps,
) => {
  const { children, fallbackLanguage, detectLanguage } = props;

  return (
    <LanguageDetectionContext.Provider
      value={{
        detectedLanguage: detectLanguage(fallbackLanguage),
      }}
    >
      {children}
    </LanguageDetectionContext.Provider>
  );
};

export const detectLanguageFromUrl = (fallback: string): string => {
  const url = new URL(window.location.href);
  const pathname = url.pathname;

  const code = pathname.split("/")[1];

  if (code.length !== 2) {
    InternationalizationLogger.warn(
      `Invalid length of language code detected from url: ${code}`,
    );
    InternationalizationLogger.info(
      `fallback detected language to ${fallback}`,
    );
    return fallback;
  }

  if (!/^[a-zA-Z]{2}$/.test(code)) {
    InternationalizationLogger.warn(
      `Invalid language code detected from url: ${code}`,
    );
    InternationalizationLogger.info(
      `fallback detected language to ${fallback}`,
    );
    return fallback;
  }

  if (code.toLowerCase() !== code) {
    InternationalizationLogger.warn(
      `Invalid language code containing uppercase values detected from url: ${code}`,
    );
    InternationalizationLogger.info(
      `fallback detected language to ${fallback}`,
    );
    return fallback;
  }

  return code;
};
