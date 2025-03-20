import * as Styles from "./styles";
import Logo from "../../assets/Logo2.svg";
import userIcon from "../../assets/icons/user.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

// Se houver mais campos dentro de "timeline", "conclusions" etc., ajuste conforme necessário
interface TimelineItem {
  title: string;
  date: string;
}

interface Agente {
  _id: string;
  nome: string;
}

interface ReportType {
  id: string;
  usuarioId: string;
  status: string;
  descricao: string;
  titulo: string;
  data: string; // Ex.: "2025-03-20T07:43:50.367Z"
  agente: Agente; // Continua existindo no retorno, mas não vamos usá-lo agora
  risk: number;
  evidencias: string[];
  conclusions: any[];
  timeline: TimelineItem[];
  tipoDenuncia: string;
}

interface ReportProps {
  report: ReportType;
}

function ReportAdmin({ report }: ReportProps) {
  const navigate = useNavigate();

  // Ajuste a baseURL conforme sua configuração
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  const handleRedirect = () => {
    navigate(`report/${report.id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  function capitalize(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Styles.ReportContainer onClick={handleRedirect}>
      <Styles.Row>
        <Styles.ReportTitleDescription>
          <Styles.Title>{report.titulo}</Styles.Title>
          <Styles.ReportDate>
            <Styles.Date>{formatDate(report.data)}</Styles.Date>
          </Styles.ReportDate>
        </Styles.ReportTitleDescription>
      </Styles.Row>

      <Styles.Row>
        <Styles.OwnerAndUserContainer>
          {/* Campo "Responsável" */}
          <Styles.User>
            <Styles.UserIcon src={userIcon} />
            <Styles.UserName>
              Responsável:
              <Styles.Name>
                {report?.agente?.nome
                  ? report.agente.nome
                  : "Requer atribuição!"}
              </Styles.Name>
            </Styles.UserName>
          </Styles.User>
        </Styles.OwnerAndUserContainer>

        <Styles.Status>
          <Styles.StatusCircle status={report.status} />
          <Styles.StatusText>{capitalize(report.status)}</Styles.StatusText>
        </Styles.Status>
      </Styles.Row>
    </Styles.ReportContainer>
  );
}

export default ReportAdmin;
