import { atom, useAtom } from "jotai";
import { EmailInteraction } from "@/types/EmailInteracion.type";
import axios from "axios";
import { atomWithQuery } from "jotai-tanstack-query";

export const fetchTodoList = async () => {
  const { data } = await axios.get(
    "https://localhost:44374/api/v1/EmailInteraction/getInteractions?pageNo=1&recPerPage=10"
  );
  return data;
};

export interface GenericApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export const mailsQueryAtom = atomWithQuery<
  GenericApiResponse<EmailInteraction[]>
>(() => ({
  queryKey: ["mails"],
  queryFn: fetchTodoList,
}));

type Config = {
  selected: EmailInteraction["id"] | null;
};

const configAtom = atom<Config>({
  selected: 1,
});

export function useSelectedMail() {
  return useAtom(configAtom);
}

export interface MailsState {
  mails: EmailInteraction[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  isFetched: boolean;
  error: Error | null;
}
export const mailsAtom = atom<MailsState>({
  mails: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isFetching: false,
  isFetched: false,
  error: null,
});

export const useMails = () => {
  return useAtom(mailsAtom);
};
