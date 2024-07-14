import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { deleteAllProducts } from "../../../services/products";
import { Button } from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal";
import { ProgressBar } from "../../../shared/components/ProgressBar";
import { BASE_URL } from "../../../shared/constants";
import { DeleteAllContent } from "../style";

const socket = io(BASE_URL);
socket.connect();

interface props {
  handleClose: () => void;
  handleClearList: () => void;
}

const DeleteAllModal = ({ handleClearList, handleClose }: props) => {
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    socket.on("delete_progress", (data: { progress: number }) => {
      setProgress(data.progress);
    });
  }, []);

  async function handleDelete() {
    await deleteAllProducts();
    handleClearList();
    handleClose();
  }

  return (
    <Modal onClose={() => {}}>
      <DeleteAllContent>
        <p>Remover todos os produtos?</p>
        {!progress ? (
          <div className="actions">
            <Button title="Sim" background="#0d10ce" action={handleDelete} />
            <Button title="Não" background="#ce0d0d" action={handleClose} />
          </div>
        ) : (
          <ProgressBar progress={progress} />
        )}
      </DeleteAllContent>
    </Modal>
  );
};

export default DeleteAllModal;
