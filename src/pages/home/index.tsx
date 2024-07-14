import { useState } from "react";
import { IProduct } from "../../@types/model";
import {
  createProductService,
  createTestProductsService,
} from "../../services/products";
import { Button } from "../../shared/components/Button";
import ConfirmModal from "../../shared/components/ConfirmModal";
import { useFetchList } from "../../shared/hooks/useFetch";
import { Container, Title } from "../../shared/styles/global";
import { Header, List } from "./style";
import ProductItem from "./components/ProductItem";
import DeleteAllModal from "./components/DeleteAllModal";
import ProductModal from "./components/ProductModal";

const Home = () => {
  const [testProductsModal, setTestProductsModal] = useState<boolean>(false);
  const [handleDeleteModal, setHandleDeleteModal] = useState<boolean>(false);
  const [createProductModal, setCreateProductModal] = useState<boolean>(false);

  const { data, addItemToList, clearList, deleteFromList, updateListItem } =
    useFetchList<IProduct, IProduct[]>({
      route: "/api/product",
      getResponse: (e) => e,
    });

  async function handleCreateTestProducts() {
    const response = await createTestProductsService();
    addItemToList(...response);
    setTestProductsModal(false);
  }

  async function handleCreateProduct(data: Omit<IProduct, "id">) {
    try {
      const response = await createProductService(data);
      addItemToList(response);
    } catch (error) {
      return error as Error;
    }
  }

  return (
    <Container>
      <Header>
        <Title>Desafio Full Stack Lexart labs</Title>
        <div className="actions">
          <Button
            action={() => setTestProductsModal(true)}
            width="13em"
            title="Carregar produtos de teste"
          />
          <Button
            action={() => setHandleDeleteModal(true)}
            width="13em"
            title="Eliminar todos os produtos"
            background="#650cda"
          />
          <Button
            action={() => setCreateProductModal(true)}
            width="13em"
            title="Novo produto"
            background="#27b105"
          />
        </div>
      </Header>
      {testProductsModal && (
        <ConfirmModal
          action={handleCreateTestProducts}
          message="Deseja criar produtos de teste?"
          cancelAction={() => setTestProductsModal(false)}
        />
      )}
      {handleDeleteModal && (
        <DeleteAllModal
          handleClearList={clearList}
          handleClose={() => setHandleDeleteModal(false)}
        />
      )}
      {createProductModal && (
        <ProductModal
          handleClose={() => setCreateProductModal(false)}
          action={handleCreateProduct}
        />
      )}
      <List>
        {data &&
          data.map((e) => (
            <ProductItem
              deleteItemFromList={deleteFromList}
              updateListItem={updateListItem}
              key={e.id}
              data={e}
            />
          ))}
      </List>
    </Container>
  );
};

export default Home;
