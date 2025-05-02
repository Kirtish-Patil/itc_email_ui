import { EmailInteraction } from "@/types/EmailInteracion.type";
import { useQuery } from "@tanstack/react-query";
import { atom, useAtom, useSetAtom } from "jotai";
import axios from "axios";
import { useEffect } from "react";
import { GenericApiResponse } from "@/types/GenericApiResponse.type";

type ConvState = {
  id: EmailInteraction["id"] | null;
  conversationId: EmailInteraction["conversationId"] | null;
  conversation: EmailInteraction[] | null;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isFetched: boolean;
  error: Error | null;
};

export const activeConvoAtom = atom<ConvState>({
  id: null,
  conversationId: null,
  conversation: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  isFetching: false,
  isFetched: false,
  error: null,
});

const setConvPropAtom = atom(
  null,
  (
    _,
    set,
    update: { key: keyof ConvState; value: ConvState[keyof ConvState] }
  ) => {
    const { key, value } = update;
    set(activeConvoAtom, (convState) => ({ ...convState, [key]: value }));
  }
);

export function useConversation(conversationId?: string) {
  if (conversationId) {
    const {
      data,
      isSuccess,
      error,
      isFetched,
      isLoading,
      isError,
      isFetching,
    } = useQuery<GenericApiResponse<EmailInteraction[]>>({
      queryKey: ["convo", conversationId],
      queryFn: async () => {
        const { data } = await axios.get(
          `https://localhost:44374/api/v1/EmailInteraction/getConversation/${conversationId}`
        );

        return data;
      },
    });

    const setConvProp = useSetAtom(setConvPropAtom);

    useEffect(() => {
      setConvProp({ key: "isSuccess", value: isSuccess });
      if (isSuccess) {
        setConvProp({ key: "conversation", value: data.data });
      }
    }, [isSuccess, data]);

    useEffect(() => {
      setConvProp({ key: "error", value: error });
    }, [error]);

    useEffect(() => {
      setConvProp({ key: "isFetched", value: isFetched });
    }, [isFetched]);

    useEffect(() => {
      setConvProp({ key: "isFetching", value: isFetching });
    }, [isFetching]);

    useEffect(() => {
      setConvProp({ key: "isLoading", value: isLoading });
    }, [isLoading]);

    useEffect(() => {
      setConvProp({ key: "isError", value: isError });
    }, [isError]);
  }
  return useAtom(activeConvoAtom);
}
