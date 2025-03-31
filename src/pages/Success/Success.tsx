import React from "react";
import styled from "styled-components";

// Import fonts in the component
const GlobalStyle = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;500;700&display=swap");
`;

const SuccessContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Background can be uncommented and adjusted when you have the image
  background: url(./background-login.png);
  background-repeat: no-repeat;
  background-size: cover; */
`;

const MainSuccessComponent = styled.div`
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  color: #5b0390;
  filter: drop-shadow(-4px 7px 3px #bf00ff57);
  border-radius: 35px;
  width: 689px;
  height: 429px;
  background-color: #fdfdfd;
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

const Input = styled.input`
  border: none;
  background-color: #d9d9d9;
  border-radius: 8px;
  height: 30px;
  width: 235px;
  margin: 10px 0;
`;

const SignIn = styled.h2`
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
  cursor: pointer;
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

const Salute = styled.h2`
  font-size: 28px;
  font-weight: 500;
  margin: 0;
`;

const SaluteInfo = styled.p`
  font-weight: 300;
  text-align: center;
`;

const ContractButtons = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContractButton = styled.button`
  width: 167px;
  height: 37px;
  background-color: #5b0390;
  color: white;
  border-radius: 10px;
  border: 1px solid white;
  margin: 10px 0;
  cursor: pointer;
`;

const TestButton = styled(ContractButton)`
  background-color: white;
  color: #5b0390;
`;

const ContractImage = styled.img`
  width: 40%;
`;

// Fixed the responsive layout for the main component
const MainLoginComponent = styled.div`
  display: flex;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
    margin: 0 10px;
  }
`;

const SuccessComponent = () => {
  return (
    <GlobalStyle>
      <SuccessContainer>
        <MainSuccessComponent>
          {/* Your success content here */}
        </MainSuccessComponent>
      </SuccessContainer>
    </GlobalStyle>
  );
};

// Also including the login component since it was in the original CSS
const LoginComponent = () => {
  return (
    <GlobalStyle>
      <SuccessContainer>
        <MainLoginComponent>
          <LoginSection>
            <SignIn>Sign In</SignIn>
            <MainLoginForm>
              <Input type="text" placeholder="Username" />
              <Input type="password" placeholder="Password" />
              <LoginButton>Login</LoginButton>
            </MainLoginForm>
          </LoginSection>

          <ContractSection>
            <ContractSectionMainContent>
              <ContractImage src="path-to-your-image.png" alt="Logo" />
              <Salute>Welcome Back!</Salute>
              <SaluteInfo>Sign in to continue to your account</SaluteInfo>
              <ContractButtons>
                <ContractButton>Sign Up</ContractButton>
                <TestButton>Test It</TestButton>
              </ContractButtons>
            </ContractSectionMainContent>
          </ContractSection>
        </MainLoginComponent>
      </SuccessContainer>
    </GlobalStyle>
  );
};

export default SuccessComponent;
export { LoginComponent };
