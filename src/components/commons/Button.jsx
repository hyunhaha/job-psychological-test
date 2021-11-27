import React from "react";
import styled from "styled-components";

const Button = ({ children, disabled, ...rest }) => (
  <SButton disabled={disabled} {...rest}>
    {children}
  </SButton>
);

const SButton = styled.button`
  border: none;
  border-radius: 10px;
  width: 100px;
  height: 50px;
  background-color: #7f7fd550;
  font-weight: bolder;
  & + & {
    margin-left: 1rem;
  }
  cursor: ${props => (props.disabled ? "default" : "pointer")};
`;
export default Button;
