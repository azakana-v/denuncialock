import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from "./logo-branco-info.png"
import "./Login.css";


const Container = styled.div``;
const Form = styled.form``;

const Label = styled.label``;

const Input = styled.input``;

const Botao = styled.button``;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInvalido, setLoginInvalido] = useState(false);


  const onLogin = async (e: any) => {
    e.preventDefault();
    try {
    //   await signIn(email, password);
      navigate('/home');
      // O login foi bem-sucedido, você pode redirecionar o usuário ou realizar outras ações necessárias.
    } catch (error) {

      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="main-login-component">
          <div className="login-section">
            <p className="sign-in">Sign in</p>
            <form className="main-login-form">
              <label htmlFor="email-address"></label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password"></label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="login-button" onClick={()=>{}}>
                Entrar
              </button>
            </form>
            <a href="">Esqueceu sua senha ?</a>
            {loginInvalido && <p>Login Inválido!</p>}
          </div>
          <div className="contract-section">
            <div className="cantract-section-main-content">
              <p className="salute">Olá, RH!</p>
              <p className="salute-info">
                Contrate agora para acessar todas as funcionalidades do gerador!
              </p>
              <div className="contract-buttons">
                <button className="contract-button">Contrate</button>
                <button className="test-button">Testar</button>
              </div>
            </div>
            <img src={logo} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
