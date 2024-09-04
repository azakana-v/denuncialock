import axios from "axios";
import styled from "styled-components";
import logo from "../assets/Logo2.svg";
import React, { useState } from "react";
import FileUpload from "../components/fileUpload/FileUpload";
import icon from "../assets/icons/multiply 1.svg";
import send from "../assets/icons/send-message 1.svg";
import { useNavigate, useParams } from "react-router-dom";

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
  border: 2px solid #5B0390;
  color: #fff;
  background: #5B0390;
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
  color: #5B0390; 
  font-weight: bold;
`;

const Switch = styled.div<SwitchProps>`
  position: relative;
  width: 50px;
  height: 25px;
  background-color: ${({ isChecked }) => (isChecked ? '#5B0390' : '#ccc')};
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const SwitchButton = styled.div<SwitchProps>`
  position: absolute;
  top: 2.5px;
  left: ${({ isChecked }) => (isChecked ? '25px' : '2.5px')};
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
   
`
const Card = styled.div`
     width: 80px;
    height: 80px;
    background-color: #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    position: relative;
`

function NewAction() {
  const baseUrl = "http://localhost:3000";
  const userId = '66c4bb87a93ff03ddc53d5cd';
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { reportId, agentId } = useParams<{ reportId: string; agentId: any }>();
  const [files, setFiles] = useState<File[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setFiles([]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('titulo', title);
    formData.append('descricao', description);
    formData.append('agenteId', agentId);

    files.forEach(file => {
        formData.append('files', file);
    });

    try {
        const response = await axios.post(`${baseUrl}/denuncias/${reportId}/actions`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        navigate('/');
    } catch (error) {
        console.log('Erro ao enviar denúncia: ', error);
    }
}
  return (
    <MainContainer>
      <Title>
        <TitleLogo src={logo} />
        <TitleText>Adicionar Action</TitleText>
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
            <div className="ghostDiv" style={{ background: '#2C088D', height: '70%', width: '0.2rem'}}></div>
            <img src={logo} style={{ width: '4rem', height: '4rem' }} />
          </DividerSection>
          <SendSection>
          <SwitchContainer>
      {/* <SwitchLabel>Permanecer Anônimo?</SwitchLabel>
      <Switch onClick={toggleSwitch} isChecked={isChecked}>
        <SwitchButton isChecked={isChecked} />
      </Switch> */}
    </SwitchContainer>
    {files.length > 0 ? (
              <Cards>
                {files.map((file, index) => (
                  <Card key={index}>{file.name}</Card>
                ))}
              </Cards>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <p style={{ color: "#5B0390", fontSize: "1.8rem", fontWeight: "bold" }}>
                Suas evidências serão carregadas aqui!
              </p>
              </div>
            )}
             <SendButton 
             onClick={handleSubmit} 
             >
              <span
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                }}
              >
                Enviar Ação
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
