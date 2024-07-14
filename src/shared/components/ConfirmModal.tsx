import { useState } from "react";
import { ModalContent } from "../styles/confirmModal";
import { Button } from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";

interface props {
  action: () => Promise<void> | void;
  cancelAction: () => void;
  message: string;
}

const ConfirmModal = ({ action, cancelAction, message }: props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAction() {
    setLoading(() => true);
    if (error) setError(null);
    try {
      await action();
    } catch (error) {
      const { message } = error as Error;
      setError(message);
    }
    setLoading(() => false);
  }

  return (
    <Modal onClose={cancelAction}>
      <ModalContent>
        <p>{message}</p>
        {!loading ? (
          <div className="actions">
            <Button background="#df0505" title="Sim" action={handleAction} />
            <Button background="#132ec7" title="Não" action={cancelAction} />
          </div>
        ) : (
          <LoadingSpinner />
        )}
        {error && <span>{error}</span>}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
