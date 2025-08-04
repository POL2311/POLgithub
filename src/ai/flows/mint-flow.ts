
'use server';
/**
 * @fileOverview A server-side flow for handling the NFT minting process.
 * - mintNFT - A function that handles the NFT mint.
 * - MintInput - The input type for the mintNFT function.
 * - MintOutput - The return type for the mintNFT function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import {
  Connection,
  clusterApiUrl,
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Metaplex, keypairIdentity, irysStorage } from "@metaplex-foundation/js";
import bs58 from 'bs58';

const MintInputSchema = z.object({
  quantity: z.number().min(1).describe('The number of NFTs to mint.'),
  userPublicKey: z.string().describe("The user's Solana public key."),
});
export type MintInput = z.infer<typeof MintInputSchema>;

const MintOutputSchema = z.object({
  success: z.boolean().describe('Whether the mint was successful.'),
  message: z.string().describe('A message describing the result.'),
  transactionId: z.string().optional().describe('The Solana transaction ID.'),
});
export type MintOutput = z.infer<typeof MintOutputSchema>;

// Helper to get the server's wallet from environment variables.
// Supports both a JSON array of numbers and a Base58 encoded string.
function getServerWallet(): Keypair | null {
  const privateKeyStr = process.env.SERVER_WALLET_PRIVATE_KEY;
  if (!privateKeyStr || privateKeyStr.trim() === "" || privateKeyStr.startsWith("[...")) {
    console.error(
      "SERVER_WALLET_PRIVATE_KEY is not set in the .env file. Please generate a new keypair and add it."
    );
    return null;
  }
  try {
    let privateKey: Uint8Array;
    // Check if it's a JSON array string
    if (privateKeyStr.startsWith('[') && privateKeyStr.endsWith(']')) {
      privateKey = Uint8Array.from(JSON.parse(privateKeyStr));
    } else {
      // Assume it's a base58 encoded string
      privateKey = bs58.decode(privateKeyStr);
    }
    
    if (privateKey.length !== 64) {
      console.error(`Invalid private key length: ${privateKey.length}. It must be 64 bytes.`);
      return null;
    }

    return Keypair.fromSecretKey(privateKey);
  } catch (e: any) {
    console.error('Failed to parse SERVER_WALLET_PRIVATE_KEY. Make sure it is a valid JSON array or a Base58 encoded string.', e.message);
    return null;
  }
}

const mintNFTFlow = ai.defineFlow(
  {
    name: 'mintNFTFlow',
    inputSchema: MintInputSchema,
    outputSchema: MintOutputSchema,
  },
  async (input) => {
    // For now, we will mint only 1 NFT, ignoring the quantity.
    // We can add batch minting in the next step.
    console.log(`Minting flow started for ${input.userPublicKey}`);

    const serverWallet = getServerWallet();
    if (!serverWallet) {
      return {
        success: false,
        message: "Server wallet is not configured. Please set the SERVER_WALLET_PRIVATE_KEY in your .env file.",
      };
    }

    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      
      // Airdrop some SOL to the server wallet if it's low on funds, for devnet only.
      const balance = await connection.getBalance(serverWallet.publicKey);
      if (balance < LAMPORTS_PER_SOL * 0.1) {
        console.log("Server wallet has low balance, airdropping 1 SOL...");
        const airdropSignature = await connection.requestAirdrop(
          serverWallet.publicKey,
          LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(airdropSignature, 'confirmed');
        console.log("Airdrop confirmed.");
      }

      const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(serverWallet))
        .use(irysStorage({
            address: 'https://devnet.bundlr.network',
            providerUrl: 'https://api.devnet.solana.com',
            timeout: 60000,
        }));
        
      console.log('Uploading metadata...');
      // V-- EDIT YOUR NFT METADATA HERE --V
      const { uri } = await metaplex.nfts().uploadMetadata({
        name: 'Plrs Star', // <-- Your NFT Name
        description: 'A unique punk from the far reaches of the galaxy.', // <-- Your Description
        // IMPORTANT: You need a permanent public URL for your image.
        // Upload your image to a service like Imgur, or a decentralized one like Arweave/IPFS.
        image: 'https://placehold.co/300x300.png', // <-- Your Image URL
        attributes: [ // <-- Your Custom Traits
          { trait_type: 'Background', value: 'Africa' },
          { trait_type: 'Species', value: 'Zorg' },
          { trait_type: 'Accessory', value: 'Laser Goggles' },
        ],
      });
      // ^-- EDIT YOUR NFT METADATA HERE --^
      console.log('Metadata uploaded at:', uri);

      console.log('Creating NFT...');
      const { nft, response } = await metaplex.nfts().create({
        uri: uri,
        name: 'Galactic Punk', // <-- Match the name from metadata
        sellerFeeBasisPoints: 500, // 5%
        tokenOwner: new PublicKey(input.userPublicKey), // The user who is minting gets the NFT
      }, { commitment: 'finalized' });
      console.log('NFT created successfully.');

      return {
        success: true,
        message: 'Successfully minted your new NFT!',
        transactionId: response.signature,
      };

    } catch (error: any) {
      console.error('Minting failed:', error);
      return {
        success: false,
        message: error.message || 'An unknown error occurred during minting.',
      };
    }
  }
);

// Export an async function that calls the GenKit flow
export async function mintNFT(input: MintInput): Promise<MintOutput> {
  return mintNFTFlow(input);
}
