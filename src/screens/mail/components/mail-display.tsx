import { addDays, addHours, format, nextSaturday } from "date-fns";
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-react";

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
// import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mail } from "../data";
import Editor from "@/components/editor/editor";
import { ResizableHandle } from "@/components/ui/resizable";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MailDisplayProps {
  mail: Mail | null;
}

export function MailDisplay({ mail }: MailDisplayProps) {
  // console.log(mail[0]);
  
  const today = new Date();
  const [onclickreply, setOnClickReply] = useState<boolean>(false);

  const handleReplytrigger = (prev: boolean) => {
    setOnClickReply(!prev);
  };

  const handleDeleteTrigger = (prev: boolean) => {
    setOnClickReply(prev);
  };

  return (
    <ScrollArea className="h-screen">
      <div className="flex h-full flex-col">
        {/* <Separator /> */}
        {mail ? (
          <div className="flex flex-col ">
            <div className="flex">
              <div className=" text-sm  w-full justify-between p-2">
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage alt={mail.name} />
                      <AvatarFallback>
                        {mail.name
                          .split(" ")
                          .map((chunk) => chunk[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{mail.name}</div>
                      <div className="">
                        <span className="font-medium">To:</span> {mail.email}
                      </div>
                    </div>
                  </span>

                  <div className="flex flex-col">
                    <div className="flex">
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleReplytrigger(onclickreply)}
                            >
                              <Reply className="h-4 w-4" />
                              <span className="sr-only">Reply</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Reply</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={!mail}
                            >
                              <ReplyAll className="h-4 w-4" />
                              <span className="sr-only">Reply all</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Reply all</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={!mail}
                            >
                              <Forward className="h-4 w-4" />
                              <span className="sr-only">Forward</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Forward</TooltipContent>
                        </Tooltip>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" disabled={!mail}>
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                          <DropdownMenuItem>Star thread</DropdownMenuItem>
                          <DropdownMenuItem>Add label</DropdownMenuItem>
                          <DropdownMenuItem>Mute thread</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  <div className="text-xs">
                    {mail.date && (
                      <div className="ml-auto text-xs text-muted-foreground">
                        {format(new Date(mail.date), "PPpp")}
                      </div>
                    )}
                  </div>
                  </div>
                </div>             
              </div>
            </div>
            <Separator />
            <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
              {mail.text}
            </div>
            <Separator className="mt-auto" />

            {onclickreply && (
              <div className="p-4">
                <form onSubmit={(e) => e.preventDefault()} className="">
                  <Editor />

                  <div className="flex items-center py-2 justify-between">
                    <Label
                      htmlFor="mute"
                      className="flex items-center gap-2 text-xs font-normal"
                    >
                      <Switch id="mute" aria-label="Mute thread" /> Mute this
                      thread
                    </Label>
                    <div className="flex gap-2">
                      <Button
                        className="ml-auto bg-red-500"
                        size="sm"
                        onClick={() => handleReplytrigger(onclickreply)}
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                        className="ml-auto"
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No message selected
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
