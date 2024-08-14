"use client";

import * as React from "react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  Bot,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccountDropdown } from "@/components/dashboard/account-dropdown";
import { Nav } from "@/components/dashboard/nav";
import { useMail } from "@/components/dashboard/use-mail";
import { NewPlaygroundModal } from "@/components/dashboard/new-playground-modal";
import { Playground, User } from "@/lib/types";
import { PlaygroundList } from "@/components/dashboard/playground-list";

interface DashboardProps {
  userData: User
  playgrounds: Playground[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export default function Dashboard({
  userData,
  playgrounds,
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
}: DashboardProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [isNewPlaygroundModalOpen, setIsNewPlaygroundModalOpen] =
    React.useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full w-full"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex my-2 items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            {/**This is going to be called just Account,
             * will remove the accounts prop
             * It will be a simple dropdown with one option. Log out in red with an react lucide icon.
             */}
            <AccountDropdown isCollapsed={isCollapsed} />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Playgrounds",
                label: String(playgrounds.length),
                icon: Bot,
                variant: "default",
              },
              {
                title: "Trash",
                label: "",
                icon: Trash2,
                variant: "ghost",
              },
              {
                title: "Archive",
                label: "",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Social",
                label: "972",
                icon: Users2,
                variant: "ghost",
              },
              {
                title: "Updates",
                label: "342",
                icon: AlertCircle,
                variant: "ghost",
              },
              {
                title: "Forums",
                label: "128",
                icon: MessagesSquare,
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center px-4 py-2">
              <h1 className="text-xl font-bold">Playgrounds</h1>
              <Button onClick={() => setIsNewPlaygroundModalOpen(true)}>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                New Playground
              </Button>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <PlaygroundList items={playgrounds} userData={userData} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>

        {/** Here i would like to preview the challenge of the playground, but it's stored in R2. */}
        {/** I am not quit sure how to properly address it, yet. I would like to revisit it later. */}
        {/* <ResizableHandle withHandle /> */}
        {/* <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
            <MailDisplay
              mail={mails.find((item) => item.id === mail.selected) || null}
            />
          </ResizablePanel> */}
      </ResizablePanelGroup>
      <NewPlaygroundModal
        isOpen={isNewPlaygroundModalOpen}
        onClose={() => setIsNewPlaygroundModalOpen(false)}
      />
    </TooltipProvider>
  );
}
