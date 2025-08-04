
"use client";

import Image from 'next/image';
import type { NFT } from '@/app/marketplace/page'; // Assuming NFT type is exported from marketplace/page.tsx
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TOKEN_SYMBOL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Coins } from 'lucide-react';

interface NFTCardProps {
  nft: NFT;
}

const getRarityBadgeClass = (rarity?: string): string => {
  switch (rarity?.toLowerCase()) {
    case "legendary":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500 hover:bg-yellow-500/30";
    case "rare":
      return "bg-sky-500/20 text-sky-400 border-sky-500 hover:bg-sky-500/30";
    case "uncommon":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500 hover:bg-emerald-500/30";
    case "common":
      return "bg-muted/50 text-muted-foreground border-border hover:bg-muted/60";
    default:
      return "bg-muted/50 text-muted-foreground border-border hover:bg-muted/60";
  }
};

export function NFTCard({ nft }: NFTCardProps) {
  return (
    <Card className="bg-card/60 backdrop-blur-sm border-border/40 shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-in-out flex flex-col overflow-hidden group hover:border-primary/50 hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <div className="relative aspect-square w-full">
          <Image
            src={nft.imageUrl}
            alt={nft.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover rounded-t-md transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={nft.dataAiHint || "nft land image"}
          />
        </div>
        <Badge
          variant="outline"
          className={cn(
            "absolute top-2 right-2 text-xs px-1.5 py-0.5 shadow-md backdrop-blur-sm border", // Ensure border is applied
            getRarityBadgeClass(nft.rarity)
          )}
        >
          {nft.rarity}
        </Badge>
      </CardHeader>
      <CardContent className="p-2.5 sm:p-3 flex flex-col flex-grow space-y-1.5">
        <h3 className="text-sm sm:text-base font-semibold text-primary truncate" title={nft.name}>
          {nft.name}
        </h3>
        <p className="text-xs text-muted-foreground truncate">{nft.collectionName}</p>
        <div className="flex items-center justify-between text-sm sm:text-base font-bold text-foreground pt-1">
          <div className="flex items-center">
            <Coins className="h-3.5 w-3.5 mr-1 text-primary" />
            <span>{nft.price.toLocaleString()}</span>
          </div>
          <span className="text-xs font-medium text-primary">{TOKEN_SYMBOL}</span>
        </div>
      </CardContent>
      <CardFooter className="p-2.5 sm:p-3 mt-auto border-t border-border/30">
        <Button
          variant="default"
          size="sm"
          className="w-full bg-primary/80 hover:bg-primary text-primary-foreground text-xs sm:text-sm transform transition-transform duration-100 ease-out active:scale-95"
          // onClick={() => console.log("Buy NFT:", nft.id)} // Placeholder action
        >
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
