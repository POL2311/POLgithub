'use client';

import React, { useMemo, createContext, useContext, ReactNode, FC } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { Toaster } from 'sonner';

// Umi imports
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine';
import { mplToolbox } from '@metaplex-foundation/mpl-toolbox';

// Create a new context to hold the Umi instance.
export const UmiContext = createContext(null as any);

// Create an inner component that will have access to the wallet.
const UmiProvider = ({ children }: { children: ReactNode }) => {
  const wallet = useWallet();
  const endpoint = clusterApiUrl(WalletAdapterNetwork.Devnet);

  // Create the Umi instance, now with access to the wallet.
  const umi = useMemo(
    () =>
      createUmi(endpoint)
        .use(walletAdapterIdentity(wallet))
        .use(mplToolbox())
        .use(mplCandyMachine()),
    [endpoint, wallet],
  );

  return <UmiContext.Provider value={{ umi }}>{children}</UmiContext.Provider>;
};

// Main provider that wraps the entire app
export const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>
          {/* The UmiProvider is now nested inside, giving children access to Umi */}
          <UmiProvider>
            {children}
            <Toaster richColors position="bottom-right" />
          </UmiProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

// Helper hook to easily access the Umi instance from any component.
export const useUmi = () => {
  const context = useContext(UmiContext);
  if (!context) {
    throw new Error('useUmi must be used within a UmiProvider');
  }
  return context.umi;
};