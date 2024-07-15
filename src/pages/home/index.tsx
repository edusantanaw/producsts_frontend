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
import DeleteAllModal from "./components/DeleteAllModal";
import ProductItem from "./components/ProductItem";
import ProductModal from "./components/ProductModal";
import SearchBar from "./components/SearchBar";
import { Header, List } from "./style";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [testProductsModal, setTestProductsModal] = useState<boolean>(false);
  const [handleDeleteModal, setHandleDeleteModal] = useState<boolean>(false);
  const [createProductModal, setCreateProductModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");

  const navigate = useNavigate()

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

  const filterdProducts = (data ?? []).filter(
    (e) =>
      e.name.toLowerCase().includes(filter.toLowerCase()) ||
      e.description.includes(filter.toLowerCase())
  );

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
          <Button
            action={() => navigate("/logs")}
            width="13em"
            title="Ver logs"
            background="#656664"
          />
        </div>
      </Header>
      <SearchBar value={filter} onChange={(e) => setFilter(e.target.value)} />
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
          filterdProducts.map((e) => (
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
