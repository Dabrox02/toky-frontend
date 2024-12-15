"use client";
import { ReactNode } from "react";
import {
  SidebarTrigger,
  useSidebar,
} from "../../../components/shadcn-ui/sidebar";

export const Main = ({ children }: { children: ReactNode }) => {
  const { open } = useSidebar();

  return (
    <main className="relative flex flex-col flex-1 w-full overflow-y-auto overflow-x-hidden p-4">
      <section>{children}</section>
    </main>
  );
};
