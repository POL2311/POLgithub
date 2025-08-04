// src/lib/devWallet.ts
import { Keypair } from "@solana/web3.js";
import {
  BaseMessageSignerWalletAdapter,
  WalletName,
  WalletReadyState,
} from "@solana/wallet-adapter-base";

export class DevWalletAdapter extends BaseMessageSignerWalletAdapter {
  readonly name = "DevWallet" as WalletName;
  readonly url = "https://example.com";
  readonly icon = "https://placehold.co/32x32";
  readonly readyState = WalletReadyState.Installed;
  readonly supportedTransactionVersions = null;

  readonly publicKey = Keypair.generate().publicKey;
  readonly connecting = false;

  async connect(): Promise<void> {}
  async disconnect(): Promise<void> {}

  async signMessage(): Promise<Uint8Array> {
    return new Uint8Array();
  }

  async signTransaction(tx: any): Promise<any> {
    return tx;
  }

  async signAllTransactions(txs: any[]): Promise<any[]> {
    return txs;
  }

on<T extends string>(event: T, listener: (...args: any[]) => unknown): this {
  // No hacemos nada porque es dummy
  return this;
}

off<T extends string>(event: T, listener: (...args: any[]) => unknown): this {
  // Igual, sin lógica
  return this;
}

}
