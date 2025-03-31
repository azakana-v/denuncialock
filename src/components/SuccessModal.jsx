import React from "react";
import styled from "styled-components";
import logo from "../assets/Logo2.svg";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 2.5rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 550px;
  box-shadow: 0px 4px 8px 5px rgba(230, 223, 230, 1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 3px solid #2c088d;
  padding-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  color: #5b0390;
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #5b0390;
  &:hover {
    color: #4a0277;
  }
`;

const ModalBody = styled.div`
  margin-bottom: 2rem;
`;

const ModalText = styled.p`
  color: #5b0390;
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const ProtocolContainer = styled.div`
  background-color: #f5f0fa;
  border: 2px solid #5b0390;
  border-radius: 0.6rem;
  padding: 1.5rem;
  margin: 1.5rem 0;
  text-align: center;
  cursor: pointer;
`;

const ProtocolNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #5b0390;
  margin: 0.5rem 0;
`;

const WarningText = styled.p`
  color: #d32f2f;
  font-weight: bold;
  font-size: 1.4rem;
  margin: 1.5rem 0;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`;

const ConfirmButton = styled.div`
  background-color: #5b0390;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 1.2rem;
  font-weight: bold;
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  &:hover {
    background-color: #4a0277;
  }
`;

const ModalLogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ModalLogo = styled.img`
  width: 50px;
  height: 45px;
`;

const CopyHint = styled.div`
  font-size: 1.2rem;
  color: #888;
  margin-top: 0.5rem;
`;

const SuccessModal = ({ isOpen, onClose, reportId }) => {
  if (!isOpen) return null;

  const handleCopyProtocol = () => {
    navigator.clipboard.writeText(reportId);
    alert("Protocolo copiado para a área de transferência!");
  };

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContainer>
        <ModalHeader>
          <ModalLogoContainer>
            <ModalLogo src={logo} alt="Logo" />
            <ModalTitle>Denúncia Enviada!</ModalTitle>
          </ModalLogoContainer>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <ModalText>
            Sua denúncia foi registrada com sucesso em nosso sistema e será
            analisada pela nossa equipe.
          </ModalText>
          <ModalText>
            <strong>Número de protocolo da sua denúncia:</strong>
          </ModalText>
          <ProtocolContainer onClick={handleCopyProtocol}>
            <ProtocolNumber>{reportId}</ProtocolNumber>
            <CopyHint>(Clique para copiar)</CopyHint>
          </ProtocolContainer>
          <WarningText>
            ATENÇÃO: Guarde este número de protocolo! Ele será necessário para
            acompanhar o andamento da sua denúncia.
          </WarningText>
        </ModalBody>
        <ModalFooter>
          <ConfirmButton onClick={onClose}>Entendi</ConfirmButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default SuccessModal;
