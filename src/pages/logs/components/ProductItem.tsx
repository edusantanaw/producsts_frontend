import { IProduct } from "../../../@types/model";
import { ListItem } from "../../home/components/style";

interface props {
  data: IProduct;
}

const ProductItem = ({ data }: props) => {
  function formatToBrl(value: number) {
    return value.toFixed(2).replace(".", ",");
  }

  return (
    <ListItem>
      <p className="field">
        Nome: <span>{data.name}</span>
      </p>
      <p className="field">
        Descrição: <span>{data.description}</span>
      </p>
      <p className="field">
        Preço: <span>{formatToBrl(data.price)}</span>
      </p>
    </ListItem>
  );
};

export default ProductItem;
