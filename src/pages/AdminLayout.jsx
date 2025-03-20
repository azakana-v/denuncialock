import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TypesImg from "../assets/icons/types.png";
import WarningImg from "../assets/icons/warning.png";
import ReportImg from "../assets/icons/profit-report.png";
const RelatorioNav = styled.div`
  /* align-items: center; */
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  margin-top: 20vh;
  margin-right: 2rem;
  /* width: 100%; */
  display: flex;
  /* align-items: center; */
  justify-content: center;
  width: 100%;
  flex-direction: row;
`;
const RelatorioNavContainer = styled.div`
  /* align-items: center; */
  justify-content: center;
  gap: 2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  /* width: 100%; */
  flex-direction: row;
`;
const WarningIcon = styled.img`
  width: 75%;
  height: 75%;
  min-width: 75%;
  min-height: 75%;
`;
const TypesIcon = styled.img`
  width: 75%;
  height: 75%;
  min-width: 75%;
  min-height: 75%;
`;
const NavButton = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border-radius: 10px;
  background-color: #5b0390;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const NavContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  &:first-child {
    margin-top: 8rem;
  }
`;
const Content = styled.div`
  flex: 1;
  display: flex;

  /* justify-content: center; */
  width: 100%;
`;
const AdminLayout = () => {
  const navigate = useNavigate();
  return (
    <RelatorioNav>
      <RelatorioNavContainer>
        <NavContainer>
          <NavButton onClick={() => navigate("/AdminDashboard/Relatorio")}>
            <WarningIcon src={WarningImg} />
          </NavButton>
          <NavButton onClick={() => navigate("/AdminDashboard/TiposDenuncia")}>
            <TypesIcon src={TypesImg} />
          </NavButton>
          <NavButton onClick={() => navigate("/AdminDashboard/RiscoDenuncia")}>
            <TypesIcon src={ReportImg} />
          </NavButton>
        </NavContainer>
        <Content>
          {/* Aqui as rotas filhas serão renderizadas */}
          <Outlet />
        </Content>
      </RelatorioNavContainer>
    </RelatorioNav>
  );
};

export default AdminLayout;
