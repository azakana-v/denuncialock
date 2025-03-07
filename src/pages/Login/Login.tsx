import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "./logo-branco-info.png";
import "./Login.css";
import axios from "axios";
import { useUser } from "../../UserContext";
import imgEmpresa from "../../assets/logoHevi.png";

const LogoEmpresa = styled.img`
  width: 45%;
`;

const Login = () => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loginInvalido, setLoginInvalido] = useState(false);
  const { setLogged, setAdmin, setUserId } = useUser();

  const parseJwt = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(atob(base64));
  };

  // Verifica se já existe um token salvo no localStorage para redirecionar o usuário
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: { id: string; role: string } = parseJwt(token);
      setUserId(decodedToken.id);
      setLogged(true);
      const isAdmin = decodedToken.role === "admin";
      setAdmin(isAdmin);
      navigate("/home");
    }
  }, [navigate, setLogged, setUserId, setAdmin]);

  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/login`, { email, senha });
      const token = response.data.token;
      const decodedToken: { id: string; role: string } = parseJwt(token);

      // Armazena o token no localStorage
      localStorage.setItem("token", token);
      setUserId(decodedToken.id);
      setLogged(true);

      const isAdmin = decodedToken.role === "admin";
      setAdmin(isAdmin);

      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setLoginInvalido(true);
    }
  };

  return (
    <div className="login-container">
      <div className="main-login-component">
        <div className="login-section">
          <p className="sign-in">Sign in</p>
          <form className="main-login-form" onSubmit={onLogin}>
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
            <button className="login-button" type="submit">
              Entrar
            </button>
          </form>
          <a
            href="/forgotPassword"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            Esqueceu sua senha ?
          </a>
          <p>ou</p>
          <a
            href="/userlessReport"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            Gerar denúncia sem credencial
          </a>
          {loginInvalido && <p>Login Inválido!</p>}
        </div>
        <div className="contract-section">
          <div className="cantract-section-main-content">
            <LogoEmpresa src={imgEmpresa} alt="Logo da Empresa" />
          </div>
          <img src={logo} alt="Logo Info" />
        </div>
      </div>
    </div>
  );
};

export default Login;
