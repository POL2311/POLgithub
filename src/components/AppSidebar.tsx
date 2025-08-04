
// Ensure this file is a client component
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Coins,
  Map,
  Rocket,
  User,
  Store,
  Wallet,
  Star,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import styles from "./SocialButtons.module.css";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

const navItems = [
  { href: '/', label: 'Buy Lands', icon: Rocket },
  { href: '/owned-lands', label: 'Owned Lands', icon: Map },
  { href: '/marketplace', label: 'Marketplace', icon: Store },
  { href: '/tokenomics', label: 'Tokenomics', icon: Coins },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/mint', label: 'mint', icon: Star },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="items-center p-2">
        <div className="relative h-100 w-[160px] group-data-[collapsible=icon]:w-10 transition-all duration-300 flex items-center justify-start group-data-[collapsible=icon]:justify-center">
          {/* Show "Polarys" text when expanded */}
          <img src="/images/PolarysLogo.png" alt="Polarys Logo"/>
          {/* <span className="text-xl h-100 font-bold text-sidebar-primary truncate group-data-[collapsible=icon]:hidden">
              Polarys
          </span> */}
          {/* Show "P" when collapsed */}
          <span className="text-xl font-bold text-sidebar-primary hidden group-data-[collapsible=icon]:inline">
              P
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu className="gap-2"> {/* Increased gap for nav items */}
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{
                    children: item.label,
                    className: "bg-sidebar-accent text-sidebar-accent-foreground text-sm",
                  }}
                  className="text-xs"
                >
                  <a className="group"> {/* Added group class for icon hover */}
                    <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" /> {/* Icon animation */}
                    <span className="truncate">{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="flex flex-col flex-grow justify-end">
          <SidebarMenu className="my-3 flex flex-row justify-center gap-0 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://t.me/YourTelegramChannel" target="_blank" rel="noopener noreferrer" className={styles.button} aria-label="Telegram">
                  <span className={styles.svgContainer}>
                    <svg viewBox="0 0 496 512" height="1.6em" xmlns="http://www.w3.org/2000/svg" fill="white">
                      <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
                    </svg>
                  </span>
                  <span className={`${styles.bg} ${styles.bgBlue}`}></span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" align="center" className={cn("bg-sidebar-accent text-sidebar-accent-foreground text-sm", (state === 'expanded' || isMobile) && "hidden")}>
                Telegram
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://x.com/Polarysland" target="_blank" rel="noopener noreferrer" className={styles.button} aria-label="Twitter">
                  <span className={styles.svgContainer}>
                    <svg viewBox="0 0 512 512" height="1.7em" xmlns="http://www.w3.org/2000/svg" fill="white">
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                    </svg>
                  </span>
                  <span className={`${styles.bg} ${styles.bgBlack}`}></span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" align="center" className={cn("bg-sidebar-accent text-sidebar-accent-foreground text-sm", (state === 'expanded' || isMobile) && "hidden")}>
                Twitter
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://dexscreener.com/" target="_blank" rel="noopener noreferrer" className={styles.button} aria-label="DexScreener">
                  <span className={`${styles.svgContainer} ${styles.svgContainerstock}`}>
                    {/* SVG removed as per request to use background image from CSS for pumplogo.png */}
                  </span>
                  <span className={`${styles.bg} ${styles.bgFacebook}`}></span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" align="center" className={cn("bg-sidebar-accent text-sidebar-accent-foreground text-sm", (state === 'expanded' || isMobile) && "hidden")}>
                DexScreener
              </TooltipContent>
            </Tooltip>
          </SidebarMenu>

<a href='https://polarys.gitbook.io/polarys-docs/' className={styles.outercont}>
  <svg
    viewBox="0 0 24 24"
    height="24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none">
      <path
        d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"
      ></path>
      <path
        d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM11 6.094l-.806 2.36a6 6 0 0 1-3.49 3.649l-.25.091l-2.36.806l2.36.806a6 6 0 0 1 3.649 3.49l.091.25l.806 2.36l.806-2.36a6 6 0 0 1 3.49-3.649l.25-.09l2.36-.807l-2.36-.806a6 6 0 0 1-3.649-3.49l-.09-.25zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026.35l.35-1.027A1 1 0 0 1 19 2"
        fill="currentColor"
      ></path>
    </g>
  </svg>
  GitBook
</a>
           <div className="w-full px-2 mt-2 group-data-[collapsible=icon]:hidden">
                {mounted ? <WalletMultiButton /> : <Button disabled className="w-full justify-start"><Wallet className="mr-2 h-4 w-4" /> Connect Wallet</Button> }
           </div>
           <div className="hidden group-data-[collapsible=icon]:block">
                {mounted ? <WalletMultiButton /> : <Button disabled size="icon"><Wallet className="h-4 w-4" /></Button>}
           </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarSeparator className="my-3 group-data-[collapsible=icon]:hidden" />
        <div className="text-center text-xs text-sidebar-foreground/70 p-2 group-data-[collapsible=icon]:hidden">
          <p>&copy; {new Date().getFullYear()} Polarys Land</p>
          <p>Explore the Cosmos.</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
