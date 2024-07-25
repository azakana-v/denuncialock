import styled from "styled-components";

export const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 3rem;
  text-align: center;
  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;

export const ButtonIcon = styled.img`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`;

export const Tooltip = styled.span`
  visibility: hidden;
  background-color: #290686;
  font-size: 1.5rem;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  position: absolute;
  left: 70px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.3s;
    &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -10px;
    transform: translateY(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: transparent #290686 transparent transparent;
  }
`;