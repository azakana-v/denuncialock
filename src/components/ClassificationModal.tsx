import React, { useState, MouseEvent } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
// import X from "../../assets/icons/x.svg";

// Styled components para o modal
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
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-top: 4px solid #8a2be2; /* Detalhe roxo na parte superior */
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
  color: #8a2be2; /* Texto roxo no cabeçalho */
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8a2be2; /* X em roxo */
`;

const ModalContent = styled.div`
  padding: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 20px;
  border-top: 1px solid #e0e0e0;
  gap: 10px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 20px;

  &:focus {
    border-color: #8a2be2; /* Borda roxa no foco */
    outline: none;
  }
`;

const ConfirmButton = styled.button`
  background-color: #8a2be2; /* Botão roxo */
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: #7126b0; /* Roxo mais escuro no hover */
  }

  &:disabled {
    background-color: #b388ff;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d32f2f;
  }

  &:disabled {
    background-color: #ef9a9a;
    cursor: not-allowed;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #8a2be2; /* Label roxo */
`;

const ErrorMessage = styled.div`
  color: #f44336;
  margin-top: 10px;
  font-size: 14px;
`;

interface RouteParams {
  reportId: string;
  [key: string]: string | undefined;
}

interface ClassificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (risk: string, riskIndex: number) => void;
  currentReport?: any; // Dados atuais da denúncia, se disponíveis
}

const ClassificationModal: React.FC<ClassificationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentReport = {},
}) => {
  // Usando useParams para obter o reportId da URL
  const { reportId } = useParams<RouteParams>();
  const [selectedRisk, setSelectedRisk] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Função para converter o nível de risco em índice
  const getRiskIndex = (risk: string): number => {
    switch (risk) {
      case "Baixo":
        return 0;
      case "Médio":
        return 1;
      case "Alto":
        return 2;
      default:
        return -1;
    }
  };

  const handleConfirm = async () => {
    if (!selectedRisk || !reportId) return;

    const riskIndex = getRiskIndex(selectedRisk);

    // Immediately notify parent component to enable button
    onConfirm(selectedRisk, riskIndex);

    setLoading(true);
    setError("");

    try {
      // Still make the API call to update the risk
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/denuncias/${reportId}`,
        {
          risk: riskIndex, // Enviando o índice do risco (0=baixo, 1=médio, 2=alto)
        }
      );

      // Close the modal on success
      onClose();
    } catch (err) {
      // Show error message but don't revert the UI state
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data.error || "Ocorreu um erro ao atualizar o risco."
        );
      } else {
        setError("Ocorreu um erro ao atualizar o risco.");
      }
      console.error("Erro ao atualizar o risco da denúncia:", err);
      // Note: We're not changing the button state back, as per requirements
      // The user can still proceed even if the API call fails
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRisk(e.target.value);
    setError("");
  };

  // Função para lidar com o clique no overlay
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    // Verifica se o clique foi exatamente no overlay (e não em seus filhos)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Classificar Risco</ModalTitle>
          <CloseButton onClick={onClose}>
            {/* <img src={X} alt="Fechar" /> */}X
          </CloseButton>
        </ModalHeader>
        <ModalContent>
          <FormGroup>
            <Label>Nível de Risco:</Label>
            <StyledSelect value={selectedRisk} onChange={handleChange}>
              <option value="">Selecione um nível</option>
              <option value="Baixo">Baixo</option>
              <option value="Médio">Médio</option>
              <option value="Alto">Alto</option>
            </StyledSelect>
          </FormGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {!reportId && (
            <ErrorMessage>ID da denúncia não encontrado na URL.</ErrorMessage>
          )}
        </ModalContent>
        <ModalFooter>
          <CancelButton onClick={onClose} disabled={loading}>
            Cancelar
          </CancelButton>
          <ConfirmButton
            onClick={handleConfirm}
            disabled={!selectedRisk || loading || !reportId}
          >
            {loading ? "Processando..." : "Concluir"}
          </ConfirmButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ClassificationModal;
