import { create } from "zustand";

export type ModalType = "confirm";

interface ModalData {
  confirmDialog?: {
    title?: string;
    description?: string;
    onConfirm: (...arg: any) => any;
  };
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  setData: (newData?: ModalData) => void;
  onClose: () => void;
}

export const useModalLayer2 = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  setData: (newData = {}) =>
    set((state) => ({ ...state, data: { ...state.data, ...newData } })),
  onClose: () => set({ type: null, isOpen: false }),
}));
