import * as Styles from "./styles";
import Logo from "../../assets/Logo2.svg";
import DeleteModal from "../modal";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./scrollbar.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../UserContext";
import AttrModal from "../attrModal";
import SuccessAttrModal from "../successAttrModal";
import FailedAttrModal from "../failedAttrModal";

interface IInvestigateAction {
  action?: {
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
  };
}

function DetailsAction({ action }: IInvestigateAction) {
  const { admin, agent } = useUser();
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const { userId } = useUser();
  const { reportId, actionId } = useParams<{
    reportId: string;
    actionId: string;
  }>();
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  const closeSuccessModal = () => setShowSuccessModal(false);
  const closeFailedModal = () => setShowFailedModal(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const deleteReport = async () => {
    try {
      const response = await axios.delete(
        `${baseUrl}/denuncias/${userId}/${reportId}`
      );
      console.log("Denúncia deletada com sucesso", response.data);
      navigate("/home");
    } catch (error) {
      console.log("Erro ao deletar a denúncia", error);
    }
  };

  const attrReport = async (reportId: string, agentId: string) => {
    try {
      await axios.patch(`${baseUrl}/denuncias/${reportId}`, {
        agente: agentId,
      });
      console.log("Denúncia atribuída com sucesso");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Erro ao atribuir a denúncia", error);
      setShowFailedModal(true);
    }
  };

  const handleAddAction = () => {
    navigate(`/report/${reportId}/newAction`);
  };
  const formatString = (stringToFormat: string): string => {
    if (!stringToFormat) return "-";
    return stringToFormat.length > 12
      ? stringToFormat.substring(0, 12) + "..."
      : stringToFormat;
  };
  return (
    <Styles.DetailsContainer>
      <Styles.DetailsTitle>
        <Styles.DetailsLogo src={Logo} />
        <Styles.Title
          dangerouslySetInnerHTML={{ __html: action?.titulo || "" }}
        />
      </Styles.DetailsTitle>
      <Styles.Details>
        <Styles.Row>
          <Styles.Date>
            Data: {action ? formatDate(action.createdAt) : ""}
          </Styles.Date>
          <Styles.Status>
            <Styles.StatusCircle></Styles.StatusCircle>
            <Styles.StatusText>{action?.status}</Styles.StatusText>
          </Styles.Status>
        </Styles.Row>
        <PerfectScrollbar
          id="scrollbar-container"
          style={{ maxHeight: "38rem", overflow: "auto" }}
        >
          <Styles.Text
            dangerouslySetInnerHTML={{ __html: action?.descricao || "" }}
          />
        </PerfectScrollbar>
        <Styles.Evidence>
          <Styles.EvidenceTitle>Evidências</Styles.EvidenceTitle>
          <Styles.Slots>
            {action?.evidencias.map((evidence, index) => (
              <Styles.Slot key={index}>
                <a
                  target="_blank"
                  href={`${baseUrl}/uploads/${evidence}`}
                  download
                >
                  {formatString(evidence)}
                </a>
              </Styles.Slot>
            ))}
          </Styles.Slots>
        </Styles.Evidence>
        {admin ? (
          <Styles.Delete>
            <Styles.AttrButton onClick={() => setShowModal(true)}>
              <div style={{ color: "white", fontSize: "3rem" }}>+</div>
              <Styles.BtnTitle>Atribuir</Styles.BtnTitle>
            </Styles.AttrButton>
          </Styles.Delete>
        ) : agent ? (
          ""
        ) : (
          // <Styles.Conclude>
          //   <Styles.AttrButton onClick={() => handleAddAction()}>
          //     <div style={{ color: "white", fontSize: "3rem" }}>+</div>
          //     <Styles.BtnTitle>Adicionar ação</Styles.BtnTitle>
          //   </Styles.AttrButton>
          // </Styles.Conclude>
          ""
        )}
      </Styles.Details>
      {!admin && showModal && (
        <DeleteModal
          isOpen={showModal}
          onClose={closeModal}
          onConfirm={deleteReport}
          reportId={selectedReportId || ""}
        />
      )}
      {admin && showModal && (
        <AttrModal
          isOpen={showModal}
          onClose={closeModal}
          onConfirm={attrReport}
          reportId={reportId || ""}
        />
      )}
      {showSuccessModal && (
        <SuccessAttrModal
          isOpen={showSuccessModal}
          onClose={closeSuccessModal}
        />
      )}
      {showFailedModal && (
        <FailedAttrModal isOpen={showFailedModal} onClose={closeFailedModal} />
      )}
    </Styles.DetailsContainer>
  );
}

export default DetailsAction;
