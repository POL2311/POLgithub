
"use client";

import './market.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { NFTCard } from "@/components/NFTCard";
import { Metadata } from "@metaplex-foundation/js";

import {
  LayoutGrid,
  List,
  Filter as FilterIcon,
  Search as SearchIcon,
  RefreshCw,
  Rocket,
  Store,
  Wrench,
  Sparkles, 
  ShieldCheck,
  DollarSign,
  Info, 
  Coins 
} from "lucide-react";
import { TOKEN_SYMBOL } from '@/lib/constants';
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { clusterApiUrl, Connection } from '@solana/web3.js';

export interface NFT { 
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  rarity: "Legendary" | "Rare" | "Uncommon" | "Common";
  collectionName: string;
  dataAiHint?: string;
}

const mockNFTs: NFT[] = [
  { id: '1', name: 'Nova Prime Sector 7', imageUrl: '/images/asia1.png', price: 150000, rarity: 'Rare', collectionName: 'Polarys Lands', dataAiHint: 'futuristic landscape' },
  { id: '2', name: 'Ember Waste Plot 12', imageUrl: '/images/africa1.png', price: 75000, rarity: 'Common', collectionName: 'Polarys Lands', dataAiHint: 'desert outpost' },
  { id: '3', name: 'Crystal Spire Oceania', imageUrl: 'https://placehold.co/300x300.png', price: 250000, rarity: 'Legendary', collectionName: 'Polarys Lands', dataAiHint: 'crystal island' },
  { id: '4', name: 'Frozen Heart Antarctica', imageUrl: 'https://placehold.co/300x300.png', price: 90000, rarity: 'Uncommon', collectionName: 'Polarys Lands', dataAiHint: 'ice cave' },
  { id: '5', name: 'Verdant Valley Europe', imageUrl: 'https://placehold.co/300x300.png', price: 120000, rarity: 'Common', collectionName: 'Polarys Lands', dataAiHint: 'green valley' },
  { id: '6', name: 'Cyber City N.America', imageUrl: 'https://placehold.co/300x300.png', price: 180000, rarity: 'Rare', collectionName: 'Polarys Lands', dataAiHint: 'cyberpunk city' },
  { id: '7', name: 'Sunken Atlantis Sector', imageUrl: 'https://placehold.co/300x300.png', price: 300000, rarity: 'Legendary', collectionName: 'Polarys Lands', dataAiHint: 'underwater city' },
  { id: '8', name: 'Volcanic Forge S.America', imageUrl: 'https://placehold.co/300x300.png', price: 165000, rarity: 'Rare', collectionName: 'Polarys Lands', dataAiHint: 'volcanic mountains' },
];

export default function MarketplacePage() {
    const { publicKey, wallet, connected } = useWallet();
  const [nfts, setNfts] = useState<NFT[]>([]);
useEffect(() => {
  const loadNFTs = async () => {
    const res = await fetch("/api/nfts");
    const data = await res.json();
    setNfts(data);
  };

  loadNFTs();
}, []);

  return (
    <div className="marketresponsive w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 flex flex-col py-6 sm:py-8">
      {/* Collection Info Bar */}
      <Card className="mb-6 sm:mb-8 bg-card/70 backdrop-blur-sm border-border/50 shadow-xl">
        <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-2 border-primary shadow-lg">
            <AvatarImage src="/images/PolarysLogoshadow.png" alt="Polarys Collection" />
            <AvatarFallback>PL</AvatarFallback>
          </Avatar>
          <div className="flex-grow text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">Polarys Lands</CardTitle>
              <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
            </div>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
              Discover and trade unique land parcels from the Polarys universe.
            </CardDescription>
          </div>
        </CardContent>
        <Tabs defaultValue="items" className="w-full mt-4">
          <TabsList className="flex flex-col sm:flex-row w-full items-stretch sm:items-center bg-transparent sm:border-t sm:border-b sm:border-border/50">
            <TabsTrigger 
              value="items" 
              className="text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none py-2.5 sm:py-3 px-4 flex items-center justify-center sm:flex-1 border-b border-border/50 first:border-t first:border-border/50 sm:border-0"
            >
              <LayoutGrid className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Listed Items
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      {/* Toolbar */}
      <div className="mb-4 sm:mb-6 p-2 sm:p-3 bg-card/60 backdrop-blur-sm rounded-lg border border-border/40 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="outline" size="icon" className="border-border/60 h-8 w-8 sm:h-9 sm:w-9 bg-primary/10 text-primary">
              <LayoutGrid className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-8 w-8 sm:h-9 sm:w-9">
              <List className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button variant="outline" className="border-border/60 h-8 sm:h-9 text-xs px-2 sm:px-3">
              <FilterIcon className="mr-1 h-3.5 w-3.5" /> Filters
            </Button>
          </div>
          <div className="flex-grow w-full sm:w-auto sm:max-w-xs lg:max-w-sm">
            <div className="relative">
              <SearchIcon className="absolute left-2 sm:left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search Lands..." className="pl-8 sm:pl-10 h-8 sm:h-9 text-xs sm:text-sm bg-background/70 border-border/60 focus:border-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Select defaultValue="price_asc">
              <SelectTrigger className="w-auto sm:w-[180px] h-8 sm:h-9 text-xs border-border/60">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_asc" className="text-xs">Price: Low to High</SelectItem>
                <SelectItem value="price_desc" className="text-xs">Price: High to Low</SelectItem>
                <SelectItem value="recent" className="text-xs">Recently Listed</SelectItem>
                <SelectItem value="ending_soon" className="text-xs">Ending Soon</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="border-border/60 h-8 w-8 sm:h-9 sm:w-9">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* "Platform Coming Soon" Section */}
      <Card className="w-full bg-card/70 backdrop-blur-sm text-card-foreground shadow-2xl border border-border/50 mb-6 sm:mb-8 group"> {/* Added group */}
        <CardHeader className="text-center p-4 sm:p-6">
          <Rocket className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-primary mb-2 sm:mb-3 group-hover:animate-pulse" /> {/* Icon animation */}
          <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
            Marketplace Launching Soon!
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1 max-w-md sm:max-w-lg mx-auto">
            Our advanced trading platform is being fine-tuned. Get ready to explore a universe.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
          <div className="text-center">
            <p className="text-lg sm:text-xl font-semibold text-accent mb-1 sm:mb-1.5">Development Progress</p>
            <Progress value={85} aria-label="Marketplace construction progress" className="w-full max-w-xs sm:max-w-sm mx-auto h-1.5 sm:h-2 bg-green-500/30 [&>div]:bg-green-500" />
            <p className="text-xs text-muted-foreground mt-1">Almost there, commanders!</p>
          </div>

          <div className="mt-3 sm:mt-4 p-3 sm:p-4 border border-dashed border-border/70 rounded-lg bg-background/50">
            <h3 className="text-xl sm:text-2xl font-semibold text-accent mb-2 sm:mb-3 text-center flex items-center justify-center">
              <Sparkles className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />
              Anticipated Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 text-xs sm:text-sm text-muted-foreground text-left">
              <li className="flex items-start"><Store className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-primary shrink-0" />Buy & Sell Lands.</li>
              <li className="flex items-start"><SearchIcon className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-primary shrink-0" />Advanced search & filtering.</li>
              <li className="flex items-start"><Wrench className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-primary shrink-0" />User-friendly listing tools.</li>
              <li className="flex items-start"><Info className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-primary shrink-0" />Transparent transaction history.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      {/* Blurred NFT Grid Teaser */}
      <div className="relative mt-8 sm:mt-10 mb-6 sm:mb-8">
        <div className="grid grid-cols-2 gap-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 sm:gap-4 filter blur-sm opacity-60 pointer-events-none">
        {nfts.map((nft) => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent backdrop-blur-none rounded-lg p-4">
          <div className="bg-card/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-2xl text-center border border-primary/30 max-w-lg">
            <Sparkles className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-primary mb-2 sm:mb-3" />
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-1 sm:mb-2">
              Full Collection Unveiling Soon!
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              The Polarys Lands are preparing for their grand debut. Stay tuned for the reveal!
            </p>
          </div>
        </div>
      </div>

       <CardFooter className="mt-auto p-3 sm:p-4 text-center justify-center border-t border-border/30">
           <p className="text-xs text-muted-foreground/80">
            Polarys Marketplace is under active development. Stay tuned for exciting updates!
          </p>
        </CardFooter>
    </div>
  );
}
