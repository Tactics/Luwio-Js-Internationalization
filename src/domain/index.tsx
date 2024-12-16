import {
  InternationalizationConfigI,
  LuwioInternationalizationI,
} from "@/contracts";
import React, { PropsWithChildren } from "react";
import { I18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";

export class LuwioInternationalization implements LuwioInternationalizationI {
  private readonly _internationalization: I18n;
  private readonly _load: (language: string) => Promise<Record<string, string>>;

  constructor(config: InternationalizationConfigI) {
    this._internationalization = config.i18n;
    this._load = config.load;
    this.change(config.initialLanguage);
  }

  private load = async (language: string) => {
    return await this._load(language);
  };

  current() {
    return this._internationalization.locale;
  }

  change(language: string) {
    console.log(`Changing language to ${language}`);

    this.load(language)
      .then((messages) => {
        console.log(`Loaded messages for ${language}:`, messages);
        this._internationalization.load(language, messages);
        this._internationalization.activate(language);
      })
      .catch((error) => {
        console.error(`Failed to change language to ${language}:`, error);
      });
  }

  t(key: string) {
    return this._internationalization._(key);
  }

  tdate(value: Date, format?: Intl.DateTimeFormatOptions) {
    return this._internationalization.date(value, format);
  }

  tnumber(value: number, format?: Intl.DateTimeFormatOptions) {
    return this._internationalization.number(value, format);
  }

  getProvider({ children }: PropsWithChildren): React.JSX.Element {
    return (
      <I18nProvider i18n={this._internationalization}>{children}</I18nProvider>
    );
  }
}
