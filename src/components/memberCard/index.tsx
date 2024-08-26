import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Styles from "./styles";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo2.svg";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./scrollbar.css";
import User from "../../assets/icons/profile.svg"
import { IMember } from "./IMember";

interface AgentCardProps{
  selected?: boolean,
  member: {
    _id: string,
    nome: string,
    reports: string[],
    profile: string
  }
}

function MemberCard({ member, selected }: AgentCardProps) {
 const reportCount = member.reports.length;
  return (
    <Styles.MainContainer style={{ cursor: "pointer", borderRadius: "10px", border: selected === true ? "2px solid purple" : "" }}>
      <Styles.ProfileImage alt={`foto do membro ${member.nome}`} src={member.profile ? member.profile : User}/>

      <Styles.InfoContainer>
        <Styles.Name>{member.nome}</Styles.Name>
        <Styles.ReportsAttrContainer>
            <Styles.CircleIcon status={"Em aberto"}></Styles.CircleIcon>
            <Styles.ReportsAttr>{reportCount == 0 ? "" : reportCount} {reportCount == 1 ? "denúncia atribuída" : reportCount == 0 ? "Nenhuma denúncia atribuida" : "denúncias atribuídas" }</Styles.ReportsAttr>
        </Styles.ReportsAttrContainer>
      </Styles.InfoContainer>

    </Styles.MainContainer>
  );
}

export default MemberCard;
