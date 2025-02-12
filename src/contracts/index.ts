import { JSX, PropsWithChildren } from "react";
import { I18n } from "@lingui/core";

export interface LuwioInternationalizationI {
  getProvider({ children }: PropsWithChildren): JSX.Element;
  change(language: string, messages: Record<string, string>): void;
  t(key: string, variables?: Record<string, unknown>): string;
  tdate(value: Date, format?: Intl.DateTimeFormatOptions): string;
  tnumber(value: number, format?: Intl.NumberFormatOptions): string;
  current(): string;
}

export interface InternationalizationConfigI {
  i18n: I18n;
  load: (language: string) => Promise<Record<string, string>>;
  initialLanguage: string;
}
