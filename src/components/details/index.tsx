import * as Styles from "./styles";
import Logo from "../../assets/Logo2.svg";
import Trash from '../../assets/icons/trash.svg';
import DeleteModal from "../modal";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './scrollbar.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { IReportDetailsProps } from "./IReportDetailsProps";
import { useUser } from "../../UserContext";
import AttrModal from "../attrModal";
import SuccessAttrModal from "../successAttrModal";
import FailedAttrModal from "../failedAttrModal";


function Details({ report }: IReportDetailsProps) {
  const {admin} = useUser();
  const navigate = useNavigate();
  const baseUrl = "http://localhost:3000";
  const { userId } = useUser();
  const { reportId } = useParams<{ reportId: string }>();
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

  return (
    <Styles.DetailsContainer>
      <Styles.DetailsTitle>
        <Styles.DetailsLogo src={Logo} />
        <Styles.Title>
          {report?.titulo}
        </Styles.Title>
      </Styles.DetailsTitle>
      <Styles.Details>
        <Styles.Row>
          <Styles.Date>Data: {formatDate(report?.data)}</Styles.Date>
          <Styles.Status>
            <Styles.StatusCircle></Styles.StatusCircle>
            <Styles.StatusText>{report?.status}</Styles.StatusText>
          </Styles.Status>
        </Styles.Row>
        <PerfectScrollbar id="scrollbar-container" style={{ maxHeight: '38rem', overflow: 'auto' }}>
          <Styles.Text >
            {report?.descricao}
          </Styles.Text>
        </PerfectScrollbar>
        <Styles.Evidence>
            <Styles.EvidenceTitle>Evidências</Styles.EvidenceTitle>
            <Styles.Slots>
            <Styles.Slot></Styles.Slot>
            <Styles.Slot></Styles.Slot>
            <Styles.Slot></Styles.Slot>
            <Styles.Slot></Styles.Slot>
            </Styles.Slots>
        </Styles.Evidence>
        {admin ? 
        <Styles.Delete>
              <Styles.AttrButton onClick={() => setShowModal(true)}>
                  <div style={{color: "white", fontSize: "3rem"}}>+</div>
                  <Styles.BtnTitle>Atribuir</Styles.BtnTitle>
              </Styles.AttrButton>
        </Styles.Delete>
        :

         <Styles.Delete>
            <Styles.DeleteButton onClick={() => setShowModal(true)}>
                <Styles.Icon src={Trash}/>
                <Styles.BtnTitle>Deletar</Styles.BtnTitle>
            </Styles.DeleteButton>
        </Styles.Delete>
        }
      </Styles.Details>
      {!admin && showModal && (
        <DeleteModal isOpen={showModal} onClose={closeModal} onConfirm={deleteReport} reportId={selectedReportId || ''} />
      )}
      {admin && showModal && (
       <AttrModal
       isOpen={showModal}
       onClose={closeModal}
       onConfirm={attrReport}
       reportId={reportId || ''}
     />
      )}
          {showSuccessModal && (
        <SuccessAttrModal isOpen={showSuccessModal} onClose={closeSuccessModal} />
      )}
          {showFailedModal && (
        <FailedAttrModal isOpen={showFailedModal} onClose={closeFailedModal} />
      )}
    </Styles.DetailsContainer>
  );
}

export default Details;
