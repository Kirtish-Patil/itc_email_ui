import SideBar from "@/components/sidebar/sidebar";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Fallback } from "@/screens/mail/components/fallback";
import { accounts } from "@/screens/mail/data";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router";

const MainLayout = () => {
  const [cookies] = useCookies();
  const layout = cookies["react-resizable-panels:layout:mail"];
  const collapsed = cookies["react-resizable-panels:collapsed"];

  const defaultLayout = layout ?? undefined;
  const defaultCollapsed = collapsed ?? undefined;

  return (
    <>
      <Fallback />
      <div className="hidden flex-col md:flex">
        <TooltipProvider delayDuration={0}>
          <ResizablePanelGroup
            direction="horizontal"
            onLayout={(sizes: number[]) => {
              document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
                sizes
              )}`;
            }}
            className="max-w-screen max-h-screen  items-stretch"
          >
            <SideBar
              defaultLayout={defaultLayout}
              defaultCollapsed={defaultCollapsed}
              navCollapsedSize={4}
              accounts={accounts}
            />
            <Outlet />
          </ResizablePanelGroup>
        </TooltipProvider>
      </div>
    </>
  );
};

export default MainLayout;
