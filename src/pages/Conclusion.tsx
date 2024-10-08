import Details from '../components/details'
import styled from "styled-components";
import TimeLine from "../components/timeLine";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IReportDetailsProps } from '../components/details/IReportDetailsProps';
import { useUser } from '../UserContext';
import InvestigateArea from '../components/investigateArea';
import DetailsAction from '../components/detailsAction';
import ConclusionDetails from '../components/detailsConclusion';
import { IConclusionDetailsProps } from '../components/detailsConclusion/IConclusionDetailsProps';

interface DivisorProps {
    admin?: boolean; // Prop opcional 'admin' que é um booleano
  }
interface IReportProps {
    action?: boolean; // Prop opcional 'admin' que é um booleano
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
  

const MainContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 8rem 6rem;
    `
const Divisor = styled.div<DivisorProps>`
min-height: 100%;
min-width: 3px;
max-width: 3px;
background-color:#5B0390;
flex: 1; 
margin: 0 10%;
margin-left: ${(props) => (props.admin ? '2%' : '10%')};

`


function Conclusion({action}: IReportProps){
    const { admin, agent} = useUser();
    const baseUrl = "http://localhost:3000";
    const {userId} = useUser();
    const { reportId, actionId, conclusionId } = useParams<{ reportId: string; actionId?: string; conclusionId: string }>();
    const [conclusion, setConclusion] = useState<IConclusionDetailsProps>();
    const [actions, setActions] = useState<IInvestigateAction[]>()
    const [agentId, setAgentId] = useState<string>("")
    const [actionIndex, setActionIndex] = useState<number>(0)

    const getActionIndex = (actionIndex: number) =>{
        setActionIndex(actionIndex)
    }

useEffect(() => {
    getAgentActions();
}, [agentId])
  
const getAgentActions = async () =>{
    if(agentId){

        try {
            const response = await axios.get(`${baseUrl}/denuncias/${reportId}/actions`);
            console.log('Sucesso ao obter Ações: ', response.data);
            setActions(response.data)
        } catch (error) {
            console.error('Erro ao obter ações', error);
        }
    }
    
  };

    useEffect(() => {
        const fetchConclusion = async () => {
            try {
                //Aqui vem o método de get conclusion
                const response = await axios.get(`${baseUrl}/conclusions/${conclusionId}`);
                console.log('Resposta da conclusion:', response.data);
    
                //Mapa correto:
                // titulo: response.data.titulo,
                // descricao: response.data.repodescricaortId,
                // reportId: response.data.reportId,
                // createdAt?: response.data.createdAt,
                // updatedAt?: response.data.updatedAt

                const reportDetalhes = {
                    _id: response.data._id,
                    titulo: response.data.titulo,
                    data: response.data.data,
                    status: response.data.status,
                    descricao: response.data.descricao,
                    usuarioId: response.data.usuarioId,
                    evidencias: response.data.evidencias || [],
                    timeline: response.data.timeline,
                    conclusions: response.data.conclusions || [],
                    createdAt: response.data.createdAt
                };

                setConclusion(response.data)                
    
                if (response.data.agente) {
                    setAgentId(response.data.agente)
                    
                    const reportAgent = await axios.get(`${baseUrl}/agentes/${response.data.agente}`);
                    console.log('Resposta do agente:', reportAgent.data);
    
                    const fullReport: IConclusionDetailsProps = {
                        conclusion: reportDetalhes,
                        agenteDetalhes: {
                            _id: reportAgent.data._id,
                            nome: reportAgent.data.nome,
                            reports: reportAgent.data.reports,
                            profile: reportAgent.data.profile
                        }
                    };
    
                    setConclusion(fullReport);
                } else {
                    const fullReport: IConclusionDetailsProps = {
                        conclusion: reportDetalhes,
                        agenteDetalhes: undefined
                    };
    
                    setConclusion(fullReport);
                    console.log('Nenhum agente associado à denúncia');
                }
            } catch (error) {
                console.log('Erro ao buscar detalhes da denúncia: ', error);
            }
        };
    
        fetchConclusion();
    }, [reportId, userId]);
    

    useEffect(() => {
        console.log("Actions do agente responsavel: ", actions);
        
    }, [actions])
    
    return(
        <MainContainer>
        {conclusion?.conclusion ? 
        <ConclusionDetails agenteDetalhes={conclusion.agenteDetalhes} conclusion={conclusion.conclusion} /> : <p>Detalhes da denúncia não encontrados.</p>}
        {/* {
        (admin || agent) && report?.agenteDetalhes ? (
            // @ts-ignore
            <InvestigateArea getActionIndex={getActionIndex} actions={actions} member={report.agenteDetalhes} />
        ) : "Aguardando Atribuição!"
        
        } */}

        {
        conclusion?.agenteDetalhes ? (
            // @ts-ignore
            <InvestigateArea getActionIndex={getActionIndex} actions={actions} member={conclusion.agenteDetalhes} />
        ) : "Aguardando Atribuição!"
        
        }
        {(admin || agent) ? <Divisor admin={admin} /> : <Divisor />}
        
        {reportId && <TimeLine reportId={reportId} />}
    </MainContainer>
    )
}

export default Conclusion;