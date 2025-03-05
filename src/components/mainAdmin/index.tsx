import { useState, useEffect } from "react";
import axios from "axios";
import * as Styles from "./styles";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo2.svg";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./scrollbar.css";
import MemberCard from "../memberCard";
import ReportAdmin from "../reportAdmin";

function MainAdmin() {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getReports();
    getMembers();
  }, []);

  const getReports = async () => {
    try {
      const response = await axios.get(`${baseUrl}/denuncias`);
      setReports(response.data);
    } catch (error) {
      console.log("Erro ao buscar denúncias anteriores", error);
    }
  };

  const getMembers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/agentes`);
      console.log(response.data);

      setMembers(response.data);
    } catch (error) {
      console.log("Erro ao buscar denúncias anteriores", error);
    }
  };
  const createReport = async () => {
    try {
    } catch (error) {
      console.log("Erro ao gerar denúncia", error);
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
              Denúncias <br /> recentes.
            </Styles.Title>
            <Styles.Title>
              Denúncias <br /> recentes.
            </Styles.Title>
          </Styles.ReportsTitle>
          <PerfectScrollbar style={{ width: "100%", height: "72vh" }}>
            <Styles.ReportList>
              {reports.map((report, index) => {
                console.log(report);

                return <ReportAdmin key={index} report={report} />;
              })}
            </Styles.ReportList>
          </PerfectScrollbar>
        </Styles.Reports>

        <Styles.MembersContainer>
          <Styles.MembersTittleContainer>
            <Styles.MembersLogo src={Logo} />
            <Styles.MembersTittle>Membros</Styles.MembersTittle>
          </Styles.MembersTittleContainer>
          <Styles.MembersContent>
            <PerfectScrollbar style={{ width: "100%", height: "72vh" }}>
              {members.map((member, index) => (
                <MemberCard member={member} key={index} />
              ))}
            </PerfectScrollbar>
          </Styles.MembersContent>
        </Styles.MembersContainer>
      </Styles.Grid>
    </Styles.MainContainer>
  );
}

export default MainAdmin;
