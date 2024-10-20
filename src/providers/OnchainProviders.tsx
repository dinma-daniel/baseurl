"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import React from "react";
import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { baseSepolia } from "viem/chains";
import { wagmiConfig } from "../config/wagmi";

type Props = { children: ReactNode };

const queryClient = new QueryClient();

function OnchainProviders({ children }: Props) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.PUBLIC_ONCHAINKIT_API_KEY}
          chain={baseSepolia}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;
