import { useEffect, type ReactNode } from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({ title, children, onClose }: ModalProps) => {
  useEffect(() => {
    const handleEscapePress = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        aria-modal="true"
        className={styles.modal}
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            aria-label="Закрыть"
            className={styles.closeButton}
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
