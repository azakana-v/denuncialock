import Details from "../components/details";
import styled from "styled-components";
import TimeLine from "../components/timeLine";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IReportDetailsProps } from "../components/details/IReportDetailsProps";
import { useUser } from "../UserContext";
import InvestigateArea from "../components/investigateArea";
import DetailsAction from "../components/detailsAction";
import DetailsVerifica from "../components/details";

interface DivisorProps {
  admin?: boolean;
}
interface IReportProps {
  action?: boolean;
}

interface IInvestigateAction {
  _id: string;
  titulo: string;
  descricao: string;
  usuarioId: string;
  evidencias: string[];
  status: string;
  autor: string;
  agente: string;
  createdAt: string;
  updatedAt?: string;
}

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 8rem 6rem;
`;
const Divisor = styled.div<DivisorProps>`
  min-height: 100%;
  min-width: 3px;
  max-width: 3px;
  background-color: #5b0390;
  flex: 1;
  margin: 0 10%;
  margin-left: ${(props) => (props.admin ? "2%" : "10%")};
`;

function UserlessReportPage({ action }: IReportProps) {
  const { admin, agent } = useUser();
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const userId = "67d83d2aa27252c882ab5d34";
  const { reportId, actionId } = useParams<{
    reportId: string;
    actionId?: string;
  }>();
  const [report, setReport] = useState<IReportDetailsProps>();
  const [actions, setActions] = useState<IInvestigateAction[]>();
  const [agentId, setAgentId] = useState<string>("");
  const [actionIndex, setActionIndex] = useState<number>(0);

  const getActionIndex = (actionIndex: number) => {
    setActionIndex(actionIndex);
  };

  useEffect(() => {
    getAgentActions();
  }, [agentId]);

  const getAgentActions = async () => {
    if (agentId) {
      try {
        const response = await axios.get(
          `${baseUrl}/denuncias/${reportId}/actions`
        );
        console.log("Sucesso ao obter Ações: ", response.data);
        setActions(response.data);
      } catch (error) {
        console.error("Erro ao obter ações", error);
      }
    }
  };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`${baseUrl}/denuncias/${reportId}`);
        console.log("Resposta da denúncia:", response.data);

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
          createdAt: response.data.createdAt,
          risk: response.data.risk,
        };

        setReport(response.data);
        console.log(response.data, " dadossssssss");

        if (response.data.agente) {
          setAgentId(response.data.agente);

          const reportAgent = await axios.get(
            `${baseUrl}/agentes/${response.data.agente}`
          );
          console.log("Resposta do agente:", reportAgent.data);

          const fullReport: IReportDetailsProps = {
            report: reportDetalhes,
            agenteDetalhes: {
              _id: reportAgent.data._id,
              nome: reportAgent.data.nome,
              reports: reportAgent.data.reports,
              profile: reportAgent.data.profile,
            },
          };
          setReport(fullReport);
        } else {
          const fullReport: IReportDetailsProps = {
            report: reportDetalhes,
            agenteDetalhes: undefined,
          };

          setReport(fullReport);
          console.log("Nenhum agente associado à denúncia");
        }
      } catch (error) {
        console.log("Erro ao buscar detalhes da denúncia: ", error);
      }
    };

    fetchReport();
  }, [reportId, userId]);

  useEffect(() => {
    console.log("Actions do agente responsavel: ", actions);
  }, [actions]);

  return (
    <MainContainer>
      {report?.report ? (
        action && actions ? (
          <DetailsAction action={actions ? actions[actionIndex] : undefined} />
        ) : (
          <DetailsVerifica
            agenteDetalhes={report.agenteDetalhes}
            report={report.report}
          />
        )
      ) : (
        <p>Detalhes da denúncia não encontrados.</p>
      )}
      {report?.agenteDetalhes ? (
        // @ts-ignore
        <InvestigateArea
          getActionIndex={getActionIndex}
          actions={actions}
          member={{
            nome: report.agenteDetalhes.nome,
            reports: 0,
            profile: "string",
          }}
        />
      ) : (
        "Aguardando Atribuição!"
      )}
      {admin || agent ? <Divisor admin={admin} /> : <Divisor />}

      {reportId && <TimeLine reportId={reportId} />}
    </MainContainer>
  );
}

export default UserlessReportPage;
