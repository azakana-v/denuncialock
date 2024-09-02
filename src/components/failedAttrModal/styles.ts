import styled from "styled-components";

export const MainContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
background:rgba(91, 3, 144, 0.5);
  z-index: 999; 
`;

export const ModalContainer = styled.div`
  position: relative;
  width: 450px;
  background: white;
  padding: 2rem 2rem;
  border-radius: 8px;
  z-index: 1000; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

export const CloseButton = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
      transition: .2s;
    &:hover{
        scale: 1.1;
    }
`;

export const Icon = styled.img``

export const Title = styled.h2`
    font-size: 2.2rem;
    color: #5B0390;
    padding: 1rem 2rem;
    text-align: center;
`

export const FakeBorder = styled.div`
    height: 0.2rem;
    width: 80%;
    background-color: #5B0390;
`

export const Buttons = styled.div`
    display: flex;
    gap: 2rem;
`
export const ReturnBtn = styled.div`
cursor: pointer;
    background: #5B0390;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    color: #fff;
    font-size: 1.8rem;
    font-weight: bold;
    width: 189px;
    height: 36px;
    padding: 1rem 1rem;
    border: none;
    border-radius: 0.8rem; 
       transition: .2s;
    &:hover{
        scale: 1.05;
    }
`

export const ReturnIcon = styled.img``

export const DeleteBtn = styled.div`
cursor: pointer;
    background: #DD2445;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    color: #fff;
    font-size: 1.8rem;
    font-weight: bold;
    width: 189px;
    height: 36px;
    padding: 1rem 1rem;
    border: none;
    border-radius: 0.8rem; 
        transition: .2s;
    &:hover{
        scale: 1.05;
    }
   
`