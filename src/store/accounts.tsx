import { atom, useAtom } from "jotai";

import { accounts, Account } from "@/screens/mail/data";

const accountsAtom = atom<Account[]>(accounts);

export const useAccounts = () => {
  return useAtom(accountsAtom);
};
