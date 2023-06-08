import { SelectStateContext } from "@/mds/select/SelectContext";
import { useContext } from "react";

export const useSelect = () => useContext(SelectStateContext);
