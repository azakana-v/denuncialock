import axios from "axios";
import styled from "styled-components";
import logo from "../assets/Logo2.svg";
import React, { useState, useEffect } from "react";
import FileUpload from "../components/fileUpload/FileUpload";
import icon from "../assets/icons/multiply 1.svg";
import send from "../assets/icons/send-message 1.svg";
import { useNavigate, useParams } from "react-router-dom";
import IAComponent from "../components/IAComponent";

// Interfaces e Types
interface SwitchProps {
  isChecked: boolean;
}

interface ActionDetails {
  titulo?: string;
  descricao?: string;
}

interface IAComponentProps {
  title: string;
  description: string;
  onTitleChange: (newTitle: string) => void;
  onDescriptionChange: (newDescription: string) => void;
}

// Corrigido: O tipo precisa ser compatível com Record<string, string | undefined>
type RouteParams = {
  reportId?: string;
  agentId?: string;
};

// Styled Components
const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100vh;
  padding-top: 8rem;
  overflow-y: auto;
`;

const Title = styled.div`
  display: flex;
  align-items: end;
  gap: 1rem;
  border-bottom: 3px solid #2c088d;
`;

const TitleLogo = styled.img`
  width: 100px;
  height: 90px;
  padding-bottom: 1.5rem;
`;

const TitleText = styled.h2`
  font-size: 4.5rem;
  font-weight: bold;
  color: #5b0390;
  padding-bottom: 1.5rem;
`;

const FormContainer = styled.div`
  margin-top: 2rem;
  background-color: #fff;
  height: auto;
  width: 70%;
  border-radius: 1rem;
  box-shadow: 0px 4px 8px 5px rgba(230, 223, 230, 1);
  padding: 2rem;
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
`;

const LabelForm = styled.label`
  color: #5b0390;
  font-weight: bold;
  font-size: 1.9rem;
`;

const TitleInput = styled.input`
  color: #5b0390;
  font-size: 1.5rem;
  width: 50%;
  height: 3rem;
  padding: 1.2rem;
  border: 2px solid #5b0390;
  outline: none;
  border-radius: 0.6rem;
  margin-bottom: 1rem;

  ::placeholder {
    color: #c2bebe;
  }
`;

const ReportDescription = styled.textarea`
  color: #5b0390;
  font-size: 1.5rem;
  height: 30rem;
  width: 100%;
  border: 2px solid #5b0390;
  border-radius: 0.6rem;
  outline: none;
  padding: 1rem;

  ::placeholder {
    color: #c2bebe;
  }
`;

const ActionSection = styled.div`
  display: flex;
  justify-content: space-around;
`;

const DividerSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const SendSection = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  justify-content: space-around;
`;

const ClearButton = styled.div`
  cursor: pointer;
  width: 250px;
  height: 38px;
  border: 2px solid #5b0390;
  border-radius: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const SendButton = styled.div`
  cursor: pointer;
  width: 250px;
  height: 38px;
  border: 2px solid #5b0390;
  color: #fff;
  background: #5b0390;
  border-radius: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 1rem;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 1rem;
`;

const IAComponentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 1rem;
`;

const Card = styled.div`
  width: 80px;
  height: 80px;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  &:hover span {
    opacity: 1;
  }
`;

const TrashIcon = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

function NewAction(): React.ReactElement {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { reportId, agentId } = useParams<RouteParams>();
  const [files, setFiles] = useState<File[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Limpar ou definir o actionId no localStorage quando o componente montar/desmontar
  useEffect(() => {
    // Verificar se estamos editando uma ação existente
    const path = window.location.pathname;
    const editMatch = path.match(/\/edit-action\/([^/]+)/);

    if (editMatch && editMatch[1]) {
      const currentActionId = editMatch[1];
      setActionId(currentActionId);
      localStorage.setItem("currentActionId", currentActionId);

      // Buscar detalhes da ação se estiver editando
      fetchActionDetails(currentActionId);
    } else {
      localStorage.removeItem("currentActionId");
    }

    return () => {
      localStorage.removeItem("currentActionId");
    };
  }, []);

  const fetchActionDetails = async (id: string): Promise<void> => {
    try {
      const response = await axios.get<ActionDetails>(
        `${baseUrl}/actions/${id}`
      );
      if (response.data) {
        setTitle(response.data.titulo || "");
        setDescription(response.data.descricao || "");
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes da ação:", error);
    }
  };

  const handleTitleChange = (newTitle: string): void => {
    setTitle(newTitle);
  };

  const handleDescriptionChange = (newDescription: string): void => {
    setDescription(newDescription);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
      event.target.value = "";
    }
  };

  const handleDeleteFile = (indexToDelete: number): void => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleClear = (): void => {
    setTitle("");
    setDescription("");
    setFiles([]);
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("titulo", title);
    formData.append("descricao", description);
    formData.append("agenteId", agentId || "");

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      let response;

      if (actionId) {
        // Se temos um ID, estamos editando uma ação existente
        response = await axios.put(`${baseUrl}/actions/${actionId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Caso contrário, estamos criando uma nova ação
        if (reportId) {
          response = await axios.post(
            `${baseUrl}/denuncias/${reportId}/actions`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          console.error("reportId é indefinido");
          return;
        }
      }

      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.log("Erro ao enviar ação: ", error);
    }
  };

  const formatString = (stringToFormat: string): string => {
    if (!stringToFormat) return "-";
    return stringToFormat.length > 8
      ? stringToFormat.substring(0, 8) + "..."
      : stringToFormat;
  };

  return (
    <MainContainer>
      <Title>
        <TitleLogo src={logo} alt="Logo" />
        <TitleText>
          {actionId ? "Editar" : "Adicionar"} Ação Investigativa
        </TitleText>
      </Title>
      <FormContainer>
        <FormStyle onSubmit={handleSubmit}>
          <LabelForm>Ação investigativa</LabelForm>
          <TitleInput
            type="text"
            placeholder="Título da ação*"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormStyle>
        <ReportDescription
          placeholder="Conteúdo da ação*"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <IAComponentWrapper>
          <IAComponent
            title={title}
            description={description}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
          />
        </IAComponentWrapper>

        <ActionSection>
          <SendSection>
            <FileUpload onFileChange={handleFileChange} />
            <ClearButton onClick={handleClear}>
              <span
                style={{
                  fontSize: "1.8rem",
                  color: "#5B0390",
                  fontWeight: "bold",
                }}
              >
                Limpar Formulário
              </span>
              <img src={icon} alt="" />
            </ClearButton>
          </SendSection>
          <DividerSection>
            <div
              className="ghostDiv"
              style={{ background: "#2C088D", height: "70%", width: "0.2rem" }}
            ></div>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "4rem", height: "4rem" }}
            />
          </DividerSection>
          <SendSection>
            {files.length > 0 ? (
              <Cards>
                {files.map((file, index) => (
                  <Card key={index}>
                    {formatString(file.name)}
                    <TrashIcon onClick={() => handleDeleteFile(index)}>
                      🗑️
                    </TrashIcon>
                  </Card>
                ))}
              </Cards>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <p
                  style={{
                    color: "#5B0390",
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                  }}
                >
                  Suas evidências serão carregadas aqui!
                </p>
              </div>
            )}

            <SendButton onClick={handleSubmit}>
              <span
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                }}
              >
                {actionId ? "Atualizar" : "Enviar"} Ação
              </span>
              <img src={send} alt="Icone de envio" />
            </SendButton>
          </SendSection>
        </ActionSection>
      </FormContainer>
    </MainContainer>
  );
}

export default NewAction;
