import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

// Definição de tipos para as props
interface Bordinha2Props {
  nome?: string | JSX.Element;
  email?: string | JSX.Element;
  role?: string;
  reports?: number | string;
  actions?: number | string;
  id?: string;
  isHeader?: boolean;
  onDelete?: () => void; // Callback para atualizar a lista após deletar
}

const ContainerBordinha = styled.div``;

const Filtro = styled.p`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  border-right: 2px solid white;
  &:last-child {
    border-right: none;
  }
`;

const ContentBordinha = styled.div<{ isHeader: boolean }>`
  position: relative;
  margin: 1.5rem 0;
  padding: 1rem 0;
  background: #8004cd;
  color: white;
  font-weight: 600;
  width: 1000px;
  height: 60px;
  border-radius: 15px;
  display: grid;
  cursor: ${(props) => (props.isHeader ? "auto" : "pointer")};
  grid-template-columns: 20% 20% 20% 20% 20%;
  background-color: ${(props) => (props.isHeader ? "#190841" : "#8004cd")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isHeader ? "#190841" : "#5b0390")};
  }
`;

const DeleteOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(91, 3, 144, 0.8);
  border-radius: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 10;

  ${ContentBordinha}:hover & {
    opacity: 1;
    pointer-events: auto;
  }
`;

const TrashIcon = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 10px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  svg {
    width: 24px;
    height: 24px;
    fill: white;
  }
`;

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  color: #5b0390;
  margin-bottom: 20px;
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: black;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #b3b3b3;
  }
`;

const DeleteButton = styled.button`
  background-color: #d9534f;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #c9302c;
  }
`;

function Bordinha2({
  nome,
  email,
  role,
  reports,
  actions,
  id,
  isHeader = false,
  onDelete,
}: Bordinha2Props) {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleRowClick = (e: React.MouseEvent) => {
    // Previne navegação se o usuário clicar no ícone de lixeira
    if ((e.target as HTMLElement).closest(".trash-icon")) {
      e.stopPropagation();
      return;
    }

    if (id && !isHeader) {
      navigate(`/home/agent/${id}`);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setError("");
  };

  const handleConfirmDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    setError("");

    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/agentes/${id}`);
      setShowConfirmation(false);
      setIsDeleting(false);
      if (onDelete) {
        onDelete();
      }
    } catch (error: any) {
      console.error("Erro ao deletar agente:", error);
      setError(
        error.response?.data?.error ||
          "Erro ao deletar agente. Tente novamente."
      );
      setIsDeleting(false);
    }
  };

  return (
    <>
      <ContentBordinha isHeader={isHeader} onClick={handleRowClick}>
        <Filtro>{nome}</Filtro>
        <Filtro>{email}</Filtro>
        <Filtro>{role}</Filtro>
        <Filtro>{reports}</Filtro>
        <Filtro>{actions}</Filtro>

        {/* Overlay com lixeira aparece apenas para itens que não são cabeçalho */}
        {!isHeader && (
          <DeleteOverlay>
            <TrashIcon className="trash-icon" onClick={handleDeleteClick}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
            </TrashIcon>
          </DeleteOverlay>
        )}
      </ContentBordinha>

      {/* Modal de confirmação */}
      {showConfirmation && (
        <ConfirmationModal>
          <ModalContent>
            <ModalTitle>Confirmar exclusão</ModalTitle>
            <p>Tem certeza que deseja excluir este agente?</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ModalButtons>
              <CancelButton onClick={handleCancelDelete}>Cancelar</CancelButton>
              <DeleteButton onClick={handleConfirmDelete} disabled={isDeleting}>
                {isDeleting ? "Excluindo..." : "Excluir"}
              </DeleteButton>
            </ModalButtons>
          </ModalContent>
        </ConfirmationModal>
      )}
    </>
  );
}

export default Bordinha2;
