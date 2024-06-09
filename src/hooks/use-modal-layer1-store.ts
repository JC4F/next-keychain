import { ProductTable } from "@/lib/database/types";
import { create } from "zustand";

type ModalType = "product-detail";

interface ModalData {
  product?: ProductTable;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  setData: (newData?: ModalData) => void;
  onClose: () => void;
}

export const useModalLayer1 = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  setData: (newData = {}) =>
    set((state) => ({ ...state, data: { ...state.data, ...newData } })),
  onClose: () => set({ type: null, isOpen: false }),
}));
