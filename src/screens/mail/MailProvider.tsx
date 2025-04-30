import { atom, createStore, Provider, useAtom, useSetAtom } from "jotai";
import { mailsAtom, mailsQueryAtom, MailsState } from "./use-mail";
import { ReactNode, useEffect } from "react";
import { Key } from "lucide-react";

const setMailsPropAtom = atom(
  null,
  (
    _,
    set,
    update: { key: keyof MailsState; value: MailsState[keyof MailsState] }
  ) => {
    const { key, value } = update;
    set(mailsAtom, (mailsState) => ({ ...mailsState, [key]: value }));
  }
);

const MailsProvider = ({ children }: { children: ReactNode }) => {
  const [
    { data, isSuccess, error, isFetched, isLoading, isError, isFetching },
  ] = useAtom(mailsQueryAtom);
  const setMailsProp = useSetAtom(setMailsPropAtom);

  useEffect(() => {
    setMailsProp({ key: "isError", value: isError });
  }, [isError]);

  useEffect(() => {
    setMailsProp({ key: "isSuccess", value: isSuccess });
    if (isSuccess) {
      setMailsProp({ key: "mails", value: data.data });
    } else {
      setMailsProp({ key: "mails", value: [] });
    }
  }, [isSuccess]);

  useEffect(() => {
    setMailsProp({ key: "error", value: error });
  }, [error]);

  useEffect(() => {
    setMailsProp({ key: "isFetched", value: isFetched });
  }, [isFetched]);

  useEffect(() => {
    setMailsProp({ key: "isFetching", value: isFetching });
  }, [isFetching]);

  useEffect(() => {
    setMailsProp({ key: "isLoading", value: isLoading });
  }, [isLoading]);

  return <>{children}</>;
};

export default MailsProvider;
