import React from "react";
import styled from "styled-components";
import image from "../../assets/icons/Group 3.svg";

interface NewReportProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadContainer = styled.div`
  text-align: center;
  margin: 20px;
  width: 300px;
  height: 167px;
  color: #5b0390;
  font-size: 1.9rem;
  font-weight: bold;
`;

const CustomFileUpload = styled.label`
  display: inline-block;
  padding: 3rem 4rem;
  cursor: pointer;
  background-color: #fff;
  color: white;
  border-radius: 5px;
  border: 2px solid #5b0390;
  font-family: Arial, sans-serif;
  font-size: 16px;
`;

const UploadIcon = styled.img`
  display: block;
  margin: 0 auto 10px;
  width: 114.76px;
  height: 55px;
`;

const FileInput = styled.input`
  display: none;
`;

const Title = styled.span`
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
`;

const FileUpload = ({ onFileChange }: NewReportProps) => {
  return (
    <UploadContainer>
      Anexar Evidências
      <CustomFileUpload htmlFor="file-upload">
        <UploadIcon src={image} alt="Ícone de Anexar" />
        <div
          style={{
            background: "#5B0390",
            width: "171px",
            height: "31px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "1.5rem",
          }}
        >
          <Title>Anexe Aqui</Title>
        </div>
      </CustomFileUpload>
      <FileInput
        id="file-upload"
        type="file"
        multiple
        onChange={onFileChange}
      />
    </UploadContainer>
  );
};

export default FileUpload;
