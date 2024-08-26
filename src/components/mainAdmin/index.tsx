import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Styles from "./styles";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo2.svg";
import NewBtn from "../../assets/icons/newBtn.svg";
import comoFunciona from "../../assets/icons/comofunciona.svg";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./scrollbar.css";
import MemberCard from "../memberCard";
import {IMember} from "../memberCard/IMember"
import ReportAdmin from "../reportAdmin";

let membrosXumbados = [{
  member: {
    nome: "João Silva",
    reports: 5,
    profile: "https://i.pinimg.com/originals/24/16/a5/2416a57ec634dfebcfcc3cf6fad1bc7d.jpg",
  }
},
{
  member: {
    nome: "Cleber Costa",
    reports: 1,
    profile: "https://odia.ig.com.br/_midias/jpg/2022/01/25/rodrigo_2-24122582.jpeg",
  },
},
{
  member: {
    nome: "Antonio Fagundes",
    reports: 0,
    profile: "https://media.licdn.com/dms/image/C4E03AQGF5aKSpEsuzw/profile-displayphoto-shrink_800_800/0/1626398366369?e=2147483647&v=beta&t=GHvlAlFGOa---kpeLJ5tja2HrLXTclqOiF_PBrtrLcA",
  },
},
{
  member: {
    nome: "Rosana Meire",
    reports: 5,
    profile: "https://th.bing.com/th/id/OIP.nPzEKJFfbv8fL_7pYv89oQAAAA?rs=1&pid=ImgDetMain",
  },
}
]

function MainAdmin() {
  const baseUrl = "http://localhost:3000";
  const userId = "66c4bb87a93ff03ddc53d5cd";
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [members, setMembers] = useState<IMember[]>(membrosXumbados);

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/denuncias`
      );
      console.log(response.data);
      
      setReports(response.data);
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
            <Styles.Title>Denúncias <br /> recentes.</Styles.Title>
          </Styles.ReportsTitle>
          <PerfectScrollbar style={{ width: "100%", height: "72vh" }}>
            <Styles.ReportList>
              {reports.map((report, index) => (
                <ReportAdmin key={index} report={report} />
              ))}
            </Styles.ReportList>
          </PerfectScrollbar>
        </Styles.Reports>

        <Styles.MembersContainer>
              <Styles.MembersTittleContainer>
                <Styles.MembersLogo  src={Logo}/>
              <Styles.MembersTittle>
                Membros
              </Styles.MembersTittle>
              </Styles.MembersTittleContainer>
              <Styles.MembersContent>
              <PerfectScrollbar style={{width: "100%", height: "72vh" }}>
              {members.map((member, index) => (
                  
                  <MemberCard member={member.member} key={index} />
              ))}
              </PerfectScrollbar>
              </Styles.MembersContent>
        </Styles.MembersContainer>
      </Styles.Grid>
    </Styles.MainContainer>
  );
}

export default MainAdmin;
