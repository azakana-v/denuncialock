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
import { useUser } from "../../UserContext";

function Main() {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const { userId } = useUser();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const { admin, agent } = useUser();

  useEffect(() => {
    getReports();
  }, []);

  //Ajustar para pegar somentes reports atribuidas ao agent, no caso de ser agent
  const getReports = async () => {
    console.log("id do usuário", userId);
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
              Denúncias <br /> {agent ? "pendentes" : "recentes"}.
            </Styles.Title>
          </Styles.ReportsTitle>
          <PerfectScrollbar style={{ width: "100%", height: "72vh" }}>
            <Styles.ReportList>
              {reports && reports.length > 0 ? (
                reports.map((report, index) => (
                  <Report key={index} report={report} />
                ))
              ) : (
                <p
                  style={{
                    fontSize: "2rem",
                    marginTop: "1rem",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Nenhuma denúncia gerada.
                </p>
              )}
            </Styles.ReportList>
          </PerfectScrollbar>
        </Styles.Reports>

        <Styles.Action>
          {agent ? (
            ""
          ) : (
            <>
              <Styles.NewBtn onClick={redirectNewReport} src={NewBtn} />
              <Styles.NewReport>Adicionar Denúncia</Styles.NewReport>
            </>
          )}
        </Styles.Action>

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

export default Main;
