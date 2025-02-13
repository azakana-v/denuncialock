import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imgEmpresa from "../assets/logoHevi.png";
import imgReportLock from "../pages/Login/logo-branco-info.png";

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  padding: 2rem;
  flex-direction: column;
  align-items: center;

  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(./background-login.png);
  background-repeat: no-repeat;
  background-size: cover;
`;

const MainComponent = styled.div`
  font-family: "Montserrat", sans-serif;
  display: flex;
  filter: drop-shadow(-4px 7px 3px #bf00ff57);
  border-radius: 35px;
  width: 689px;
  height: 429px;
  background-color: #fdfdfd;
  /* padding: 20px; */
  align-items: center;
  justify-content: center;
`;
const FirstSection = styled.div`
  width: 50%;
  padding: 1rem;
  margin-left: 2rem;
`;
const Tittle = styled.h1`
  color: #8600b3;
  font-size: 3.5rem;
  font-weight: 300;
  text-align: center;
`;

const ImgsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  height: 60%;
`;

const ImgsContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  height: 50%;
`;

const LogoEmpresa = styled.img`
  width: 45%;
`;
const LogoReportLock = styled.img`
  width: 35%;
`;

const SecondSection = styled.div`
  background: linear-gradient(
    0deg,
    rgba(21, 4, 66, 1) 0%,
    rgba(190, 0, 255, 1) 100%
  );
  color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 35px;
  border-top-right-radius: 35px;
  border-bottom-left-radius: 70px;
  border-top-left-radius: 70px;
  height: 100%;
  min-width: 50%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1.5rem;
  color: #4e0666;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  /* font-size: 2rem; */
  border-radius: 8px;
  outline: none;
  border-color: #700096a6;
  border-style: solid;

  border: none;
  background-color: #d9d9d9;
  border-radius: 8px;
  height: 38px;
  width: 300px;
  /* margin: 10px 0; */
`;

const Select = styled.select`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  font-size: 1.5rem;
  background-color: purple;
  color: white;
  border: none;
  cursor: pointer;
  transition: all ease 100ms;

  &:hover {
    background-color: #5a0070;
  }

  width: 167px;
  height: 37px;
  background-color: #5b0390;
  color: white;
  border-radius: 10px;
  border: none;
  margin: 0 auto;
`;

const ErrorMsg = styled.p`
  color: red;
`;

export default function NewUser() {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    role: "user",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.senha) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/usuarios`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Conta criada com sucesso!");
      navigate("/");
    } catch (error) {
      setError("Erro ao criar a conta.");
    }
  };

  return (
    <MainContainer>
      <MainComponent>
        <FirstSection>
          <Tittle>Criar Conta</Tittle>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="nome">Nome</Label>
            <Input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Insira seu nome"
            />

            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Insira seu email"
            />

            <Label htmlFor="senha">Senha</Label>
            <Input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Insira sua senha"
            />

            <Button type="submit">Criar</Button>

            {error && <ErrorMsg>{error}</ErrorMsg>}
          </Form>
        </FirstSection>

        <SecondSection>
          <ImgsContainer>
            <LogoEmpresa src={imgEmpresa}></LogoEmpresa>
          </ImgsContainer>
          <ImgsContainer2>
            <LogoReportLock src={imgReportLock}></LogoReportLock>
          </ImgsContainer2>
        </SecondSection>
      </MainComponent>
    </MainContainer>
  );
}
