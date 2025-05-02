import { atom, useAtom, useSetAtom } from "jotai";
import { EmailInteraction } from "@/types/EmailInteracion.type";
import axios from "axios";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/query-core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GenericApiResponse } from "@/types/GenericApiResponse.type";

export const fetchIncomingInteractions = async () => {
  const { data } = await axios.get(
    "https://localhost:44374/api/v1/EmailInteraction/getInteractions?pageNo=1&recPerPage=10"
  );
  return data;
};

export interface MailsState {
  mails: EmailInteraction[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  isFetched: boolean;
  hasMore: boolean;
  error: Error | null;
  fetchNextpage: (() => void) | null;
}

export const mailsAtom = atom<MailsState>({
  mails: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isFetching: false,
  isFetched: false,
  error: null,
  fetchNextpage: null,
  hasMore: false,
});

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

const appendMailsAtom = atom(null, (_, set, update: EmailInteraction[]) => {
  set(mailsAtom, (mailsState) => ({
    ...mailsState,
    mails: mailsState.mails.concat(update),
  }));
});

const fetchInteractions = async (pageParam: number) => {
  const { data } = await axios.get(
    `https://localhost:44374/api/v1/EmailInteraction/getInteractions?pageNo=${pageParam}&recPerPage=10`
  );
  return data;
};

export const useMails = () => {
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const {
    data: response,
    isSuccess,
    error,
    isFetched,
    isLoading,
    isError,
    isFetching,
  } = useQuery<GenericApiResponse<EmailInteraction[]>>({
    queryKey: ["mails", pageNo],
    queryFn: async () => await fetchInteractions(pageNo),
  });

  const setMailsProp = useSetAtom(setMailsPropAtom);
  const appendMails = useSetAtom(appendMailsAtom);

  useEffect(() => {
    setMailsProp({ key: "isError", value: isError });
  }, [isError]);

  useEffect(() => {
    setMailsProp({ key: "hasMore", value: hasMore });
  }, [hasMore]);

  useEffect(() => {
    setMailsProp({ key: "isSuccess", value: isSuccess });
    if (isSuccess) {
      if (response.data.length) {
        setHasMore(true);
        appendMails(response.data);
      } else {
        setHasMore(false);
      }
    }
  }, [isSuccess, response]);

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

  useEffect(() => {
    setMailsProp({
      key: "fetchNextpage",
      value: () => {
        setPageNo((page) => page + 1);
      },
    });
  }, []);

  return useAtom(mailsAtom);
};
