import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Styles from "./styles";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo2.svg";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./scrollbar.css";
import User from "../../assets/icons/profile.svg"
import { IMember } from "../memberCard/IMember";
import InvestigateActionCard from "../investigateActionCard";

interface MemberCardProps extends IMember {
  selected?: boolean;
}

interface IInvestigateAction {
  date: string,
  title: string,
}

const InvestigateActionXumbada : IInvestigateAction = {
  date: "22/02/2024",
  title: "Ação Exemplo"
}


function InvestigateArea({ member}: MemberCardProps) {
 
  const [investigateAction, setInvestigateAction] = useState<IInvestigateAction[]>([InvestigateActionXumbada, InvestigateActionXumbada, InvestigateActionXumbada, InvestigateActionXumbada, ])

  return (
    <Styles.MainContainer>
      <Styles.AgentContainer>  
        <Styles.ProfileImage alt={`foto do membro ${member.nome}`} src={member.profile ? member.profile : User}/>
        <Styles.InfoContainer>
          <Styles.Name>{member.nome}</Styles.Name>
          <Styles.ReportsAttrContainer>
              <Styles.CircleIcon status={"Em aberto"}></Styles.CircleIcon>
              <Styles.ReportsAttr>{member.reports == 0 ? "" : member.reports} {member.reports == 1 ? "denúncia atribuída" : member.reports == 0 ? "Nenhuma denúncia atribuida" : "denúncias atribuídas" }</Styles.ReportsAttr>
          </Styles.ReportsAttrContainer>
        </Styles.InfoContainer>
      </Styles.AgentContainer>

      <Styles.InvestigateAreaContainer>
        <Styles.InvestigateAreaTittle>Ações investigativas</Styles.InvestigateAreaTittle>
        {investigateAction.map((action, index) => (
                  <InvestigateActionCard investigateActionDate={action.date}  investigateActionTittle={action.title} key={index}/>
                ))}
      </Styles.InvestigateAreaContainer>
    </Styles.MainContainer>
  );
}

export default InvestigateArea;
