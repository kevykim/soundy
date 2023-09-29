import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext<HTMLDivElement | null>(null);

export function ModalProvider({ children } : {children : React.ReactNode}) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setValue(modalRef.current);
  }, [modalRef])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  const modalNode : any = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}