import styled from "styled-components";
import Bordinha from "../components/Bordinha";
import { useEffect, useState } from "react";
import axios from "axios";
import ExcelImg from "../assets/icons/logo_excel.png";
import * as XLSX from "xlsx";
import Bordinha2 from "../components/Bordinha2";

// Interfaces para tipagem
interface Agent {
  _id: string;
  nome: string;
  email: string;
  role: string;
  reports: string[] | undefined;
  actions: string[] | undefined;
}

interface BordinhaProps {
  id?: string;
  nome?: string | JSX.Element;
  email?: string | JSX.Element;
  role?: string;
  reports?: number | string;
  actions?: number | string;
}

const SubContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const RelatorioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  align-items: end;
  gap: 1rem;
  font-size: 56px;
  font-weight: 600;
  color: #5b0390;
  border-bottom: 3px solid #5b0390;
  text-align: center;
`;

const ContainerBordinha = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  height: 60vh;
`;

const ImagemExcel = styled.img`
  max-width: 35px;
  max-height: 35px;
  width: auto;
  height: auto;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ExportButton = styled.button`
  background-color: #5b0390;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  &:hover {
    background-color: #470270;
  }
`;

const AddButton = styled.button`
  background-color: #5b0390;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  &:hover {
    background-color: #470270;
  }
`;

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  color: #5b0390;
  margin-bottom: 20px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #5b0390;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #5b0390;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: black;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #b3b3b3;
  }
`;

const SaveButton = styled.button`
  background-color: #5b0390;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #470270;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
  margin-top: 5px;
`;

const Membros: React.FC = () => {
  const [agentes, setAgentes] = useState<Agent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    role: "agent",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAgentes();
  }, []);

  const fetchAgentes = () => {
    axios
      .get<Agent[]>(`${process.env.REACT_APP_BACKEND_URL}/agentes`)
      .then((response) => {
        setAgentes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os agentes:", error);
      });
  };

  // Função auxiliar para formatar o email exibido (máximo de 20 caracteres)
  const formatEmail = (email: string): string => {
    if (!email) return "-";
    return email.length > 12 ? email.substring(0, 12) + "..." : email;
  };

  const exportToExcel = (): void => {
    // Mapeia os dados para o formato desejado
    const dataForExcel = agentes.map((agente) => ({
      Nome: agente.nome || "-",
      Email: agente.email || "-",
      Função: agente.role || "-",
      "Número de Relatórios": agente.reports ? agente.reports.length : 0,
      "Número de Ações": agente.actions ? agente.actions.length : 0,
    }));

    // Cria uma worksheet a partir dos dados
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel, {
      header: [
        "Nome",
        "Email",
        "Função",
        "Número de Relatórios",
        "Número de Ações",
      ],
    });

    // Cria um novo workbook e adiciona a worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agentes");

    // Gera o arquivo Excel e dispara o download
    XLSX.writeFile(workbook, "agentes.xlsx");
  };

  const openModal = () => {
    setShowModal(true);
    setFormData({
      nome: "",
      email: "",
      senha: "",
      role: "agent",
    });
    setError("");
    setSuccess("");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validação básica
    if (!formData.nome || !formData.email || !formData.senha) {
      setError("Todos os campos são obrigatórios.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/agentes`,
        formData
      );

      setSuccess("Agente criado com sucesso!");
      setIsLoading(false);

      // Atualiza a lista de agentes
      fetchAgentes();

      // Fecha o modal após um pequeno delay
      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (error: any) {
      console.error("Erro ao criar o agente:", error);
      setError(
        error.response?.data?.error ||
          "Erro ao criar o agente. Tente novamente."
      );
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <MainContainer>
        <SubContainer>
          <RelatorioContainer>
            <TitleContainer>
              <Title>Agentes</Title>
            </TitleContainer>
            <ContainerBordinha>
              {/* Cabeçalho */}
              <Bordinha2
                nome="Nome"
                email="Email"
                role="Função"
                reports="Denúncias"
                actions="Ações"
                isHeader={true}
              />
              {agentes.length > 0 ? (
                agentes.map((agente) => (
                  <Bordinha2
                    id={agente._id}
                    key={agente._id}
                    nome={agente.nome || "-"}
                    // Exibe o email truncado e utiliza o atributo "title" para o tooltip com o email completo
                    email={
                      <span title={agente.email}>
                        {formatEmail(agente.email)}
                      </span>
                    }
                    role={agente.role || "-"}
                    reports={agente.reports ? agente.reports.length : 0}
                    actions={agente.actions ? agente.actions.length : 0}
                  />
                ))
              ) : (
                <p>Carregando ou nenhum agente disponível...</p>
              )}
            </ContainerBordinha>
          </RelatorioContainer>
          <ButtonsContainer>
            <ExportButton onClick={exportToExcel}>
              Exportar | <ImagemExcel src={ExcelImg} />
            </ExportButton>
            <AddButton onClick={openModal}>+</AddButton>
          </ButtonsContainer>
        </SubContainer>
      </MainContainer>

      {/* Modal para adicionar novo agente */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Adicionar Novo Agente</ModalTitle>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Digite o nome do agente"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Digite o email do agente"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="senha">Senha</Label>
                <Input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  placeholder="Digite a senha do agente"
                />
              </FormGroup>
              {/* <FormGroup>
                <Label htmlFor="role">Função</Label>
                <Select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="agent">Agente</option>
                  <option value="admin">Administrador</option>
                  <option value="supervisor">Supervisor</option>
                </Select>
              </FormGroup> */}
              {error && <ErrorMessage>{error}</ErrorMessage>}
              {success && <SuccessMessage>{success}</SuccessMessage>}
              <ModalButtons>
                <CancelButton type="button" onClick={closeModal}>
                  Cancelar
                </CancelButton>
                <SaveButton type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar"}
                </SaveButton>
              </ModalButtons>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Membros;
