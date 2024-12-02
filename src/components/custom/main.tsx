"use client";
import { ReactNode } from "react";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { PanelRight } from "lucide-react";

export const Main = ({ children }: { children: ReactNode }) => {
  const { open } = useSidebar();

  return (
    <main className="relative w-full">
      {!open && (
        <SidebarTrigger className="absolute top-0" icon={<PanelRight />} />
      )}
      <div className="p-8">{children}</div>
    </main>
  );
};
