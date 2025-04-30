import { useEffect } from "react";
import { Mail } from "./components/mail";
import { useCookies } from "react-cookie";
import { useCurrentItem } from "@/store/activePage";
import MailsProvider from "./MailProvider";

export default function MailPage({ type }: { type: string }) {
  const [cookies] = useCookies();
  const [_, setCurrentItem] = useCurrentItem();

  const layout = cookies["react-resizable-panels:layout:mail"];

  const defaultLayout = layout ?? undefined;
  useEffect(() => {
    setCurrentItem(type);
  }, []);

  return (
    <MailsProvider>
      <Mail defaultLayout={defaultLayout} />
    </MailsProvider>
  );
}
