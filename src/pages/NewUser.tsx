import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Select = styled.select`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: purple;
  color: white;
  border: none;
  cursor: pointer;
  transition: all ease 100ms;

  &:hover {
    background-color: #E0BDE9 ;
  }
`;

const ErrorMsg = styled.p`
  color: red;
`;

export default function NewUser() {
  const baseUrl = "http://localhost:3000";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    role: 'user',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.senha) {
      setError('Preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/usuarios`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Conta criada com sucesso!');
      navigate('/');
      
    } catch (error) {
      setError('Erro ao criar a conta.');
    }
  };

  return (
    <MainContainer>
      <h1>Página de Cadastro</h1>
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

        <Label htmlFor="role">Role</Label>
        <Select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin" disabled>Admin</option>
          <option value="agent" disabled>Agent</option>
        </Select>

        <Button type="submit">Criar Conta</Button>
        <span onClick={()=> navigate('/')} style={{ margin: '1rem auto', color: 'purple', cursor: 'pointer' }}>voltar à tela inicial</span>

        {error && <ErrorMsg>{error}</ErrorMsg>}
      </Form>
    </MainContainer>
  );
}
