import { format } from "date-fns";
import { Forward, MoreVertical, Reply, ReplyAll } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Editor from "@/components/editor/editor";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConversation } from "../use-convo";
import { EmailBody, Recipient } from "@/types/EmailInteracion.type";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

interface MailDisplayProps {
  conversationId: string;
}

interface MessageProps {
  id: number;
  name: string;
  ccRecipients: Recipient[];
  recievedDateTime: string | null;
  body: EmailBody;
}

export const Message = ({
  body,
  ccRecipients,
  id,
  name,
  recievedDateTime,
}: MessageProps) => {
  const [show, setShow] = useState(false);
  const mailBodyRef = useRef<HTMLIFrameElement>(null);
  const [onclickreply, setOnClickReply] = useState<boolean>(false);

  const handleReplytrigger = (prev: boolean) => {
    setOnClickReply(!prev);
  };

  useEffect(() => {
    if (
      mailBodyRef &&
      mailBodyRef.current &&
      mailBodyRef.current.contentWindow &&
      mailBodyRef.current.contentWindow.document.body
    ) {
      mailBodyRef.current.onload = () => {
        if (mailBodyRef.current) {
          let height =
            mailBodyRef.current.contentWindow?.document.body.scrollHeight ??
            100;
          mailBodyRef.current.height = `${height + 30}px`;
          setShow(true);
        }

        const links =
          mailBodyRef.current?.contentDocument?.querySelectorAll("a") ?? [];
        links.forEach((link) => {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        });
      };
    }
  }, [mailBodyRef]);

  return (
    <div key={id} className="flex h-full flex-col">
      <div className="flex flex-col ">
        <div className="flex">
          <div className=" text-sm  w-full justify-between p-2">
            <div className="flex justify-between">
              <span className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{name}</div>
                  <div className="">
                    <span className="font-medium">To:</span>
                    {ccRecipients.map((r) => r.emailAddress.address)}
                  </div>
                </div>
              </span>

              <div className="flex flex-col">
                <div className="flex">
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Reply className="h-4 w-4" />
                          <span className="sr-only">Reply</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Reply</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ReplyAll className="h-4 w-4" />
                          <span className="sr-only">Reply all</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Reply all</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Forward className="h-4 w-4" />
                          <span className="sr-only">Forward</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Forward</TooltipContent>
                    </Tooltip>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
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
                  <div className="ml-auto text-xs text-muted-foreground">
                    {recievedDateTime &&
                      format(new Date(recievedDateTime), "PPpp")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex-1  whitespace-pre-wrap py-4 px-7 text-sm">
          {!show && <Skeleton className="w-full h-[40vh] rounded-none" />}
          <iframe
            ref={mailBodyRef}
            id="inlineFrameExample"
            title="Inline Frame Example"
            className={cn(
              "bg-white w-full  overflow-y-hidden",
              !show && "invisible"
            )}
            srcDoc={body.content}
          />
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
                  <Switch id="mute" aria-label="Mute thread" /> Mute this thread
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
    </div>
  );
};

export function ConversationDisplay({ conversationId }: MailDisplayProps) {
  const [convState] = useConversation(conversationId);

  return (
    <ScrollArea className="h-screen">
      {convState.conversation &&
        convState.conversation.map((message) => {
          const { emailInteractionDetails } = message;
          const { sender, receivedDateTime, ccRecipients, body } =
            emailInteractionDetails;

          // return (
          //   <div key={message.id} className="flex h-full flex-col">
          //     <div className="flex flex-col ">
          //       <div className="flex">
          //         <div className=" text-sm  w-full justify-between p-2">
          //           <div className="flex justify-between">
          //             <span className="flex items-center gap-2">
          //               <Avatar>
          //                 <AvatarImage />
          //                 <AvatarFallback>
          //                   {sender.emailAddress.name[0]}
          //                 </AvatarFallback>
          //               </Avatar>
          //               <div>
          //                 <div className="font-semibold">
          //                   {sender.emailAddress.name}
          //                 </div>
          //                 <div className="">
          //                   <span className="font-medium">To:</span>{" "}
          //                   {ccRecipients.map((r) => r.emailAddress.address)}
          //                 </div>
          //               </div>
          //             </span>

          //             <div className="flex flex-col">
          //               <div className="flex">
          //                 <div className="flex items-center gap-2">
          //                   <Tooltip>
          //                     <TooltipTrigger asChild>
          //                       <Button
          //                         variant="ghost"
          //                         size="icon"
          //                         onClick={() =>
          //                           handleReplytrigger(onclickreply)
          //                         }
          //                       >
          //                         <Reply className="h-4 w-4" />
          //                         <span className="sr-only">Reply</span>
          //                       </Button>
          //                     </TooltipTrigger>
          //                     <TooltipContent>Reply</TooltipContent>
          //                   </Tooltip>
          //                   <Tooltip>
          //                     <TooltipTrigger asChild>
          //                       <Button variant="ghost" size="icon">
          //                         <ReplyAll className="h-4 w-4" />
          //                         <span className="sr-only">Reply all</span>
          //                       </Button>
          //                     </TooltipTrigger>
          //                     <TooltipContent>Reply all</TooltipContent>
          //                   </Tooltip>
          //                   <Tooltip>
          //                     <TooltipTrigger asChild>
          //                       <Button variant="ghost" size="icon">
          //                         <Forward className="h-4 w-4" />
          //                         <span className="sr-only">Forward</span>
          //                       </Button>
          //                     </TooltipTrigger>
          //                     <TooltipContent>Forward</TooltipContent>
          //                   </Tooltip>
          //                 </div>

          //                 <DropdownMenu>
          //                   <DropdownMenuTrigger asChild>
          //                     <Button variant="ghost" size="icon">
          //                       <MoreVertical className="h-4 w-4" />
          //                       <span className="sr-only">More</span>
          //                     </Button>
          //                   </DropdownMenuTrigger>
          //                   <DropdownMenuContent align="end">
          //                     <DropdownMenuItem>
          //                       Mark as unread
          //                     </DropdownMenuItem>
          //                     <DropdownMenuItem>Star thread</DropdownMenuItem>
          //                     <DropdownMenuItem>Add label</DropdownMenuItem>
          //                     <DropdownMenuItem>Mute thread</DropdownMenuItem>
          //                   </DropdownMenuContent>
          //                 </DropdownMenu>
          //               </div>
          //               <div className="text-xs">
          //                 <div className="ml-auto text-xs text-muted-foreground">
          //                   {receivedDateTime &&
          //                     format(new Date(receivedDateTime), "PPpp")}
          //                 </div>
          //               </div>
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //       <Separator />
          //       <div className="flex-1  whitespace-pre-wrap py-4 px-7 text-sm">
          //         <iframe
          //           id="inlineFrameExample"
          //           title="Inline Frame Example"
          //           className="bg-white w-full h-[70vh]"
          //           srcDoc={body.content}
          //         ></iframe>
          //       </div>
          //       <Separator className="mt-auto" />

          //       {onclickreply && (
          //         <div className="p-4">
          //           <form onSubmit={(e) => e.preventDefault()} className="">
          //             <Editor />
          //             <div className="flex items-center py-2 justify-between">
          //               <Label
          //                 htmlFor="mute"
          //                 className="flex items-center gap-2 text-xs font-normal"
          //               >
          //                 <Switch id="mute" aria-label="Mute thread" /> Mute
          //                 this thread
          //               </Label>
          //               <div className="flex gap-2">
          //                 <Button
          //                   className="ml-auto bg-red-500"
          //                   size="sm"
          //                   onClick={() => handleReplytrigger(onclickreply)}
          //                 >
          //                   Delete
          //                 </Button>
          //                 <Button
          //                   onClick={(e) => e.preventDefault()}
          //                   size="sm"
          //                   className="ml-auto"
          //                 >
          //                   Send
          //                 </Button>
          //               </div>
          //             </div>
          //           </form>
          //         </div>
          //       )}
          //     </div>
          //   </div>
          // );
          return (
            <Message
              key={emailInteractionDetails.id}
              body={body}
              ccRecipients={ccRecipients}
              id={emailInteractionDetails.id}
              name={sender.emailAddress.name}
              recievedDateTime={receivedDateTime}
            />
          );
        })}
    </ScrollArea>
  );
}
