import styled from "styled-components";

const Header = styled.div`
  padding-bottom: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .actions {
    display: flex;
    gap: 2em;
  }

  @media (max-width: 1050px) {
    flex-direction: column;
    gap: 2em;
  }

  @media (max-width: 620px) {
    .actions {
      flex-direction: column;

      button {
        width: 20em;
      }
    }
  }
`;

const List = styled.ul`
  display: grid;
  grid-template-rows: 1fr;
  flex-direction: column;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5em;
`;

const DeleteAllContent = styled.div`
  background-color: #080618;
  width: 30em;
  min-height: 13em;
  align-self: center;
  margin-inline: auto;
  padding: 1em;
  background-color: #262627;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2em;
  border-radius: 10px;

  p {
    font-size: 1.2em;
  }

  .actions {
    display: flex;
    gap: 1em;
  }
`;

export { Header, List, DeleteAllContent };
