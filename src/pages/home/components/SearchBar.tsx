import { ChangeEvent } from "react";
import styled from "styled-components";

const Input = styled.input`
  margin-bottom: 2em;
  width: 100%;
  padding: 1.4em 2em;
  outline: none;
  border-radius: 7px;
  background-color: #79777713;
  border: 1px solid #c3c3c3;
  color: #fff;
`;

interface props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ value, onChange }: props) => {
  return <Input placeholder="Pesquisar" value={value} onChange={onChange} />;
};

export default SearchBar;
