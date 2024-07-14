import styled from "styled-components";

export const ProgressBarStyle = styled.div<{ w: string }>`
  border: 1px solid #3b3b3b;
  width: 100% !important;
  height: 40px;
  position: relative;
  border-radius: 5px;
  div {
    width: ${(props) => props.w};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #ee0571;
    border-radius: 5px;

    p {
      position: absolute;
      left: 45%;
      font-weight: 400;
      font-size: 1em;
    }
  }
`;