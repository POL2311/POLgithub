import { NextResponse } from "next/server";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { isMetadata } from '@metaplex-foundation/js';

// ← Usa tu clave secreta REAL exportada
const secretKey = Uint8Array.from([
  183,1,113,88,13,78,216,165,140,26,61,229,224,92,116,113,196,140,64,10,223,192,127,104,237,185,97,161,13,236,236,133,117,90,141,204,128,238,190,135,6,184,94,58,58,131,34,207,51,171,177,133,240,52,197,21,66,32,137,112,114,71,88,49
]);

const keypair = Keypair.fromSecretKey(secretKey);
const connection = new Connection(clusterApiUrl("devnet"));

export async function GET() {
  try {
    const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair));
    const rawNfts = await metaplex.nfts().findAllByOwner({ owner: keypair.publicKey });

const nfts = await Promise.all(
  rawNfts.map(async (nft) => {
    try {
      if (nft.model !== 'metadata') return null;

      const full = await metaplex.nfts().load({ metadata: nft }); // ✅ key fix

      return {
        id: full.address.toBase58(),
        name: full.name,
        imageUrl: full.json?.image ?? '',
        price: 0,
        rarity: 'Common' as const,
        collectionName: full.collection?.address.toBase58() ?? 'Unverified',
      };
    } catch (e) {
      console.warn(`Error loading full metadata for ${nft.address.toBase58()}:`, e);
      return null;
    }
  })
);




    return NextResponse.json(nfts.filter(Boolean));
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
