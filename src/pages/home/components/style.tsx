import styled from "styled-components";

export const ListItem = styled.li`
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

export const Form = styled.div`
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