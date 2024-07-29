import { createContext, useCallback, useState } from "react";
import { localStorageKeys } from "../../../../../app/config/localStorageKeys";

interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(() => {
    const storedValueVisibility = localStorage.getItem(
      localStorageKeys.VALUES_VISIBILITY
    );

    return !!storedValueVisibility;
  });

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => {
      localStorage.setItem(
        localStorageKeys.VALUES_VISIBILITY,
        String(!prevState)
      );
      return !prevState;
    });
  }, []);

  return (
    <DashboardContext.Provider
      value={{ areValuesVisible, toggleValuesVisibility }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
