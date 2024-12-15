import { StateCreator } from "zustand";

export type MailSlice = {
  firstName: string;
  lastName: string;
  updateFirstName: (firstName: ["firstName"]) => void;
  updateLastName: (lastName: ["lastName"]) => void;
};

export const createMailSlice: StateCreator<MailSlice> = (set) => ({
  firstName: "",
  lastName: "",
  updateFirstName: (firstName) =>
    set((state) => ({ firstName: state.firstName })),
  updateLastName: (lastName) => set((state) => ({ lastName: state.lastName })),
});
