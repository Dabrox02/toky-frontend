"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Separator } from "@/components/shadcn-ui/separator";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/shadcn-ui/resizable";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn-ui/tabs";
import { TooltipProvider } from "@/components/shadcn-ui/tooltip";
import { AccountSwitcher } from "./account-switcher";
import { MailList } from "./mail-list";
import { MailDisplay } from "./mail-display";
import { Input } from "@/components/shadcn-ui/input";
import { useMail } from "./hooks/use-mail";
import { Mail as MailType } from "./hooks/data";
import { useIsClient, useWindowSize } from "usehooks-ts";

interface MailProps {
  // accounts: {
  //   label: string;
  //   email: string;
  //   icon: React.ReactNode;
  // }[];
  // mails: MailType[];
  defaultLayout?: number[] | undefined;
  defaultCollapsed?: boolean;
}

export function Mail({
  defaultLayout = [40, 60],
  defaultCollapsed = false,
}: // accounts,
// mails,
MailProps) {
  const isClient = useIsClient();
  const { width, height } = useWindowSize();
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();

  if (isClient && width >= 786) {
    return (
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
          <Tabs defaultValue="all">
            {/* Cabecero */}
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold ml-auto">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />

            {/* Buscador */}
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>

            {/* Contenidos todos los correos */}
            <TabsContent value="all" className="m-0">
              {/* <MailList items={mails} /> */}
            </TabsContent>

            {/* Contenidos no leidos */}
            <TabsContent value="unread" className="m-0">
              {/* <MailList items={mails.filter((item) => !item.read)} /> */}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          {/* <MailDisplay
          mail={mails.find((item) => item.id === mail.selected) || null}
        /> */}
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }

  return <></>;
}
