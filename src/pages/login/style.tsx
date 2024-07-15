import styled from "styled-components";
import { Container } from "../../shared/styles/global";

const AuthContainer = styled(Container)`
  display: flex;
`;

const AuthForm = styled.div`
  align-self: center;
  margin-inline: auto;
  border: 1px solid #c3c3c3;
  border-radius: 10px;
  padding: 2em;
  width: 30em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  span {
    display: flex;
    gap: 0.5em;
  }
  a {
    color: #f025ce;
  }

  h2 {
    font-size: 1.9em;
  }

  .input {
    width: 100%;
    input {
        margin-top: .6em;
    }
  }
`;

export { AuthContainer, AuthForm };
