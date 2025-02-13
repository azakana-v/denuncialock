import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Styles from "./styles";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo2.svg";
import Report from "../report";
import NewBtn from "../../assets/icons/newBtn.svg";
import comoFunciona from "../../assets/icons/comofunciona.svg";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./scrollbar.css";

function MainAgent() {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const userId = "66c4bb87a93ff03ddc53d5cd";
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports();
  }, []);

  //Adicionar as rota das reports
  const getReports = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/denuncias/usuario/${userId}`
      );
      setReports(response.data);
    } catch (error) {
      console.log("Erro ao buscar denúncias anteriores", error);
    }
  };

  const redirectNewReport = () => {
    navigate("/newReport");
  };
  return (
    <Styles.MainContainer>
      <Styles.Grid>
        <Styles.Reports>
          <Styles.ReportsTitle>
            <Styles.ReportsLogo src={Logo} />
            <Styles.Title>
              Denúncias <br /> pendentes.
            </Styles.Title>
          </Styles.ReportsTitle>
          <PerfectScrollbar style={{ width: "100%", height: "72vh" }}>
            <Styles.ReportList>
              {reports.map((report, index) => (
                <Report key={index} report={report} />
              ))}
            </Styles.ReportList>
          </PerfectScrollbar>
        </Styles.Reports>
        <Styles.Intro>
          <Styles.GhostDiv></Styles.GhostDiv>
          <Styles.SecondGhostDiv>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <Styles.IntroTitle>
                Bem-vindo ao seu canal de denúncias!
              </Styles.IntroTitle>
              <Styles.IntroText>
                Nosso canal de denúncias está disponível para você relatar
                qualquer irregularidade de forma segura e confidencial. Aqui,
                garantimos que sua voz seja ouvida e tratada com o máximo de
                sigilo, em conformidade com as normas éticas e legais.
                Acreditamos na transparência e na melhoria contínua, por isso
                incentivamos a comunicação aberta. Seu relato é fundamental para
                mantermos a integridade e responsabilidade de nossas operações.
                Conte com nosso comprometimento para investigar e resolver os
                casos reportados com seriedade e eficiência.
              </Styles.IntroText>
            </div>
            <Styles.IntroImage src={comoFunciona} />
            <Styles.IntroLogo src={Logo} />
          </Styles.SecondGhostDiv>
        </Styles.Intro>
      </Styles.Grid>
    </Styles.MainContainer>
  );
}

export default MainAgent;
