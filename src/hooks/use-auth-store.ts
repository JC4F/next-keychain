import { User } from "next-auth/types";
import { create } from "zustand";

interface GlobalState {
  user?: User;
}

interface GlobalStore {
  data: GlobalState;
  setData: (newData?: GlobalState) => void;
  onClear: () => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  data: {},
  setData: (newData = {}) =>
    set((state) => ({ ...state, data: { ...state.data, ...newData } })),
  onClear: () => set({ data: {} }),
}));
