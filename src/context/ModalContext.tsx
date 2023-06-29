import { createContext } from 'react';

export type ModalParams = {
  message: string;
  title?: string;
  type?: string;
};

type ModalContextProps = {
  showModal: (params: ModalParams) => void;
};

export const ModalContext = createContext<ModalContextProps | null>(null);
