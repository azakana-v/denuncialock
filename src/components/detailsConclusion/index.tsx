import * as Styles from "./styles";
import Checked from "../../assets/icons/checked2.png";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './scrollbar.css';
import { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { IConclusionDetailsProps } from "./IConclusionDetailsProps";
import { useUser } from "../../UserContext";

function ConclusionDetails({ conclusion, agenteDetalhes }: IConclusionDetailsProps) {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:3000";
  const { userId } = useUser();
  const { reportId } = useParams<{ reportId: string, agenteId: string, conclusionId: string }>();
  const [showModal, setShowModal] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

  return (
    <Styles.DetailsContainer>
      <Styles.DetailsTitle>
        <Styles.DetailsLogo src={Checked} />
        <Styles.Title>
          {conclusion?.titulo}
        </Styles.Title>
      </Styles.DetailsTitle>
      <Styles.Details>
        <Styles.Row>
          <Styles.Date>Conclusão: {
            conclusion?.createdAt ? formatDate(conclusion?.createdAt) : "Data não encontrada"
          }</Styles.Date>
        </Styles.Row>
        <PerfectScrollbar id="scrollbar-container" style={{ maxHeight: '38rem', overflow: 'auto' }}>
          <Styles.Text >
            {conclusion?.descricao}
          </Styles.Text>
        </PerfectScrollbar>
      </Styles.Details>
      
    </Styles.DetailsContainer>
  );
}

export default ConclusionDetails;
