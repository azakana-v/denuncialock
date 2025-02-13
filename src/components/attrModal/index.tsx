import * as Styles from "./styles";
import X from "../../assets/icons/x.svg";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./scrollbar.css";
import MemberCard from "../memberCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../UserContext";
import { useParams } from "react-router-dom";

interface Agent {
  _id: string;
  nome: string;
  reports: string[];
  profile: string;
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reportId: string, agentId: string) => void;
  reportId: string;
}
function AttrModal({ isOpen, onClose, onConfirm }: DeleteModalProps) {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const { userId } = useUser();
  const { reportId } = useParams<{ reportId: string }>();

  useEffect(() => {
    getAgents();
  }, []);

  const getAgents = async () => {
    try {
      const response = await axios.get(`${baseUrl}/agentes`);
      setAgents(response.data);
    } catch (error) {
      console.error("Erro ao buscar agentes", error);
    }
  };

  const handleConfirm = async () => {
    console.log("report Id no handle confirm:", reportId);
    console.log("user Id no handle confirm:", userId);
    if (selectedAgentId && reportId) {
      try {
        await axios.patch(`${baseUrl}/denuncias/${reportId}`, {
          agente: selectedAgentId,
        });
        console.log("Denúncia atribuída com sucesso");
        onConfirm(reportId, selectedAgentId);
        onClose();
      } catch (error) {
        console.error("Erro ao atribuir denúncia", error);
      }
    } else {
      console.error("Report ID ou Agent ID não definidos.");
    }
  };

  if (!isOpen) return null;

  return (
    <Styles.MainContainer>
      <Styles.Overlay onClick={onClose} />
      <Styles.ModalContainer>
        <Styles.CloseButton onClick={onClose} src={X} />
        <Styles.Title>Membros</Styles.Title>
        <Styles.FakeBorder></Styles.FakeBorder>

        <PerfectScrollbar style={{ maxHeight: "38rem", overflow: "auto" }}>
          {agents.map((agent) => (
            <div
              key={agent._id}
              style={{ margin: "0 1.8rem" }}
              onClick={() => {
                setSelectedAgentId(agent._id);
                console.log("Selected Agent ID:", agent._id);
              }}
            >
              <MemberCard
                selected={selectedAgentId === agent._id}
                member={agent}
              />
            </div>
          ))}
        </PerfectScrollbar>

        <Styles.Buttons>
          <Styles.ReturnBtn onClick={handleConfirm}>
            + | Atribuir
          </Styles.ReturnBtn>
        </Styles.Buttons>
      </Styles.ModalContainer>
    </Styles.MainContainer>
  );
}

export default AttrModal;
