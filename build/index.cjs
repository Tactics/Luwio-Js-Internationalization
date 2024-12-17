'use strict';

var react = require('react');
var core = require('@lingui/core');
var react$1 = require('@lingui/react');
var jsxRuntime = require('react/jsx-runtime');
var Logger = require('js-logger');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Logger__default = /*#__PURE__*/_interopDefault(Logger);

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var _LuwioInternationalization = class _LuwioInternationalization {
  constructor(config, logger) {
    this.load = /* @__PURE__ */ __name(async (language) => {
      return await this._load(language);
    }, "load");
    this._internationalization = config.i18n;
    this._load = config.load;
    this.change(config.initialLanguage);
    this._logger = logger;
  }
  current() {
    return this._internationalization.locale;
  }
  change(language) {
    this._logger.info(`Changing language to ${language}`);
    this.load(language).then((messages) => {
      this._logger.info(`Changing language to ${language}`);
      this._logger.info(messages);
      this._internationalization.load(language, messages);
      this._internationalization.activate(language);
    }).catch((error) => {
      this._logger.error(`Failed to change language to ${language}`);
      this._logger.error(error);
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
    return /* @__PURE__ */ jsxRuntime.jsx(react$1.I18nProvider, { i18n: this._internationalization, children });
  }
};
__name(_LuwioInternationalization, "LuwioInternationalization");
var LuwioInternationalization = _LuwioInternationalization;
var InternationalizationLogger = Logger__default.default.get("Internationalization");
InternationalizationLogger.setLevel(Logger__default.default.OFF);
function enableInternationalizationLogger() {
  InternationalizationLogger.setLevel(Logger__default.default.TRACE);
}
__name(enableInternationalizationLogger, "enableInternationalizationLogger");
var InternationalizationContext = react.createContext(void 0);
var InternationalizationProvider = /* @__PURE__ */ __name((props) => {
  const { children, initialLanguage, loadMessages } = props;
  const Internationalization = new LuwioInternationalization(
    {
      i18n: core.i18n,
      load: loadMessages,
      initialLanguage
    },
    InternationalizationLogger
  );
  return /* @__PURE__ */ jsxRuntime.jsx(InternationalizationContext.Provider, { value: Internationalization, children: Internationalization.getProvider({ children }) });
}, "InternationalizationProvider");

// src/hooks/use-internationalization.ts
var useInternationalization = /* @__PURE__ */ __name(() => {
  const context = react.useContext(InternationalizationContext);
  if (!context) {
    throw new Error(
      "useInternationalization must be used within a InternationalizationProvider"
    );
  }
  return context;
}, "useInternationalization");
var LanguageDetectionDefault = {
  detectedLanguage: "en"
};
var LanguageDetectionContext = react.createContext(LanguageDetectionDefault);
var LanguageDetectionProvider = /* @__PURE__ */ __name((props) => {
  const { children, fallbackLanguage, detectLanguage } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    LanguageDetectionContext.Provider,
    {
      value: {
        detectedLanguage: detectLanguage(fallbackLanguage)
      },
      children
    }
  );
}, "LanguageDetectionProvider");
var detectLanguageFromUrl = /* @__PURE__ */ __name((fallback) => {
  const url = new URL(window.location.href);
  const pathname = url.pathname;
  const code = pathname.split("/")[1];
  if (code.length !== 2) {
    InternationalizationLogger.warn(
      `Invalid length of language code detected from url: ${code}`
    );
    InternationalizationLogger.info(
      `fallback detected language to ${fallback}`
    );
    return fallback;
  }
  if (!/^[a-zA-Z]{2}$/.test(code)) {
    InternationalizationLogger.warn(
      `Invalid language code detected from url: ${code}`
    );
    InternationalizationLogger.info(
      `fallback detected language to ${fallback}`
    );
    return fallback;
  }
  if (code.toLowerCase() !== code) {
    InternationalizationLogger.warn(
      `Invalid language code containing uppercase values detected from url: ${code}`
    );
    InternationalizationLogger.info(
      `fallback detected language to ${fallback}`
    );
    return fallback;
  }
  return code;
}, "detectLanguageFromUrl");
var useLanguageDetection = /* @__PURE__ */ __name(() => {
  const context = react.useContext(LanguageDetectionContext);
  return context.detectedLanguage;
}, "useLanguageDetection");

exports.InternationalizationProvider = InternationalizationProvider;
exports.LanguageDetectionProvider = LanguageDetectionProvider;
exports.LuwioInternationalization = LuwioInternationalization;
exports.detectLanguageFromUrl = detectLanguageFromUrl;
exports.enableInternationalizationLogger = enableInternationalizationLogger;
exports.useInternationalization = useInternationalization;
exports.useLanguageDetection = useLanguageDetection;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map