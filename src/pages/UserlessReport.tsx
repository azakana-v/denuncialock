import axios from "axios";
import styled from "styled-components";
import logo from "../assets/Logo2.svg";
import React, { useState } from "react";
import FileUpload from "../components/fileUpload/FileUpload";
import send from "../assets/icons/send-message 1.svg";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icons/multiply 1.svg";
import SuccessModal from "../components/SuccessModal";

interface SwitchProps {
  isChecked: boolean;
}

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

const FieldContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TipoSelect = styled.select`
  color: #5b0390;
  font-size: 1.5rem;
  width: 50%;
  height: 3rem;
  border: 2px solid #5b0390;
  outline: none;
  border-radius: 0.6rem;
  margin-bottom: 1rem;
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

const SwitchLabel = styled.label`
  font-size: 16px;
  color: #5b0390;
  font-weight: bold;
`;

const Switch = styled.div<SwitchProps>`
  position: relative;
  width: 50px;
  height: 25px;
  background-color: ${({ isChecked }) => (isChecked ? "#5B0390" : "#ccc")};
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const SwitchButton = styled.div<SwitchProps>`
  position: absolute;
  top: 2.5px;
  left: ${({ isChecked }) => (isChecked ? "25px" : "2.5px")};
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  transition: left 0.3s ease;
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

// Componente para o card com hover para mostrar a lixeira
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

// Styled component para a lixeira utilizando emoji
const TrashIcon = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

function UserlessReport() {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const userId = "67d83d2aa27252c882ab5d34";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [tipo, setTipo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [reportId, setReportId] = useState("");

  const navigate = useNavigate();

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
      // Reseta o valor do input para permitir a re-seleção dos mesmos arquivos
      event.target.value = "";
    }
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setTipo("");
    setFiles([]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("titulo", title);
    formData.append("descricao", description);
    formData.append("tipoDenuncia", tipo);
    formData.append("usuarioId", userId);

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(`${baseUrl}/denuncias`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      // Armazenar o ID do relatório para mostrar na modal
      setReportId(response.data._id);

      // Mostrar a modal
      setShowModal(true);

      // Não redirecionar automaticamente, deixar o usuário ver a modal primeiro
    } catch (error) {
      console.log("Erro ao enviar denúncia: ", error);
    }
  };

  const formatString = (stringToFormat: string): string => {
    if (!stringToFormat) return "-";
    return stringToFormat.length > 12
      ? stringToFormat.substring(0, 12) + "..."
      : stringToFormat;
  };

  // Função para remover o arquivo da lista
  const handleDeleteFile = (indexToDelete: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToDelete)
    );
  };

  // Função para fechar a modal e navegar para a home
  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/home");
  };

  return (
    <MainContainer>
      <Title>
        <TitleLogo src={logo} alt="Logo" />
        <TitleText>Formulário de Denúncia</TitleText>
      </Title>
      <FormContainer>
        <FormStyle onSubmit={handleSubmit}>
          <LabelForm>Título</LabelForm>
          <TitleInput
            type="text"
            placeholder="Título da denúncia*"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormStyle>
        <FieldContainer>
          <LabelForm>Tipo de Denúncia</LabelForm>
          <TipoSelect
            value={tipo}
            onChange={(e) => {
              setTipo(e.target.value);
              console.log(e.target.value);
            }}
            required
          >
            <option value="" disabled>
              Selecione o tipo*
            </option>
            <option value="assedio-moral">Assédio Moral</option>
            <option value="assedio-sexual">Assédio Sexual</option>
            <option value="discriminacao">
              Discriminação (raça, gênero, orientação sexual, deficiência, etc.)
            </option>
            <option value="corrupcao-suborno">Corrupção e Suborno</option>
            <option value="fraude-financeira">Fraude Financeira</option>
            <option value="desvio-recursos">Desvio de Recursos</option>
            <option value="abuso-autoridade">Abuso de Autoridade</option>
            <option value="conflito-interesses">Conflito de Interesses</option>
            <option value="falsificacao-documentos">
              Falsificação de Documentos
            </option>
            <option value="violacao-politicas">
              Violação de Políticas Internas
            </option>
            <option value="vazamento-informacoes">
              Vazamento de Informações Confidenciais
            </option>
            <option value="nepotismo">Nepotismo</option>
            <option value="trabalho-infantil">
              Trabalho Infantil ou Análogo à Escravidão
            </option>
            <option value="conduta-anti-etica">
              Conduta Antiética ou Imoral
            </option>
            <option value="descumprimento-regulamentacoes">
              Descumprimento de Regulamentações
            </option>
            <option value="sabotagem">Sabotagem ou Vandalismo</option>
            <option value="uso-indevido-recursos">
              Uso Indevido de Recursos da Empresa
            </option>
            <option value="falta-seguranca">
              Falta de Segurança no Trabalho
            </option>
            <option value="coacao-intimidacao">Coação ou Intimidação</option>
            <option value="maus-tratos">
              Maus-tratos e Violência Física ou Psicológica
            </option>
          </TipoSelect>
        </FieldContainer>
        <ReportDescription
          placeholder="Conteúdo da denúncia*"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
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
              <span style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                Enviar Denúncia
              </span>
              <img src={send} alt="Ícone de envio" />
            </SendButton>
          </SendSection>
        </ActionSection>
      </FormContainer>

      {/* Modal de sucesso com número de protocolo */}
      <SuccessModal
        isOpen={showModal}
        onClose={handleCloseModal}
        reportId={reportId}
      />
    </MainContainer>
  );
}

export default UserlessReport;
