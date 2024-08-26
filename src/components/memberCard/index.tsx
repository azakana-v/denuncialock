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

interface MemberCardProps extends IMember {
  selected?: boolean;
}

function MemberCard({ member, selected }: MemberCardProps) {
 
  return (
    <Styles.MainContainer style={{cursor: "pointer", borderRadius: "10px", border: selected == true ? "2px solid purple" : ""}}>
      <Styles.ProfileImage alt={`foto do membro ${member.nome}`} src={member.profile ? member.profile : User}/>

      <Styles.InfoContainer>
        <Styles.Name>{member.nome}</Styles.Name>
        <Styles.ReportsAttrContainer>
            <Styles.CircleIcon status={"Em aberto"}></Styles.CircleIcon>
            <Styles.ReportsAttr>{member.reports == 0 ? "" : member.reports} {member.reports == 1 ? "denúncia atribuída" : member.reports == 0 ? "Nenhuma denúncia atribuida" : "denúncias atribuídas" }</Styles.ReportsAttr>
        </Styles.ReportsAttrContainer>
      </Styles.InfoContainer>

    </Styles.MainContainer>
  );
}

export default MemberCard;
