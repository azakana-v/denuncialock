import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    gap: 1rem;
`

const ForgotPassword = () => {
  const baseUrl = "http://localhost:3000";
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
        await axios.post(`${baseUrl}/forgotPassword`, { email });
      setMessage('Link de redefinição enviado para o seu email');
    } catch (error) {
      setMessage('Erro ao enviar o link');
    }
  };

  return (
    <MainContainer>
        <h1>Redefinir Senha</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button type="submit">Enviar link de redefinição</button>
      {message && <p>{message}</p>}
    </form>
    </MainContainer>
  );
};

export default ForgotPassword;
