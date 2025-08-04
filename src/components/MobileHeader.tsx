
"use client";

import { PanelLeft } from 'lucide-react';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';

export function MobileHeader() {
  const { isMobile } = useSidebar();

  if (!isMobile) {
    return null;
  }

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between p-3 bg-card/80 backdrop-blur-sm md:hidden border-b border-border/50 shadow-md">
      <div className="text-lg font-bold text-primary">
        Polarys
      </div>
      <SidebarTrigger className="text-primary hover:text-primary/80 hover:bg-primary/10">
        <PanelLeft className="h-6 w-6" />
      </SidebarTrigger>
    </div>
  );
}
