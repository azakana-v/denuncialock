import * as Styles from "./styles";
import Checked from "../../assets/icons/checked2.png";
import Trash from '../../assets/icons/trash.svg';
import Conclude from '../../assets/icons/ConcludeIcon.svg'
import DeleteModal from "../modal";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './scrollbar.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { IConclusionDetailsProps } from "./IConclusionDetailsProps";
import { useUser } from "../../UserContext";
import AttrModal from "../attrModal";
import SuccessAttrModal from "../successAttrModal";
import FailedAttrModal from "../failedAttrModal";


function ConclusionDetails({ conclusion, agenteDetalhes }: IConclusionDetailsProps) {
  const {admin, agent} = useUser();
  const navigate = useNavigate();
  const baseUrl = "http://localhost:3000";
  const { userId } = useUser();
  const { reportId, agenteId, conclusionId } = useParams<{ reportId: string, agenteId: string, conclusionId: string }>();
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  const closeSuccessModal = () => setShowSuccessModal(false);
  const closeFailedModal = () => setShowSuccessModal(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

const deleteReport = async () => {
  try {
    const response = await axios.delete(`${baseUrl}/denuncias/${userId}/${reportId}`);
    console.log('Denúncia deletada com sucesso', response.data);
    navigate('/home');
  } catch (error) {
    console.log('Erro ao deletar a denúncia', error);
  }
};

const attrReport = async (reportId: string, agentId: string) => {
  try {
    await axios.patch(`${baseUrl}/denuncias/${reportId}`, { agente: agentId });
    console.log('Denúncia atribuída com sucesso');
    setShowSuccessModal(true);
  } catch (error) {
    console.error('Erro ao atribuir a denúncia', error);
    setShowFailedModal(true);
  }
};

const handleConclude = async () => {
  navigate(`/conclusion/${reportId}/newConclusion`)
};

const handleAddAction = ()=>{
  console.log("adicionar conclusion");
  navigate(`/conclusion/${reportId}/newAction/${agenteDetalhes?._id}`);
  
  }

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
          // formatDate(conclusion?.createdAt)
          }</Styles.Date>
          {/* <Styles.Status>
            <Styles.StatusCircle></Styles.StatusCircle>
            <Styles.StatusText>{conclusion?.status}</Styles.StatusText>
          </Styles.Status> */}
        </Styles.Row>
        <PerfectScrollbar id="scrollbar-container" style={{ maxHeight: '38rem', overflow: 'auto' }}>
          <Styles.Text >
            {conclusion?.descricao}
          </Styles.Text>
        </PerfectScrollbar>
        {/* <Styles.Evidence>
            <Styles.EvidenceTitle>Evidências</Styles.EvidenceTitle>
            <Styles.Slots>
            {conclusion?.evidencias.map((evidence: any, index: any) => (
              <Styles.Slot key={index}>
                <a href={`${baseUrl}/uploads/${evidence}`} download>
                  {evidence}
                </a>
              </Styles.Slot>
            ))}

            </Styles.Slots>
        </Styles.Evidence> */}

      </Styles.Details>
      
    </Styles.DetailsContainer>
  );
}

export default ConclusionDetails;
