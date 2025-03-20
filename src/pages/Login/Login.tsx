import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "./logo-branco-info.png";
import axios from "axios";
import { useUser } from "../../UserContext";
import imgEmpresa from "../../assets/logo-branco-info.png";

// Styled Components
const LoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: url(./background-login.png);
  background-repeat: no-repeat;
  background-size: cover; */
`;

const MainLoginComponent = styled.div`
  font-family: "Montserrat", sans-serif;
  display: flex;
  filter: drop-shadow(-4px 7px 3px #bf00ff57);
  border-radius: 35px;
  width: 689px;
  height: 429px;
  background-color: #fdfdfd;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
    margin: 0 10px;
  }
`;

const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 50%;
  min-height: 100%;
`;

const MainLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormInput = styled.input`
  border: none;
  background-color: #d9d9d9;
  border-radius: 8px;
  height: 30px;
  width: 235px;
  margin: 10px 0;
  padding: 0 10px;
`;

const SignIn = styled.p`
  color: #5b0390;
  font-size: 28px;
  font-weight: 500;
`;

const LoginButton = styled.button`
  width: 167px;
  height: 37px;
  background-color: #5b0390;
  color: white;
  border-radius: 10px;
  border: none;
  margin: 5px 0;

  &:hover {
    cursor: pointer;
  }
`;

const ContractSection = styled.div`
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

  @media screen and (max-width: 768px) {
    border-top-right-radius: 35px;
    border-top-left-radius: 35px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`;

const ContractSectionMainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 35px;
  border-top-right-radius: 35px;
  border-bottom-left-radius: 70px;
  border-top-left-radius: 70px;
  height: 100%;
`;

const LogoEmpresa = styled.img`
  width: 45%;
`;

const LogoInfo = styled.img`
  width: 40%;
`;

const LinkStyle = styled.a`
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-decoration: none;
  color: #5b0390;

  &:hover {
    text-decoration: underline;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Divider = styled.p`
  margin: 5px 0;
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  color: #5b0390;
  margin-top: 0;
  font-size: 20px;
  text-align: center;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`;

const ModalButton: any = styled.button`
  width: 48%;
  height: 37px;
  background-color: ${(props: any) => (props.primary ? "#5b0390" : "#d9d9d9")};
  color: ${(props: any) => (props.primary ? "white" : "#333")};
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

const GlobalStyle = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;500;700&display=swap");
`;

const Login = () => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loginInvalido, setLoginInvalido] = useState(false);
  const { setLogged, setAdmin, setUserId } = useUser();

  // Estado para controlar o modal
  const [showModal, setShowModal] = useState(false);
  const [protocolo, setProtocolo] = useState("");

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

  const handleVerificarDenuncia = async (event: FormEvent) => {
    event.preventDefault();
    // Aqui você implementaria a lógica para verificar o protocolo da denúncia
    navigate(`/verificar/${protocolo}`);
  };

  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        <MainLoginComponent>
          <LoginSection>
            <SignIn>Sign in</SignIn>
            <MainLoginForm onSubmit={onLogin}>
              <label htmlFor="email-address"></label>
              <FormInput
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password"></label>
              <FormInput
                id="password"
                name="password"
                type="password"
                required
                placeholder="Senha"
                onChange={(e) => setSenha(e.target.value)}
              />
              <LoginButton type="submit">Entrar</LoginButton>
            </MainLoginForm>
            <LinkStyle href="/forgotPassword">Esqueceu sua senha?</LinkStyle>
            <Divider>ou</Divider>
            <ButtonsContainer>
              <LoginButton onClick={() => navigate("/userlessReport")}>
                Gerar denúncia
              </LoginButton>
              <LoginButton onClick={() => setShowModal(true)}>
                Verificar denúncia
              </LoginButton>
            </ButtonsContainer>
            {loginInvalido && <p>Login Inválido!</p>}
          </LoginSection>
          <ContractSection>
            <ContractSectionMainContent>
              <LogoEmpresa src={imgEmpresa} alt="Logo da Empresa" />
            </ContractSectionMainContent>
            <LogoInfo src={logo} alt="Logo Info" />
          </ContractSection>
        </MainLoginComponent>

        {/* Modal de Verificação de Denúncia */}
        {showModal && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>Verificar Denúncia</ModalTitle>
              <ModalForm onSubmit={handleVerificarDenuncia}>
                <FormInput
                  type="text"
                  placeholder="Digite o protocolo da denúncia"
                  value={protocolo}
                  onChange={(e) => setProtocolo(e.target.value)}
                  required
                />
                <ModalButtons>
                  <ModalButton
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </ModalButton>
                  <ModalButton type="submit" primary>
                    Verificar
                  </ModalButton>
                </ModalButtons>
              </ModalForm>
            </ModalContent>
          </ModalOverlay>
        )}
      </LoginContainer>
    </>
  );
};

export default Login;
