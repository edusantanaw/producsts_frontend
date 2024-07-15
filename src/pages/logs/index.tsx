import styled from "styled-components";
import { IProduct } from "../../@types/model";
import { useFetchList } from "../../shared/hooks/useFetch";
import { Container, Title } from "../../shared/styles/global";
import { List } from "../home/style";
import ProductItem from "./components/ProductItem";

const LogContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  align-items: center;
  ul {
    width: 100%;
  }
`

const Log = () => {
  const { data } = useFetchList<IProduct, IProduct[]>({
    route: "/api/product?onlyDeleted=true",
    getResponse: (e) => e,
  });

  return (
    <LogContainer>
      <Title>Lista de produtos Removidos</Title>
      <List>
        {data &&
          data.map((e) => (
            <ProductItem
              key={e.id}
              data={e}
            />
          ))}
      </List>
    </LogContainer>
  );
};

export default Log;
