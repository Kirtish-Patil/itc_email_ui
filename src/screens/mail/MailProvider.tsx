import { atom, useSetAtom } from "jotai";
import { mailsAtom, MailsState } from "./use-mail";
import { ReactNode, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EmailInteraction } from "@/types/EmailInteracion.type";
import axios from "axios";
import { GenericApiResponse } from "@/types/GenericApiResponse.type";

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

const fetchInteractions = async (pageParam: number) => {
  const { data } = await axios.get(
    `https://localhost:44374/api/v1/EmailInteraction/getInteractions?pageNo=${pageParam}&recPerPage=10`
  );
  return data;
};

const MailsProvider = ({ children }: { children: ReactNode }) => {
  const [pageNo] = useState(1);
  const { data, isSuccess, error, isFetched, isLoading, isError, isFetching } =
    useQuery<GenericApiResponse<EmailInteraction[]>>({
      queryKey: ["mails"],
      queryFn: async () => await fetchInteractions(pageNo),
    });

  const setMailsProp = useSetAtom(setMailsPropAtom);

  useEffect(() => {
    setMailsProp({ key: "isError", value: isError });
  }, [isError]);

  useEffect(() => {
    console.log("isSuccess changed");
    setMailsProp({ key: "isSuccess", value: isSuccess });
    if (isSuccess) {
      setMailsProp({ key: "mails", value: data.data });
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
