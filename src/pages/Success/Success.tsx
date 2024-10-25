import './Success.css';
import styled from 'styled-components';
import returnIcon from '../../assets/icons/back.svg';
import successIcon from "../../assets/icons/check-mark 1.svg"
import { useNavigate } from "react-router-dom";

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

function Success() {
  const navigate = useNavigate();
    
  return (
    <>
      <div className="success-container">
        <div className="main-success-component">
          <img src={successIcon} alt="a success icon." width={120} height={120} />
          <h1 style={{ fontSize: '2.5rem' }}>Denúncia protocolada com sucesso!</h1>
          <ReturnBtn onClick={() => navigate('/')}>
                <ReturnIcon src={returnIcon}/>
                Voltar
            </ReturnBtn>
        </div>
      </div>
    </>
  );
}

export default Success;
