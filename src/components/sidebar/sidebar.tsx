import React from "react";
import { ResizablePanel } from "../ui/resizable";
import { Nav } from "./nav";
import { File, Inbox, Send } from "lucide-react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { AccountSwitcher } from "./account-switcher";
import ThemeSwitch from "@/theme/themeSwitch";
import { useNavigate } from "react-router";
import { useCurrentItem } from "@/store/activePage";

interface SideBarProps {
  defaultCollapsed?: boolean;
  defaultLayout?: number[];
  navCollapsedSize: number;
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
}

const SideBar = ({
  defaultCollapsed = false,
  defaultLayout = [20, 32, 48],
  navCollapsedSize,
  accounts,
}: SideBarProps) => {
  const [_, setCurrItem] = useCurrentItem();
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    setCurrItem(path);
    navigate(path);
  };

  return (
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
        isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out"
      )}
    >
      <div
        className={cn(
          "flex my-1 items-center justify-between gap-2",
          isCollapsed ? "h-[80px] flex-col" : "px-2"
        )}
      >
        <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
        <ThemeSwitch />
      </div>
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Inbox",
            onClick: navigateTo,
            label: "128",
            icon: Inbox,
            variant: "default",
            href: "inbox",
          },
          {
            title: "Drafts",
            onClick: navigateTo,
            label: "9",
            icon: File,
            variant: "ghost",
            href: "draft",
          },
          {
            onClick: navigateTo,
            title: "Sent",
            label: "",
            icon: Send,
            variant: "ghost",
            href: "sent",
          },
        ]}
      />
      <Separator />
      {/* <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            icon: UsersRound,
            title: "Team Desk",
            variant: "ghost",
            label: "5",
            href: "team",
          },
        ]}
      /> */}
    </ResizablePanel>
  );
};

export default SideBar;
