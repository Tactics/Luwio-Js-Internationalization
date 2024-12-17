import Logger from "js-logger";

Logger.useDefaults({
  defaultLevel: Logger.TRACE,
  formatter: function (messages, context) {
    // prefix each log message with a timestamp and the module name.
    messages.unshift(new Date().toUTCString());
    messages.unshift("Internationalization");
  },
});

export const InternationalizationLogger = Logger.get("Internationalization");
InternationalizationLogger.setLevel(Logger.OFF);

export function enableInternationalizationLogger() {
  InternationalizationLogger.setLevel(Logger.TRACE);
}
