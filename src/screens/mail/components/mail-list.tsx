import {
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mailsAtom, useMails } from "../use-mail";
import { atom, useSetAtom } from "jotai";
import { useConversation } from "../use-convo";
import { Spinner } from "@/components/ui/spinner";

const setReadStateAtom = atom(
  null,
  (_, set, update: { id: number; mailIdx: number }) => {
    set(mailsAtom, (mailsState) => {
      mailsState.mails[update.mailIdx].emailInteractionDetails.isRead = true;
      return mailsState;
    });
  }
);

export function MailList() {
  const [selectedMail, setSelectedMail] = useConversation();
  const [mailsState] = useMails();
  const setReadState = useSetAtom(setReadStateAtom);
  const [containerHeight, setContainerHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setContainerHeight(window.innerHeight);
    });
  });

  const LoadMoreMails = async () => {
    if (mailsState.fetchNextpage && mailsState.hasMore) {
      mailsState.fetchNextpage();
    }
  };

  const observer = useRef<IntersectionObserver>(null);
  const sentinelRef = useRef(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && mailsState.hasMore) {
        LoadMoreMails();
      }
    },
    [mailsState.hasMore]
  );

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(handleObserver);
    if (sentinelRef.current) {
      observer.current.observe(sentinelRef.current);
    }

    return () => observer.current?.disconnect();
  }, [handleObserver]);

  return (
    <ScrollArea style={{ height: containerHeight - 150 }}>
      <div className="flex flex-col gap-2 p-4 pt-0">
        {mailsState.mails.map((item, idx) => (
          <button
            key={idx}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent min-h-[120px]",
              selectedMail.id === item.id && "bg-muted"
            )}
            onClick={() => {
              setSelectedMail({
                ...selectedMail,
                id: item.id,
                conversationId: item.conversationId,
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
                      selectedMail.id === item.id
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
      <div ref={sentinelRef} style={{ height: 1 }} />
      {/* <Button ref={sentinelRef} onClick={LoadMoreMails}>
        Load More
      </Button> */}
      {mailsState.isFetching && <Spinner size={"large"} />}
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
