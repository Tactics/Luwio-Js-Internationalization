import { i18n } from "@lingui/core";
import React, { createContext, FC, PropsWithChildren, useMemo } from "react";
import { LuwioInternationalizationI } from "@/contracts";
import { LuwioInternationalization } from "@/domain";
import { InternationalizationLogger } from "@/logger";

// Load a default empty catalog.
i18n.load('empty', {});
i18n.activate('empty');

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
