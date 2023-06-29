import { ReactNode, useCallback, useMemo, useState } from 'react';
import { ModalContext, ModalParams } from '../context/ModalContext';

declare global {
  interface Window {
    app_modal: {
      showModal: () => void;
    };
  }
}

export default function Modal({ children }: { children?: ReactNode }) {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');

  const showModal = useCallback(
    ({
      title = 'Failed!',
      message = '',
      type = 'bg-error text-red-950',
    }: ModalParams) => {
      setTitle(title);
      setMessage(message);
      setType(type);
      window.app_modal.showModal();
    },
    [setTitle, setMessage]
  );

  const valueProvider = useMemo(
    () => ({
      showModal,
    }),
    [showModal]
  );

  return (
    <ModalContext.Provider value={valueProvider}>
      <dialog id="app_modal" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className={'modal-box ' + type}>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
        </form>
      </dialog>
      {children}
    </ModalContext.Provider>
  );
}
