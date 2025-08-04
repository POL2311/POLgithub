
"use client";

import React, { useEffect } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Toaster } from "@/components/ui/toaster";
import { MobileHeader } from '@/components/MobileHeader';
import { WalletContextProvider } from '@/contexts/WalletContextProvider';

export function AppClientLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      // Normalize mouse position: -0.5 to 0.5 from center
      const xFactor = clientX / innerWidth - 0.5;
      const yFactor = clientY / innerHeight - 0.5;

      const parallaxIntensity = 25; // Max pixels the blobs will shift

      document.documentElement.style.setProperty('--mouse-parallax-x', `${-xFactor * parallaxIntensity}px`);
      document.documentElement.style.setProperty('--mouse-parallax-y', `${-yFactor * parallaxIntensity}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // Reset properties on cleanup
      document.documentElement.style.removeProperty('--mouse-parallax-x');
      document.documentElement.style.removeProperty('--mouse-parallax-y');
    };
  }, []);

  return (
    <>
      {/* Animated Blurry Background */}
      <div className="animated-blur-bg-container">
        <div className="blur-blob blob-1"></div>
        <div className="blur-blob blob-2"></div>
        <div className="blur-blob blob-3"></div>
        <div className="blur-blob blob-4"></div>
        <div className="blur-blob blob-5"></div>
        <div className="blur-blob blob-6"></div>
        <div className="blur-blob blob-7"></div>
      </div>

      {/* Starfield Background Layers */}
      <div className="starfield stars-slow"></div>
      <div className="starfield stars-medium"></div>
      <div className="starfield stars-fast"></div>

      <WalletContextProvider>
        <SidebarProvider defaultOpen={true}> {/* defaultOpen for desktop state */}
          <div className="flex min-h-screen relative z-[1]">
            <AppSidebar />
            <SidebarInset className="flex-1 flex flex-col items-center bg-main-content-background">
              <MobileHeader />
              <div className="flex-1 overflow-y-auto pt-4 md:pt-8 pb-8 px-4 w-full animate-fadeInSlideUp"> {/* Added w-full and animation */}
                {children}
              </div>
            </SidebarInset>
          </div>
          <Toaster />
        </SidebarProvider>
      </WalletContextProvider>
    </>
  );
}
