import SideBtn from "../sideButton";
import * as Styles from "./styles";
// @ts-ignore
import profile from "../../assets/icons/profile.svg";
import report from "../../assets/icons/report.svg";
import play from "../../assets/icons/play.png";
import customer from "../../assets/icons/customer-support.svg";
import question from "../../assets/icons/question.svg";
import user from "../../assets/icons/user2.svg";
import calculator from "../../assets/icons/calculator.png";

import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import styled from "styled-components";

function Sidebar() {
  const { logged, setLogged, admin } = useUser();
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/home");
  };
  return (
    <>
      {logged ? (
        <Styles.SideContainer>
          <div>
            <SideBtn
              onClick={() => {
                navigate("/Profile");
              }}
              icon={profile}
              toolTip="Perfil"
            />
            <SideBtn
              icon={report}
              toolTip="Denúncia"
              onClick={handleRedirect}
            />
            <SideBtn
              icon={play}
              toolTip="Treinamento"
              onClick={() => {
                navigate("/Treinamento");
              }}
            />
            <SideBtn
              icon={calculator}
              toolTip="Relatórios"
              onClick={() => {
                navigate("/RelatorioPage");
              }}
            />
            {/* <SideBtn icon={customer} toolTip='Suporte'/> */}
            {/* {admin ? <SideBtn icon={user} toolTip='Membros'/> : ""} */}
          </div>
          {/* <Gabriel>escorpuxas</Gabriel> */}
          <div>
            <Styles.GhostDiv />
            {/* <SideBtn icon={question} toolTip='Ajuda'/> */}
          </div>
        </Styles.SideContainer>
      ) : (
        ""
      )}
    </>
  );
}

export default Sidebar;
