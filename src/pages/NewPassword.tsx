import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import imgEmpresa from '../assets/logoHevi.png'
import imgReport from '../assets/logo-branco-info.png'



const MainContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    gap: 1rem;
    width: 100vw;
    height: 100vh;
    `
const MainComponent = styled.div`
  font-family: "Montserrat", sans-serif;
  display: flex;
  filter: drop-shadow(0px 0px 12px #bf00ff83);
  border-radius: 35px;
  width: 689px;
  height: 429px;
  background-color: #fdfdfd;
  /* padding: 20px; */
  /* align-items: center; */
  justify-content: center;
  `

  const FirstComponent = styled.div`
  min-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding:1.5rem;
  
  `
  const ContainerImg1 = styled.div`
  display: flex;
 min-height: 55%;
 align-items: end;
 justify-content:center;
  `
  const ContainerImg2 = styled.div`
    display: flex;
 min-height: 45%;
 align-items: end;
 justify-content:center;
  `
  const LogoEmpresa = styled.img`
  width: 40%;
  `
  
  const ReportLockLogo = styled.img`
  width: 40%;
  `

    const SecondComponent = styled.div`
  min-width: 50%;
  background: linear-gradient(
    0deg,
    rgba(21, 4, 66, 1) 0%,
    rgba(190, 0, 255, 1) 100%
  );
  color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  border-bottom-right-radius: 35px;
  border-top-right-radius: 35px;
  border-bottom-left-radius: 70px;
  border-top-left-radius: 70px;
  height: 100%;
  min-width:50%;
    `

const Tittle = styled.h1`
    font-family: "Montserrat", sans-serif;
    color: #5b0390;
    font-weight: 400;
    font-size: 3rem;
    margin-bottom: 20px;
`

const Input = styled.input`
  border: none;
  background-color: #d9d9d9;
  border-radius: 8px;
  height: 40px;
  width: 235px;
  margin: 10px 0;
  /* margin-bottom: 20px; */
  padding: 0.5rem;
`

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`
const Button = styled.button`
  width: 167px;
  height: 37px;
  background-color: #5b0390;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
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
      <MainComponent>

      <FirstComponent>

          <Tittle>Redefinir Senha</Tittle>
          <Form onSubmit={handleSubmit}>
        <Input
            type="password"
            placeholder="Digite sua nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Redefinir senha</Button>
        {message && <p>{message}</p>}
        </Form>
            </FirstComponent>
            <SecondComponent>
            <ContainerImg1>
              <LogoEmpresa src={imgEmpresa}/>
            </ContainerImg1>
            <ContainerImg2>
              <ReportLockLogo src={imgReport}></ReportLockLogo>
            </ContainerImg2>
            </SecondComponent>  
          </MainComponent>
      </MainContainer>
  );
};

export default ResetPassword;
