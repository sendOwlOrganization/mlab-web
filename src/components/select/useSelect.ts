import { SelectStateContext } from "@/components/select/SelectContext";
import { useContext } from "react";

export const useSelect = () => useContext(SelectStateContext);
