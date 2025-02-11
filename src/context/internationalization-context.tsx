import { I18n } from "@lingui/core";
import React, { createContext, FC, PropsWithChildren, useMemo } from "react";
import { LuwioInternationalizationI } from "@/contracts";
import { LuwioInternationalization } from "@/domain";
import { InternationalizationLogger } from "@/logger";

// Context to provide the internationalization object
export const InternationalizationContext = createContext<
  LuwioInternationalizationI | undefined
>(undefined);

export interface InternationalizationProps extends PropsWithChildren {
  initialLanguage: string;
  loadMessages: (language: string) => Promise<Record<string, string>>;
}

export const InternationalizationProvider: FC<InternationalizationProps> = (
  props: InternationalizationProps,
) => {
  const { children, initialLanguage, loadMessages } = props;

  const i18n = new I18n({
    missing: (locale, key) => {
      return `MISSING TRANSLATION: ${key} in ${locale}`;
    },
  });

  // Create Internationalization instance
  const Internationalization = new LuwioInternationalization(
    {
      i18n: i18n,
      load: loadMessages,
      initialLanguage: initialLanguage,
    },
    InternationalizationLogger,
  );

  // Provide the context and the children
  return (
    <InternationalizationContext.Provider value={Internationalization}>
      {Internationalization.getProvider({ children })}
    </InternationalizationContext.Provider>
  );
};
