import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

const SugestaoAcoesComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { reportId } = useParams();
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const togglePopup = () => {
    setShowPopup(!showPopup);
    // Feche o modal se o popup for fechado
    if (showPopup) {
      setShowModal(false);
    }
  };

  const fetchSuggestions = async () => {
    if (!reportId) {
      setError("ID da denúncia não encontrado");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${baseUrl}/denuncias/${reportId}/suggest-actions`
      );
      setSuggestions(response.data);
      setShowModal(true);
      setShowPopup(false); // Fechar o popup depois de clicar
    } catch (err) {
      console.error("Erro ao buscar sugestões de ações:", err);
      setError(
        "Não foi possível obter sugestões de ações. Tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <ComponentContainer>
      {/* Popup azul escuro */}
      {showPopup && (
        <Popup onClick={fetchSuggestions}>
          <PopupText>Sugestão de ações</PopupText>
          <PopupTriangle />
        </Popup>
      )}

      {/* Botão principal */}
      <SugestaoButton onClick={togglePopup} disabled={isLoading}>
        <ButtonContent>
          <IAText>IA</IAText>
          <WrenchIcon>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </WrenchIcon>
        </ButtonContent>
      </SugestaoButton>

      {/* Modal com as sugestões */}
      {showModal && suggestions && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                Sugestões de Ações Investigativas para a Denúncia
              </ModalTitle>
              <CloseButton onClick={closeModal}>×</CloseButton>
            </ModalHeader>
            <ModalDescription>
              Diante da denúncia relatada, é essencial que o supervisor
              responsável conduza uma investigação justa e imparcial para
              garantir um ambiente de trabalho seguro e respeitoso. O objetivo é
              apurar os fatos, proteger os envolvidos e tomar medidas cabíveis
              com base nas evidências coletadas. Abaixo estão três sugestões de
              ações investigativas que podem ser adotadas:
            </ModalDescription>

            <SuggestionsContainer>
              <SuggestionCard className="card-purple">
                <div
                  dangerouslySetInnerHTML={{
                    __html: suggestions.suggestions.action1,
                  }}
                />
              </SuggestionCard>

              <SuggestionCard className="card-blue">
                <div
                  dangerouslySetInnerHTML={{
                    __html: suggestions.suggestions.action2,
                  }}
                />
              </SuggestionCard>

              <SuggestionCard className="card-purple">
                <div
                  dangerouslySetInnerHTML={{
                    __html: suggestions.suggestions.action3,
                  }}
                />
              </SuggestionCard>
            </SuggestionsContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </ComponentContainer>
  );
};

// Container para posicionar relativamente
const ComponentContainer = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1rem;
`;

// Popup azul escuro
const Popup = styled.div`
  position: absolute;
  bottom: calc(100% + 10px);
  background-color: #1e0a3c; /* Azul escuro */
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 5;
  transition: all 0.2s ease;
  text-align: center;
  white-space: nowrap;

  &:hover {
    background-color: #2c0e56;
  }
`;

const PopupText = styled.span`
  white-space: nowrap;
`;

// Triângulo abaixo do popup
const PopupTriangle = styled.div`
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #1e0a3c; /* Mesma cor do popup */
`;

// Estilo do botão
const SugestaoButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const ButtonContent = styled.div`
  width: 60px;
  height: 60px;
  background-color: #5a0094;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IAText = styled.div`
  color: white;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 2px;
`;

const WrenchIcon = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 85%;
  max-width: 800px;
  max-height: 90vh;
  border-radius: 16px;
  padding: 30px;
  position: relative;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #5a0094;
  cursor: pointer;
  font-weight: bold;
`;

const ModalTitle = styled.h2`
  color: #5a0094;
  font-size: 24px;
  font-weight: bold;
  flex: 1;
`;

const ModalDescription = styled.p`
  color: #333;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 24px;
`;

const SuggestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SuggestionCard = styled.div`
  border-radius: 12px;
  padding: 20px;
  color: white;

  &.card-purple {
    background-color: #5a0094; /* roxo */
  }

  &.card-blue {
    background-color: #1e0a3c; /* azul escuro */
  }

  /* Estilos para o conteúdo HTML recebido da API */
  h3 {
    font-size: 18px;
    margin-bottom: 12px;
    font-weight: bold;
  }

  ul {
    padding-left: 20px;
    list-style-type: disc;
  }

  li {
    margin-bottom: 8px;
    line-height: 1.4;
  }

  /* Sobrescrever estilos para a classe action que pode vir no HTML da API */
  .action h3 {
    font-size: 18px;
    margin-bottom: 12px;
    font-weight: bold;
  }

  .action ul {
    padding-left: 20px;
    list-style-type: disc;
  }

  .action li {
    margin-bottom: 8px;
    line-height: 1.4;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingSpinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #5a0094;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: -60px;
  background-color: #ff5252;
  color: white;
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 4;
`;

export default SugestaoAcoesComponent;
