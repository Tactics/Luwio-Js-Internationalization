import { useContext } from "react";
import { InternationalizationContext } from "@/context/internationalization-context";
import { LuwioInternationalizationI } from "@/contracts";

export const useInternationalization = (): LuwioInternationalizationI => {
  const context = useContext(InternationalizationContext);
  if (!context) {
    throw new Error(
      "useInternationalization must be used within a InternationalizationProvider",
    );
  }
  return context;
};
