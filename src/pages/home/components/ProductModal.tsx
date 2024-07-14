import { useState } from "react";
import styled from "styled-components";
import { IProduct } from "../../../@types/model";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import Modal from "../../../shared/components/Modal";
import { Label } from "../../../shared/styles/input";
import { removeNotBrlValue } from "../../../shared/utils/removeNotBrlValue";

interface props {
  data?: IProduct;
  action: (data: Omit<IProduct, "id">) => Promise<Error | undefined>;
  isEdit?: boolean;
  handleClose: () => void;
}

const Form = styled.div`
  width: 24em;
  background-color: #262627;
  border-radius: 10px;
  padding: 2em;
  align-self: center;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  .input {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  #error {
    color: #ff0202;
  }
`;

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
    else handleClose()
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
