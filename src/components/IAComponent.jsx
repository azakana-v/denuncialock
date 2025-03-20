import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// Componente principal
const IAComponent = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const [showOptions, setShowOptions] = useState(false);
  const [showSubOptions, setShowSubOptions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Armazenar a versão original dos campos
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalDescription, setOriginalDescription] = useState("");
  const [hasBeenModified, setHasBeenModified] = useState(false);

  // Salvar a versão original quando o componente receber novos props
  useEffect(() => {
    if (!hasBeenModified) {
      setOriginalTitle(title);
      setOriginalDescription(description);
    }
  }, [title, description]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    setShowSubOptions(null); // Reset sub-options when toggling main menu
  };

  const handleArrowClick = (e) => {
    e.stopPropagation();
    setShowOptions(false);
    setShowSubOptions(null);
  };

  const handleRestoreOriginal = (e) => {
    e.stopPropagation();
    // Restaurar para a versão original
    onTitleChange(originalTitle);
    onDescriptionChange(originalDescription);
    setHasBeenModified(false);
  };

  const handleOptionClick = (option) => {
    setShowSubOptions(option);
  };

  const handleSubOptionClick = async (action, target) => {
    if (!title && !description) {
      setError(
        "Por favor, preencha o título e a descrição antes de usar os recursos de IA."
      );
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Antes da primeira modificação, salvar os valores originais
    if (!hasBeenModified) {
      setOriginalTitle(title);
      setOriginalDescription(description);
      setHasBeenModified(true);
    }

    setIsLoading(true);
    setError(null);

    try {
      let response;

      // Construindo os parâmetros de query para a requisição GET
      let queryParams = new URLSearchParams();

      if (target === "title") {
        queryParams.append("titulo", title);
        // Se for para melhorar o título, incluímos a descrição para contexto
        if (action === "improve") {
          queryParams.append("descricao", description);
        }
      } else {
        // description
        queryParams.append("descricao", description);
        // Se for para melhorar a descrição, incluímos o título para contexto
        if (action === "improve") {
          queryParams.append("titulo", title);
        }
      }

      // Construir o endpoint
      const endpoint = `${baseUrl}/actions/${action}-${target}?${queryParams.toString()}`;

      // Fazer a requisição GET
      response = await axios.get(endpoint);

      if (response.data) {
        if (target === "title") {
          if (action === "improve") {
            return handleApplyChanges(
              "improved",
              "title",
              response.data.improvedTitle
            );
          } else {
            // correct
            return handleApplyChanges(
              "corrected",
              "title",
              response.data.correctedTitle
            );
          }
        } else {
          // description
          if (action === "improve") {
            return handleApplyChanges(
              "improved",
              "description",
              response.data.improvedDescription
            );
          } else {
            // correct
            return handleApplyChanges(
              "corrected",
              "description",
              response.data.correctedDescription
            );
          }
        }
      }
    } catch (err) {
      console.error("Erro ao processar com IA:", err);

      // Fallback para mock se a API falhar
      if (target === "title") {
        if (action === "improve") {
          const mockResponse = {
            originalTitle: title,
            improvedTitle: title
              ? `${title} (aprimorado)`
              : "Título aprimorado",
          };
          return handleApplyChanges(
            "improved",
            "title",
            mockResponse.improvedTitle
          );
        } else {
          const mockResponse = {
            originalTitle: title,
            correctedTitle: title ? `${title} (corrigido)` : "Título corrigido",
          };
          return handleApplyChanges(
            "corrected",
            "title",
            mockResponse.correctedTitle
          );
        }
      } else {
        if (action === "improve") {
          const mockResponse = {
            originalDescription: description,
            improvedDescription: description
              ? `${description}\n\n(Conteúdo aprimorado com IA)`
              : "Descrição aprimorada",
          };
          return handleApplyChanges(
            "improved",
            "description",
            mockResponse.improvedDescription
          );
        } else {
          const mockResponse = {
            originalDescription: description,
            correctedDescription: description
              ? `${description}\n\n(Conteúdo corrigido com IA)`
              : "Descrição corrigida",
          };
          return handleApplyChanges(
            "corrected",
            "description",
            mockResponse.correctedDescription
          );
        }
      }
    } finally {
      setIsLoading(false);
      setShowOptions(false);
      setShowSubOptions(null);
    }
  };

  const handleApplyChanges = async (action, target, newContent) => {
    // Simplificado, não precisamos mais chamar a API para aplicar as mudanças
    // Apenas atualizamos diretamente a interface do usuário

    if (target === "title") {
      onTitleChange(newContent);
    } else {
      // description
      onDescriptionChange(newContent);
    }

    setIsLoading(false);
  };

  return (
    <Container>
      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      )}

      <MainButton onClick={toggleOptions} disabled={isLoading}>
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
      </MainButton>

      {/* A setinha de restaurar agora fica sempre visível quando houver modificações */}
      {hasBeenModified && (
        <RestoreWrapper onClick={handleRestoreOriginal}>
          <RestoreArrow>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                stroke="#5A0094"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </RestoreArrow>
          <RestoreText>Restaurar original</RestoreText>
        </RestoreWrapper>
      )}

      {showOptions && (
        <ArrowWrapper onClick={handleArrowClick}>
          <Arrow>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                stroke="#5A0094"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Arrow>
        </ArrowWrapper>
      )}

      <OptionsContainer visible={showOptions}>
        <Option
          onClick={() => handleOptionClick("improve")}
          active={showSubOptions === "improve"}
        >
          Melhorar
        </Option>
        <Divider />
        <Option
          onClick={() => handleOptionClick("correct")}
          active={showSubOptions === "correct"}
        >
          Corrigir
        </Option>
      </OptionsContainer>

      {showSubOptions && (
        <SubOptionsContainer>
          <SubOption
            onClick={() => handleSubOptionClick(showSubOptions, "title")}
          >
            Título
          </SubOption>
          <Divider />
          <SubOption
            onClick={() => handleSubOptionClick(showSubOptions, "description")}
          >
            Conteúdo
          </SubOption>
        </SubOptionsContainer>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

// Estilos
const Container = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0;
`;

const MainButton = styled.div`
  width: 60px;
  height: 60px;
  background-color: #5a0094;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  z-index: 3;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const ButtonContent = styled.div`
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

const ArrowWrapper = styled.div`
  position: absolute;
  right: -50px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 3;
`;

const Arrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Novo componente para o botão de restaurar
const RestoreWrapper = styled.div`
  position: absolute;
  right: -190px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 3;
  display: flex;
  align-items: center;
  background-color: #f5f0f8;
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid #5a0094;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background-color: #efe5f5;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }
`;

const RestoreArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const RestoreText = styled.div`
  color: #5a0094;
  font-size: 14px;
  font-weight: bold;
`;

const OptionsContainer = styled.div`
  background-color: #1e0a3c;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  position: absolute;
  top: 100%;
  margin-top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Option = styled.div`
  color: white;
  font-size: 16px;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.active ? "#7b00c7" : "transparent")};

  &:hover {
    background-color: #7b00c7;
  }
`;

const SubOptionsContainer = styled.div`
  background-color: #1e0a3c;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  position: absolute;
  top: calc(100% + 80px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SubOption = styled.div`
  color: white;
  font-size: 16px;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #7b00c7;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 30px;
  background-color: white;
  margin: 0 8px;
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

export default IAComponent;
