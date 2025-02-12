import {
  InternationalizationConfigI,
  LuwioInternationalizationI,
} from "@/contracts";
import React, { PropsWithChildren } from "react";
import { I18n, Messages } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { ILogger } from "js-logger";
import {
  compileMessage,
  CompiledMessage,
} from "@lingui/message-utils/compileMessage";

function toCompiledMessages(rawMessages: Record<string, string>): Messages {
  const compiledMessages: Messages = {};

  Object.keys(rawMessages).forEach((key) => {
    const message = rawMessages[key];
    compiledMessages[key] = compileMessage(message);
  });

  return compiledMessages;
}

export class LuwioInternationalization implements LuwioInternationalizationI {
  private readonly _internationalization: I18n;
  private readonly _load: (language: string) => Promise<Record<string, string>>;
  private readonly _logger: ILogger;

  constructor(config: InternationalizationConfigI, logger: ILogger) {
    this._logger = logger;
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
    this._logger.info(`Changing language to ${language}`);

    // Check if the language is already loaded
    if (this.current() === language) {
      this._logger.info(`Language is already ${language}`);
      return;
    }

    this.load(language)
      .then((messages) => {
        this._logger.info(`Changing language to ${language}`);
        this._logger.info(messages);

        // Todo: check if this give performance issues.
        const compiledMessages = toCompiledMessages(messages);
        this._internationalization.load(language, compiledMessages);
        this._internationalization.activate(language);
      })
      .catch((error) => {
        this._logger.error(`Failed to change language to ${language}`);
        this._logger.error(error);
      });
  }

  t(key: string, variables?: Record<string, unknown>) {
    return this._internationalization._(key, variables);
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
