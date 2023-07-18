import React, { useEffect, useRef } from "react";
import { Content, Overlay } from "./styles";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ children, onClose }) => {
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e: MouseEvent) => {
    if (node.current && node.current.contains(e.target as Node)) {
      return;
    }

    onClose();
  };

  return (
    <Overlay>
      <Content ref={node}>{children}</Content>
    </Overlay>
  );
};

export default Modal;
