import { createContext, useMemo, useContext } from 'react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { jsx } from 'react/jsx-runtime';

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var _LuwioInternationalization = class _LuwioInternationalization {
  constructor(config) {
    this.load = /* @__PURE__ */ __name(async (language) => {
      return await this._load(language);
    }, "load");
    this._internationalization = config.i18n;
    this._load = config.load;
    this.change(config.initialLanguage);
  }
  current() {
    return this._internationalization.locale;
  }
  change(language) {
    console.log(`Changing language to ${language}`);
    this.load(language).then((messages) => {
      console.log(`Loaded messages for ${language}:`, messages);
      this._internationalization.load(language, messages);
      this._internationalization.activate(language);
    }).catch((error) => {
      console.error(`Failed to change language to ${language}:`, error);
    });
  }
  t(key) {
    return this._internationalization._(key);
  }
  tdate(value, format) {
    return this._internationalization.date(value, format);
  }
  tnumber(value, format) {
    return this._internationalization.number(value, format);
  }
  getProvider({ children }) {
    return /* @__PURE__ */ jsx(I18nProvider, { i18n: this._internationalization, children });
  }
};
__name(_LuwioInternationalization, "LuwioInternationalization");
var LuwioInternationalization = _LuwioInternationalization;
var InternationalizationContext = createContext(void 0);
var InternationalizationProvider = /* @__PURE__ */ __name((props) => {
  const { children, initialLanguage, loadMessages } = props;
  const Internationalization = useMemo(() => {
    return new LuwioInternationalization({
      i18n,
      load: loadMessages,
      initialLanguage
    });
  }, [loadMessages]);
  console.log(Internationalization);
  return /* @__PURE__ */ jsx(InternationalizationContext.Provider, { value: Internationalization, children: Internationalization.getProvider({ children }) });
}, "InternationalizationProvider");

// src/hooks/use-translate.ts
var useTranslate = /* @__PURE__ */ __name(() => {
  const context = useContext(InternationalizationContext);
  if (!context) {
    throw new Error(
      "useTranslate must be used within a InternationalizationProvider"
    );
  }
  return context.t;
}, "useTranslate");
var useLanguage = /* @__PURE__ */ __name(() => {
  const context = useContext(InternationalizationContext);
  if (!context) {
    throw new Error(
      "useTranslate must be used within a InternationalizationProvider"
    );
  }
  return context.current();
}, "useLanguage");
var useInternationalization = /* @__PURE__ */ __name(() => {
  const context = useContext(InternationalizationContext);
  if (!context) {
    throw new Error(
      "useInternationalization must be used within a InternationalizationProvider"
    );
  }
  return context;
}, "useInternationalization");

export { InternationalizationProvider, LuwioInternationalization, useInternationalization, useLanguage, useTranslate };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map