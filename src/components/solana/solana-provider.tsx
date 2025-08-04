'use client'

import { createContext, useContext, useMemo } from 'react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
// Import useWallet here
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import { Toaster } from 'react-hot-toast'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine'
import { mplToolbox } from '@metaplex-foundation/mpl-toolbox'

// Create a context to hold the Umi instance.
export const UmiContext = createContext(null as any)

// Create a new inner component that will have access to the wallet.
const UmiProvider = ({ children }: { children: React.ReactNode }) => {
  const wallet = useWallet() // Now we can use the useWallet hook
  const endpoint = clusterApiUrl(WalletAdapterNetwork.Devnet)

  // Create the Umi instance, now with access to the wallet.
  const umi = useMemo(
    () =>
      createUmi(endpoint)
        // FIX: Pass the wallet to the identity function
        .use(walletAdapterIdentity(wallet))
        .use(mplToolbox())
        .use(mplCandyMachine()),
    [endpoint, wallet], // Add wallet to the dependency array
  )

  return <UmiContext.Provider value={{ umi }}>{children}</UmiContext.Provider>
}

// The main provider component that wraps everything
export function SolanaProvider({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const wallets = useMemo(() => [], [network])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* The UmiProvider is now correctly nested inside the WalletProvider */}
          <UmiProvider>
            {children}
            <Toaster position="bottom-right" />
          </UmiProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

// This helper hook remains the same.
export const useUmi = () => {
  const context = useContext(UmiContext)
  if (!context) {
    throw new Error('useUmi must be used within a UmiProvider')
  }
  return context.umi
}