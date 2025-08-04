"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Rocket } from 'lucide-react';
import type { Continent } from '@/lib/constants';
import { useWallet } from '@solana/wallet-adapter-react';
import { MintButton } from '@/components/solana/MintButton';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface ContinentCardProps {
  continent: Continent;
}

export function ContinentCard({ continent }: ContinentCardProps) {
  const { connected } = useWallet();
  // We no longer need to get the candyMachineAddress from process.env here.

  const progressValue = continent.availability > 0 ? (continent.ownedCount / continent.availability) * 100 : 0;

  return (
    <Card className="bg-card text-card-foreground shadow-xl hover:shadow-primary/30 transition-all duration-300 ease-in-out flex flex-col relative overflow-hidden w-full max-w-[260px] sm:max-w-[290px] md:max-w-xs mx-auto border border-transparent hover:border-primary/50 hover:-translate-y-1.5 group transform active:scale-95">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full rounded-t-md overflow-hidden">
          <Image
            src={continent.image}
            alt={continent.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 320px"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            data-ai-hint={continent.dataAiHint || "voxel continent"}
          />
        </div>
      </CardHeader>
      <div className="p-3 flex flex-col flex-grow text-center">
        <CardTitle className="text-lg font-bold text-primary mb-2 mx-auto">{continent.name}</CardTitle>

        <CardContent className="flex-grow p-0 space-y-2 flex flex-col justify-center items-center">
          <div className="space-y-1 w-full px-1 pt-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Total Supply:</span>
              <span className="font-semibold text-foreground">{continent.availability}</span>
            </div>
            <Progress value={progressValue} aria-label={`${continent.ownedCount} of ${continent.availability} claimed`} className="h-1.5 rounded-full bg-primary/30 [&>div]:bg-primary" />
          </div>
          <div className="text-center text-xs text-muted-foreground pt-0.5">
            <span><span className="font-semibold text-foreground">{continent.ownedCount}</span> claimed</span>
          </div>
        </CardContent>

        <CardFooter className="p-0 pt-4 mt-auto flex-col">
          {/* Check if the continent is marked as 'live' */}
          {continent.live ? (
            <>
              {connected ? (
                // If live and connected, pass the continent's specific candyMachineId to the MintButton
                <MintButton candyMachineAddress={continent.candyMachineId} />
              ) : (
                // If live and not connected, show the Connect Wallet button
                <div className="flex flex-col items-center gap-2 w-full">
                   <p className="text-xs text-muted-foreground">Connect wallet to mint</p>
                   <WalletMultiButton style={{ height: '32px', fontSize: '12px', width: '100%' }} />
                </div>
              )}
            </>
          ) : (
            // If not live, show a "Coming Soon" button
            <Button
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs py-2"
              disabled={true}
              aria-label={`${continent.name} coming soon`}
            >
              Coming Soon
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}