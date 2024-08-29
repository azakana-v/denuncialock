import Details from '../components/details'
import styled from "styled-components";
import TimeLine from "../components/timeLine";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IReportDetailsProps } from '../components/details/IReportDetailsProps';
import { useUser } from '../UserContext';
import InvestigateArea from '../components/investigateArea';

interface DivisorProps {
    admin?: boolean; // Prop opcional 'admin' que é um booleano
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

const agentXumbado = [{
    member: {
      nome: "Jose Fagundes",
      reports: 1,
      profile: "https://th.bing.com/th/id/OIP.0f3JWKSq-cAJK_IwP7mzYwAAAA?rs=1&pid=ImgDetMain",
    }
  }
  ]

function Report(){
    const { admin} = useUser();
    const baseUrl = "http://localhost:3000";
    const userId = '66c4bb87a93ff03ddc53d5cd';
    const { reportId } = useParams();
    const [report, setReport] = useState<IReportDetailsProps>();
    console.log(report);
    
    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get(`${baseUrl}/denuncias/${reportId}/usuario/${userId}`);
                console.log('Resposta da denúncia:', response.data);
    
                const reportDetalhes = {
                    _id: response.data._id,
                    titulo: response.data.titulo,
                    data: response.data.data,
                    status: response.data.status,
                    descricao: response.data.descricao,
                    usuarioId: response.data.usuarioId
                };
    
                if (response.data.agente) {
                    const reportAgent = await axios.get(`${baseUrl}/agentes/${response.data.agente}`);
                    console.log('Resposta do agente:', reportAgent.data);
    
                    const fullReport: IReportDetailsProps = {
                        report: reportDetalhes,
                        agenteDetalhes: {
                            _id: reportAgent.data._id,
                            nome: reportAgent.data.nome,
                            reports: reportAgent.data.reports,
                            profile: reportAgent.data.profile
                        }
                    };
    
                    setReport(fullReport);
                } else {
                    const fullReport: IReportDetailsProps = {
                        report: reportDetalhes,
                        agenteDetalhes: undefined
                    };
    
                    setReport(fullReport);
                    console.log('Nenhum agente associado à denúncia');
                }
            } catch (error) {
                console.log('Erro ao buscar detalhes da denúncia: ', error);
            }
        };
    
        fetchReport();
    }, [reportId, userId]);
    
    
    

    return(
        <MainContainer>
        {report?.report ? <Details report={report.report} /> : <p>Detalhes da denúncia não encontrados.</p>}
        {admin && report?.agenteDetalhes ? (
            // @ts-ignore
            <InvestigateArea member={report.agenteDetalhes} />
        ) : "Aguardando Atribuição!"}
        {admin ? <Divisor admin={admin} /> : <Divisor />}
        <TimeLine />
    </MainContainer>
    )
}

export default Report;