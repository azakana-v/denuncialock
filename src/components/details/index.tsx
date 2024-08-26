import * as Styles from "./styles";
import Logo from "../../assets/Logo2.svg";
import Trash from '../../assets/icons/trash.svg';
import DeleteModal from "../modal";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './scrollbar.css';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { IReportDetailsProps } from "./IReportDetailsProps";
import { useUser } from "../../UserContext";
import AttrModal from "../attrModal";


function Details({ report }: IReportDetailsProps) {
  const {admin} = useUser();
  const navigate = useNavigate();
  const baseUrl = "http://localhost:3000";
  const userId = '66c4bb87a93ff03ddc53d5cd';
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

 
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

const deleteReport = async (reportId: string) => {
  console.log('Report ID na função deleteReport:', reportId); 
  try {
    const response = await axios.delete(`${baseUrl}/denuncias/${userId}/${reportId}`);
    console.log('Denúncia deletada com sucesso', response.data);
    navigate('/');
  } catch (error) {
    console.log('Erro ao deletar a denúncia', error);
  }
};

const attrReport = async () =>{
  console.log("atribuir report");
  
}
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
        <DeleteModal isOpen={showModal} onClose={closeModal} onConfirm={deleteReport} reportId={report._id}/>
      )}
      {admin && showModal && (<AttrModal isOpen={showModal} onClose={closeModal} onConfirm={attrReport} reportId={report._id}/>)}
    </Styles.DetailsContainer>
  );
}

export default Details;
