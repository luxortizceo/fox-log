import { create } from "zustand";

interface ContactModalState {
  isOpen: boolean;
  presetInterest: string | null;
  open: (presetInterest?: string) => void;
  close: () => void;
}

export const useContactModalStore = create<ContactModalState>((set) => ({
  isOpen: false,
  presetInterest: null,
  open: (presetInterest) => set({ isOpen: true, presetInterest: presetInterest ?? null }),
  close: () => set({ isOpen: false }),
}));
