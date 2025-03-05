import styled from "styled-components";
import Bordinha from "../components/Bordinha";
import { useEffect, useState } from "react";
import axios from "axios";
import ExcelImg from "../assets/icons/logo_excel.png";
import * as XLSX from "xlsx"; // Importa a biblioteca xlsx

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100vh;
  padding-top: 8rem;
  overflow-y: auto;
`;

const Title = styled.div`
  display: flex;
  align-items: end;
  gap: 1rem;
  font-size: 56px;
  font-weight: 600;
  color: #5b0390;
  border-bottom: 3px solid #5b0390;
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

const ExportButton = styled.button`
  background-color: #5b0390;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  margin-left: -880px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #470270;
  }
`;

function RelatorioPage() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/denuncias")
      .then((response) => {
        setDados(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, []);

  // Função auxiliar para formatar o título exibido (máximo de 10 caracteres)
  const formatTitulo = (titulo: string) => {
    if (!titulo) return "-";
    return titulo.length > 10 ? titulo.substring(0, 10) + "..." : titulo;
  };

  const exportToExcel = () => {
    // Mapeia os dados para o formato desejado, usando o título completo
    const dataForExcel = dados.map((item: any) => ({
      Data: new Date(item.data).toLocaleDateString() || "-",
      Título: item.titulo || "-", // Título completo para o Excel
      Tipo: item.tipo || "-",
      Gravidade: item.gravidade || "-",
      Responsável: item.responsavel || "-",
      Status: item.status || "-",
    }));

    // Cria uma worksheet a partir dos dados
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel, {
      header: ["Data", "Título", "Tipo", "Gravidade", "Responsável", "Status"],
    });

    // Cria um novo workbook e adiciona a worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");

    // Gera o arquivo Excel e dispara o download
    XLSX.writeFile(workbook, "relatorio.xlsx");
  };

  return (
    <Container>
      <Title>Relatórios</Title>
      <ContainerBordinha>
        {/* Cabeçalho */}
        <Bordinha
          data="Data"
          titulo="Título"
          tipo="Tipo"
          gravidade="Gravidade"
          responsavel="Responsável"
          status="Status"
        />

        {dados.length > 0 ? (
          dados.map((item: any) => (
            <Bordinha
              id={item.id}
              key={item.id}
              data={new Date(item.data).toLocaleDateString() || "-"}
              // Exibe o título truncado e utiliza o atributo "title" para o tooltip com o título completo
              titulo={
                <span title={item.titulo}>
                  {formatTitulo(item.titulo)}
                </span>
              }
              tipo={item.tipo || "-"}
              gravidade={item.gravidade || "-"}
              responsavel={item.responsavel || "-"}
              status={item.status || "-"}
            />
          ))
        ) : (
          <p>Carregando ou nenhum dado disponível...</p>
        )}
      </ContainerBordinha>
      <ExportButton onClick={exportToExcel}>
        Exportar | <ImagemExcel src={ExcelImg} />
      </ExportButton>
    </Container>
  );
}

export default RelatorioPage;
