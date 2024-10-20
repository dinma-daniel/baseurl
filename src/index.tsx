import "./index.css";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AdminProvider } from "./context/adminContext";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { DarkModeProvider } from "./context/darkModeContext";
import { FirestoreProvider } from "./context/firestoreContext";
import { HeaderProvider } from "./context/headerContext";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from "./config/wagmi";

interface ProvidersWrapperProps {
  children: ReactNode;
}

function ProvidersWrapper({ children }: ProvidersWrapperProps) {
  return (
    <FirestoreProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </FirestoreProvider>
  );
}

const rootElement = document.getElementById("root");
const queryClient = new QueryClient();

// Ensure rootElement is not null
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <DarkModeProvider>
            <ProvidersWrapper>
              <HeaderProvider>
                <AdminProvider>
                  <Router>
                    <Routes>
                      <Route path="/*" element={<App />} />
                    </Routes>
                  </Router>
                </AdminProvider>
              </HeaderProvider>
            </ProvidersWrapper>
          </DarkModeProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
