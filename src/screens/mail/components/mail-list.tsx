import { ComponentProps, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mailsAtom, useSelectedMail } from "../use-mail";
import { EmailInteraction } from "@/types/EmailInteracion.type";
import parse from "html-react-parser";
import { atom, useSetAtom } from "jotai";

interface MailListProps {
  items: EmailInteraction[];
}

const setReadStateAtom = atom(
  null,
  (_, set, update: { id: number; mailIdx: number }) => {
    set(mailsAtom, (mailsState) => {
      // const mailsUpdated = mailsState.mails.map((mail) => {
      //   if (mail.id === update.id) {
      //     mail.emailInteractionDetails.isRead = true;
      //     return mail;
      //   } else {
      //     return mail;
      //   }
      // });
      mailsState.mails[update.mailIdx].emailInteractionDetails.isRead = true;
      return mailsState;
    });
  }
);

export function MailList({ items }: MailListProps) {
  const [mail, setMail] = useSelectedMail();
  const setReadState = useSetAtom(setReadStateAtom);
  const [containerHeight, setContainerHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setContainerHeight(window.innerHeight);
    });
  });

  return (
    <ScrollArea style={{ height: containerHeight - 150 }}>
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item, idx) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent min-h-[120px]",
              mail.selected === item.id && "bg-muted"
            )}
            onClick={() => {
              setMail({
                ...mail,
                selected: item.id,
              });
              setReadState({ id: item.id, mailIdx: idx });
            }}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">
                    {item.emailInteractionDetails.sender.emailAddress.name}
                  </div>
                  {!item.emailInteractionDetails.isRead && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                {item.emailInteractionDetails.receivedDateTime && (
                  <div
                    className={cn(
                      "ml-auto text-xs",
                      mail.selected === item.id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {formatDistanceToNow(
                      new Date(item.emailInteractionDetails.receivedDateTime),
                      {
                        addSuffix: true,
                      }
                    )}
                  </div>
                )}
              </div>
              <div className="text-xs font-medium">
                {item.emailInteractionDetails.subject}
              </div>
            </div>
            <div className="line-clamp-2 text-sm text-muted-foreground">
              {/* {item.text.substring(0, 300)} */}
              {/* {parse(item.emailInteractionDetails.bodyPreview)} */}
              {item.emailInteractionDetails.bodyPreview.substring(0, 32) ===
              "________________________________"
                ? "No Preview Available"
                : item.emailInteractionDetails.bodyPreview.substring(0, 150)}
            </div>
            {item.status ? (
              <div className="flex items-center gap-2">
                {/* {item.labels.map((label) => ( */}
                <Badge
                  key={item.status}
                  variant={getBadgeVariantFromLabel(item.status)}
                  className="capitalize"
                >
                  {item.status}
                </Badge>
                {/* ))} */}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "default";
}
