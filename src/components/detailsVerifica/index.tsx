import * as Styles from "./styles";
import Logo from "../../assets/Logo2.svg";
import Trash from "../../assets/icons/trash.svg";
import Conclude from "../../assets/icons/ConcludeIcon.svg";
import DeleteModal from "../modal";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./scrollbar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IReportDetailsProps } from "./IReportDetailsProps";
import { useUser } from "../../UserContext";
import AttrModal from "../attrModal";
import SuccessAttrModal from "../successAttrModal";
import FailedAttrModal from "../failedAttrModal";
import ClassificationModal from "../ClassificationModal";

function Details({ report, agenteDetalhes }: IReportDetailsProps) {
  const { admin, agent } = useUser();
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const { userId } = useUser();
  const { reportId, agenteId } = useParams<{
    reportId: string;
    agenteId: string;
  }>();
  const [showModal, setShowModal] = useState(false);
  const [isConcluded, setIsConcluded] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [showClassificationModal, setShowClassificationModal] = useState(false);
  const [riscoDenuncia, setRiscoDenuncia] = useState<boolean>(false);
  const [selectedRisk, setSelectedRisk] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  const closeSuccessModal = () => setShowSuccessModal(false);
  const closeFailedModal = () => setShowFailedModal(false);
  const openClassificationModal = () => setShowClassificationModal(true);
  const closeClassificationModal = () => setShowClassificationModal(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Fetch report risk status from API
  const fetchReportRiskStatus = async () => {
    if (!reportId) return;

    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl}/denuncias/${reportId}`);
      // Assuming the API returns the risk level in a property called 'risco'
      // Change the property name if it's different in your API
      const hasRisk =
        response.data.risk !== undefined &&
        response.data.risk !== null &&
        response.data.risk !== -1;
      setRiscoDenuncia(hasRisk);
      if (hasRisk) {
        setSelectedRisk(response.data.risk.toString());
      }
    } catch (error) {
      console.error("Erro ao obter classificação de risco da denúncia", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if the report has a conclusion
    if (report?.conclusions?.length > 0) {
      setIsConcluded(true);
    }

    // Fetch risk status when component mounts or reportId changes
    fetchReportRiskStatus();
  }, [report, reportId]);

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

  const handleConclude = async () => {
    if (!riscoDenuncia) {
      return; // Impede a conclusão se o risco não foi classificado
    }

    if (isConcluded) {
      //redireciona para a conclusion
      console.log(report);
      navigate(
        `/report/${reportId}/conclusion/${
          report.conclusions[report.conclusions.length - 1]
        }`
      );
    } else {
      //redireciona para a new conclusion
      navigate(`/report/${reportId}/newConclusion`);
    }
  };

  const handleClassify = async (risk: string, riskIndex: number) => {
    // Immediately update local state to enable button
    setSelectedRisk(risk);
    setRiscoDenuncia(true);

    try {
      // Still update the risk classification via API
      await axios.put(`${baseUrl}/denuncias/${reportId}/classificacao`, {
        risco: risk,
      });
      console.log("Risco classificado com sucesso");
    } catch (error) {
      console.error("Erro ao classificar risco", error);
      // Even if API call fails, we still allow the user to proceed
      // This is per the requirements to enable the button after setting risk
    }
  };

  const handleAddAction = () => {
    console.log("adicionar report");
    navigate(`/report/${reportId}/newAction/${agenteDetalhes?._id}`);
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
        <Styles.Title>{report?.titulo}</Styles.Title>
      </Styles.DetailsTitle>
      <Styles.Details>
        <Styles.Row>
          <Styles.Date>Data: {formatDate(report?.data)}</Styles.Date>
          <Styles.Status>
            <Styles.StatusCircle></Styles.StatusCircle>
            <Styles.StatusText>{report?.status}</Styles.StatusText>
          </Styles.Status>
        </Styles.Row>
        {admin ? (
          <Styles.Row>
            <Styles.Date></Styles.Date>
            <Styles.Date>
              <br />
              Risco:{" "}
              <b>
                {report?.risk == "0"
                  ? "Baixo"
                  : report?.risk == "1"
                  ? "Médio"
                  : report?.risk == "2"
                  ? "Alto"
                  : report?.risk == "-"}
              </b>
            </Styles.Date>
          </Styles.Row>
        ) : (
          ""
        )}

        <PerfectScrollbar
          id="scrollbar-container"
          style={{ maxHeight: "38rem", overflow: "auto" }}
        >
          <Styles.Text>{report?.descricao}</Styles.Text>
        </PerfectScrollbar>
        <Styles.Evidence>
          <Styles.EvidenceTitle>Evidências</Styles.EvidenceTitle>
          <Styles.Slots>
            {report?.evidencias.map((evidence, index) => (
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
        {admin && report.status != "Encerrada" ? (
          <Styles.Delete>
            <Styles.AttrButton onClick={() => setShowModal(true)}>
              <div style={{ color: "white", fontSize: "3rem" }}>+</div>
              <Styles.BtnTitle>Atribuir</Styles.BtnTitle>
            </Styles.AttrButton>
          </Styles.Delete>
        ) : agent && report.status != "Encerrada" ? (
          <Styles.Conclude>
            <Styles.AttrButton onClick={() => handleAddAction()}>
              <div style={{ color: "white", fontSize: "3rem" }}>+</div>
              <Styles.BtnTitle>Adicionar ação</Styles.BtnTitle>
            </Styles.AttrButton>
          </Styles.Conclude>
        ) : report.status != "Encerrada" ? (
          <Styles.Delete>
            <Styles.DeleteButton onClick={() => setShowModal(true)}>
              <Styles.Icon src={Trash} />
              <Styles.BtnTitle>Deletar</Styles.BtnTitle>
            </Styles.DeleteButton>
          </Styles.Delete>
        ) : (
          ""
        )}
        <Styles.Conclude>
          <Styles.ConcludeButton
            onClick={() => handleConclude()}
            disabled={!riscoDenuncia && !isConcluded}
            style={{
              opacity: !riscoDenuncia && !isConcluded ? 0.7 : 1,
              cursor:
                !riscoDenuncia && !isConcluded ? "not-allowed" : "pointer",
            }}
          >
            <Styles.Icon src={Conclude} />
            <Styles.BtnTitle>
              {report.conclusions?.length > 0 ? "Ver Conclusão" : "Concluir"}
            </Styles.BtnTitle>
          </Styles.ConcludeButton>
        </Styles.Conclude>
        {!isConcluded && report.status != "Encerrada" && (
          <Styles.Conclude>
            <Styles.ClassifyButton onClick={openClassificationModal}>
              <Styles.BtnTitle>Classificar</Styles.BtnTitle>
            </Styles.ClassifyButton>
          </Styles.Conclude>
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
      <ClassificationModal
        isOpen={showClassificationModal}
        onClose={closeClassificationModal}
        onConfirm={handleClassify}
      />
    </Styles.DetailsContainer>
  );
}

export default Details;
