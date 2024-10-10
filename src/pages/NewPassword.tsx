import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    gap: 1rem;
`

const ResetPassword = () => {
  const baseUrl = "http://localhost:3000";
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await axios.post(`${baseUrl}/resetPassword/${token}`, { password });
      setMessage('Senha redefinida com sucesso');
    } catch (error) {
      setMessage('Erro ao redefinir a senha');
    }
  };

  return (
    <MainContainer>
        <h1>Nova Senha</h1>
        <form onSubmit={handleSubmit}>
        <input
            type="password"
            placeholder="Digite sua nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Redefinir senha</button>
        {message && <p>{message}</p>}
        </form>
    </MainContainer>
  );
};

export default ResetPassword;
