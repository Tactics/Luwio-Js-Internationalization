import Logger from "js-logger";

export const InternationalizationLogger = Logger.get("Internationalization");
InternationalizationLogger.setLevel(Logger.OFF);

export function enableInternationalizationLogger() {
  InternationalizationLogger.setLevel(Logger.TRACE);
}
