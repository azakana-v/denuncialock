import styled from "styled-components";
import Bordinha from "../components/Bordinha";
import { useEffect, useState } from "react";
import axios from "axios";


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

const ExportButton = styled.button`
  background-color: #5B0390;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  margin-left: -916px; /* Dobramos o -400px */

  &:hover {
    background-color: #470270;
  }
`;




function RelatorioPage() {
  const [dados, setDados] = useState<any[]>([]); // Estado inicial como array vazio

  useEffect(() => {
    axios
      .get("http://localhost:3000/denuncias") // URL da API
      .then((response) => {
        setDados(response.data); // Armazena os dados no estado
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, []);

  return (
    <Container>
      <Title>Relatórios</Title>
      <ContainerBordinha>
        <Bordinha
          data="Data"
          titulo="Título"
          tipo="Tipo"
          gravidade="Gravidade"
          responsavel="Responsável"
          status="Status"
        ></Bordinha>

        {/* Verifica se há dados antes de mapear */}
        {dados.length > 0 ? (
          dados.map((item) => (
            <Bordinha
              id={item.id}
              key={item.id} // Sempre defina uma chave única
              data={new Date(item.data).toLocaleDateString() || "-"}
              titulo={item.titulo || "-"}
              tipo={item.tipo || "-"}
              gravidade={item.gravidade || "-"}
              responsavel={item.responsavel || "-"}
              status={item.status || "-"}
            />
          ))
        ) : (
          <p>Carregando ou nenhum dado disponível...</p>
        )}
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
        <Bordinha></Bordinha>
      </ContainerBordinha>
      <ExportButton>Exportar</ExportButton>

    </Container>
  );
}

export default RelatorioPage;
