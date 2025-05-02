"use client";

import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCurrentItem } from "@/store/activePage";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    onClick: (path: string) => void;
    variant: "default" | "ghost";
    href: string;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const [currItem] = useCurrentItem();
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant={currItem === link.href ? "default" : "ghost"}
                  onClick={() => link.onClick(link.href)}
                  className={cn(
                    // buttonVariants({ variant: link.variant, size: "icon" }),
                    "h-9 w-9"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button
              key={index}
              variant={currItem === link.href ? "default" : "ghost"}
              onClick={() => {
                link.onClick(link.href);
              }}
              className={cn("justify-start")}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span className={cn("ml-auto")}>{link.label}</span>
              )}
            </Button>
          )
        )}
      </nav>
    </div>
  );
}
