import { create } from "zustand";
import { createMailSlice, MailSlice } from "./mail-slice";

export const useBoundStore = create<MailSlice>((...a) => ({
  ...createMailSlice(...a),
}));
