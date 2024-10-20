import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";

// Define the shape of the context value
interface DarkModeContextValue {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define the props for the DarkModeProvider
interface DarkModeProviderProps {
  children: ReactNode;
}

const DarkModeContext = createContext<DarkModeContextValue | undefined>(undefined);

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

export function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [dark, setDark] = useState<boolean>(
    JSON.parse(localStorage.getItem("dark") ?? "true"),
  );

  useEffect(() => {
    if (dark) {
      window.document.documentElement.classList.add("dark");
    } else {
      window.document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const value = { dark, setDark };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}

DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
