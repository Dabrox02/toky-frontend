"use client";
import { Button } from "@/components/shadcn-ui/button";
import { SidebarTrigger, useSidebar } from "@/components/shadcn-ui/sidebar";
import { Nav, NavItem, NavItemGroup } from "@/components/ui/nav";
import { ArrowLeft, ArrowRight, CircleHelp } from "lucide-react";

export const AppNav = () => {
  const { open } = useSidebar();

  return (
    <Nav>
      <NavItemGroup>
        <NavItem>
          <SidebarTrigger
            className="w-8 h-8"
            variant="outline"
            icon={open ? <ArrowLeft /> : <ArrowRight />}
          />
        </NavItem>
      </NavItemGroup>
      <NavItemGroup className="flex justify-end">
        <NavItem asButton>
          <CircleHelp />
        </NavItem>
      </NavItemGroup>
    </Nav>
  );
};
