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
  member: {
    _id?: string,
    nome: string,
    reports: number;
    profile: string
  }
  actions?: IInvestigateAction[];
  getActionIndex: (actionIndex: number)=> void;
}

interface IInvestigateAction {
  _id: string,
  titulo: string,
  descricao: string,
  usuarioId: string,
  evidencias: string[],
  status: string,
  autor: string,
  agente: string,
  createdAt: string,
  updatedAt?: string
}


function InvestigateArea({ member, actions, getActionIndex}: MemberCardProps) {
  const baseUrl = "http://localhost:3000";
  const reportCount = member.reports;
  // const [actions, setActions] = useState<IInvestigateAction[]>()
  const [actionIndex, setActionIndex] = useState<number>(0)
  const navigate = useNavigate();
  console.log(member);
  
  
  // const getAgentActions = async () =>{
  //   try {
  //     const response = await axios.get(`${baseUrl}/agentes/${member._id}/actions`);
  //     console.log('Sucesso ao obter Ações: ', response.data);
  //     setActions(response.data)
  //   } catch (error) {
  //     console.error('Erro ao obter ações', error);
  //   }
  // };

  useEffect(() => {
    
console.log(actions);

  }, [actions])
  
  // useEffect(() => {
    
  //   getAgentActions()
    
  //     }, [])

     const redirectAction = () =>{
      console.log(actionIndex);
      navigate(`action/${actions ? actions[actionIndex]._id : ""}`)
      
      }

      console.log("bola123", actions);
      

  return (
    <Styles.MainContainer>
      <Styles.AgentContainer>  
        <Styles.ProfileImage alt={`foto do membro ${member.nome}`} src={member.profile ? member.profile : User}/>
        <Styles.InfoContainer>
          <Styles.Name>{member.nome}</Styles.Name>
        </Styles.InfoContainer>
      </Styles.AgentContainer>

      <Styles.InvestigateAreaContainer>
        <Styles.InvestigateAreaTittle>Ações investigativas</Styles.InvestigateAreaTittle>
        {actions?.map((action: IInvestigateAction, index: number) => (
                  <InvestigateActionCard onClick={()=>{getActionIndex(index); redirectAction()}} investigateActionDate={action?.createdAt}  investigateActionTittle={action?.titulo} key={index}/>
                ))}
      </Styles.InvestigateAreaContainer>
    </Styles.MainContainer>
  );
}

export default InvestigateArea;
