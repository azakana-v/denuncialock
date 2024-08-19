import styled from "styled-components";
import logo from "../assets/Logo2.svg";
import React, { useState } from "react";
import FileUpload from "../components/fileUpload/FileUpload";
import icon from "../assets/icons/multiply 1.svg";

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
  font-size: 1.3rem;
  width: 50%;
  height: 2rem;
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
  font-size: 1.3rem;
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

function NewReport() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

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
  return (
    <MainContainer>
      <Title>
        <TitleLogo src={logo} />
        <TitleText>Formulário de Denúncia</TitleText>
      </Title>
      <FormContainer>
        <FormStyle>
          <LabelForm>Descrição da Denúncia</LabelForm>
          <TitleInput
            type="text"
            placeholder="Título da denúncia*"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormStyle>
        <ReportDescription
          placeholder="Conteúdo da denúncia*"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <ActionSection>
          <SendSection>
            <FileUpload onFileChange={handleFileChange} />
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
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
          <SendSection></SendSection>
        </ActionSection>
      </FormContainer>
    </MainContainer>
  );
}

export default NewReport;
