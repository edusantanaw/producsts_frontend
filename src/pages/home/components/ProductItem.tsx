import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import styled from "styled-components";
import { IProduct } from "../../../@types/model";
import { deleteProductService, editProduct } from "../../../services/products";
import ConfirmModal from "../../../shared/components/ConfirmModal";
import ProductModal from "./ProductModal";

interface props {
  data: IProduct;
  deleteItemFromList: (id: string) => void;
  updateListItem: (data: IProduct) => void;
}

const ListItem = styled.li`
  list-style: none;
  border: 1px solid #c3c3c3;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  border-radius: 5px;
  position: relative;
  .field {
    font-size: 1em;
    color: #ee0571;
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  span {
    font-size: 0.95em;
    font-weight: 300;
    color: #fff;
  }

  .action {
    position: absolute;
    right: 1em;
    display: flex;
    gap: 0.5em;
  }
  .icon {
    font-size: 1.05em;
    cursor: pointer;
  }
`;

const ProductItem = ({ data, deleteItemFromList, updateListItem }: props) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  function formatToBrl(value: number) {
    return value.toFixed(2).replace(".", ",");
  }

  async function handleDelete() {
    await deleteProductService(data.id);
    deleteItemFromList(data.id);
  }

  async function handleEdit(product: Omit<IProduct, "id">) {
    try {
      const response = await editProduct({ ...data, ...product });
      updateListItem(response);
    } catch (error) {
      return error as Error;
    }
  }

  return (
    <ListItem>
      {deleteModal && (
        <ConfirmModal
          message="Realmente deseja remover esse produto?"
          action={handleDelete}
          cancelAction={() => setDeleteModal(false)}
        />
      )}
      {editModal && (
        <ProductModal
          isEdit={true}
          action={handleEdit}
          handleClose={() => setEditModal(false)}
          data={data}
        />
      )}
      <p className="field">
        Nome: <span>{data.name}</span>
      </p>
      <p className="field">
        Descrição: <span>{data.description}</span>
      </p>
      <p className="field">
        Preço: <span>{formatToBrl(data.price)}</span>
      </p>
      <div className="action">
        <FaEdit
          onClick={() => setEditModal(true)}
          className="icon"
          color="#446beb"
        />
        <FaTrash
          onClick={() => setDeleteModal(true)}
          className="icon"
          color="#ff0000"
        />
      </div>
    </ListItem>
  );
};

export default ProductItem;
