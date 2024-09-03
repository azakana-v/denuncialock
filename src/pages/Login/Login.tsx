import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from "./logo-branco-info.png"
import "./Login.css";
import axios from 'axios';
import { useUser } from '../../UserContext';

const Login = () => {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:3000";
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loginInvalido, setLoginInvalido] = useState(false);
  const { setLogged, setAdmin, setUserId } = useUser();

  const parseJwt = (token: any) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(atob(base64));
  };


  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/login`, {email, senha});
      const token = response.data.token;

      const decodedToken: { id: string, role: string } = parseJwt(token);

      localStorage.setItem('token', token);
      setUserId(decodedToken.id);
      setLogged(true);

      const isAdmin = decodedToken.role === 'admin';
      setAdmin(isAdmin);
      if (isAdmin) {
        navigate('/home');
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setLoginInvalido(true);
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
                onChange={(e) => setSenha(e.target.value)}
              />

              <button className="login-button" onClick={onLogin}>
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
