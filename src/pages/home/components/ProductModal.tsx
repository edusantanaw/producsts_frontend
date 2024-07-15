import { useState } from "react";
import { IProduct } from "../../../@types/model";
import Modal from "../../../shared/components/Modal";
import { Form } from "./style";
import { Label } from "../../../shared/styles/input";
import { Input } from "../../../shared/components/Input";
import { removeNotBrlValue } from "../../../shared/utils/removeNotBrlValue";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import { Button } from "../../../shared/components/Button";

interface props {
  data?: IProduct;
  action: (data: Omit<IProduct, "id">) => Promise<Error | undefined>;
  isEdit?: boolean;
  handleClose: () => void;
}

const ProductModal = ({ action, data, isEdit, handleClose }: props) => {
  const [name, setName] = useState<string>(data?.name ?? "");
  const [description, setDescription] = useState<string>(
    data?.description ?? ""
  );
  const [price, setPrice] = useState<string | null>(String(data?.price ?? ""));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAction() {
    if (error) setError(() => null);
    setLoading(() => true);
    const maybeError = await action({
      description,
      name,
      price: Number(price?.replace(",", ".") ?? 0),
    });
    if (maybeError) setError(maybeError.message);
    else handleClose();
    setLoading(() => false);
  }

  return (
    <Modal onClose={handleClose}>
      <Form>
        <h2>{isEdit ? "Editar" : "Criar"} produto</h2>
        <div className="input">
          <Label>Nome:</Label>
          <Input
            placeholder="Digite o nome..."
            value={name ?? ""}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input">
          <Label>Descrição:</Label>
          <Input
            placeholder="Digite a descrição..."
            value={description ?? ""}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input">
          <Label>Preço:</Label>
          <Input
            placeholder="Digite o preço..."
            value={price ?? ""}
            onChange={(e) => setPrice(removeNotBrlValue(e.target.value))}
          />
        </div>
        {error && <span id="error">{error}</span>}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Button title="Enviar" width="60%" action={handleAction} />
        )}
      </Form>
    </Modal>
  );
};

export default ProductModal;
