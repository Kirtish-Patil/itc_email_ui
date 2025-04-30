"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MailDisplay } from "./mail-display";
import { MailList } from "./mail-list";
import { type Mail } from "../data";
import { mailsAtom, useMails, useSelectedMail } from "../use-mail";
import { EmailInteraction } from "@/types/EmailInteracion.type";
import { atom } from "jotai";

interface MailProps {
  defaultLayout: number[] | undefined;
}

export function Mail({ defaultLayout = [20, 32, 48] }: MailProps) {
  const [mailsState] = useMails();
  return (
    <>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={defaultLayout[1]}
        minSize={30}
        className="max-h-screen"
      >
        <Tabs defaultValue="all">
          <div className="flex items-center px-4 py-2">
            <h1 className="text-xl font-bold">Inbox</h1>
            {/* <TabsList className="ml-auto">
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
            </TabsList> */}
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
          {/* <TabsContent value="all" className="m-0">
            <MailList items={mails} />
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            <MailList items={mails.filter((item) => !item.read)} />
          </TabsContent> */}
          <MailList items={mailsState.mails} />
        </Tabs>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
        {/* <MailDisplay
          mail={mails.find((item) => item.id === mail.selected) || null}
        /> */}
      </ResizablePanel>
    </>
  );
}
