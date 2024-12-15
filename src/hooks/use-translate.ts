import { useContext } from "react";
import { InternationalizationContext } from "@/context/internationalization-context";

export const useTranslate = (): ((key: string) => string) => {
  const context = useContext(InternationalizationContext);
  if (!context) {
    throw new Error(
      "useTranslate must be used within a InternationalizationProvider",
    );
  }
  return context.t;
};
