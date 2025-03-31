import React, { useEffect, useState } from "react";
import BarChartGraph from "./BarChartExample";
import styled from "styled-components";
import axios from "axios";

// Container para o gráfico
const Container = styled.div`
  width: 100%;
`;

// Interfaces para os dados das denúncias e timeline
interface Timeline {
  title: string;
  date: string;
  _id?: string;
}

export interface Denuncia {
  id: string;
  usuarioId: string;
  status: string;
  descricao: string;
  evidencias: string[];
  risk: number;
  timeline: Timeline[];
  titulo: string;
  tipoDenuncia: string;
}

// Interface para os itens do gráfico
interface ChartDataItem {
  name: string;
  value: number;
}

// Mapeamento dos valores do enum para nomes amigáveis
const friendlyMapping: Record<string, string> = {
  "assedio-moral": "Assédio Moral",
  "assedio-sexual": "Assédio Sexual",
  discriminacao: "Discriminação",
  "corrupcao-suborno": "Corrupção e Suborno",
  "fraude-financeira": "Fraude Financeira",
  "desvio-recursos": "Desvio de Recursos",
  "abuso-autoridade": "Abuso de Autoridade",
  "conflito-interesses": "Conflito de Interesses",
  "falsificacao-documentos": "Falsificação de Documentos",
  "violacao-politicas": "Violação de Políticas Internas",
  "vazamento-informacoes": "Vazamento de Informações Confidenciais",
  nepotismo: "Nepotismo",
  "trabalho-infantil": "Trabalho Infantil ou Análogo à Escravidão",
  "conduta-anti-etica": "Conduta Antiética ou Imoral",
  "descumprimento-regulamentacoes": "Descumprimento de Regulamentações",
  sabotagem: "Sabotagem ou Vandalismo",
  "uso-indevido-recursos": "Uso Indevido de Recursos da Empresa",
  "falta-seguranca": "Falta de Segurança no Trabalho",
  "coacao-intimidacao": "Coação ou Intimidação",
  "maus-tratos": "Maus-tratos e Violência Física ou Psicológica",
};

const BarChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Função para buscar as denúncias usando axios
    const fetchDenuncias = async () => {
      try {
        const response = await axios.get<Denuncia[]>(
          `${process.env.REACT_APP_BACKEND_URL}/denuncias`
        );
        const denuncias = response.data;

        // Agrupa as denúncias por tipoDenuncia
        const counts = denuncias.reduce(
          (acc: Record<string, number>, report: Denuncia) => {
            const tipo = report.tipoDenuncia;
            acc[tipo] = (acc[tipo] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );

        // Transforma o objeto em um array de objetos com 'name' e 'value'
        const dataArray: ChartDataItem[] = Object.entries(counts).map(
          ([tipo, count]) => ({
            name: friendlyMapping[tipo] || tipo,
            value: count,
          })
        );

        setChartData(dataArray);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar denúncias:", err);
        setError(err instanceof Error ? err.message : "Erro inesperado");
        setLoading(false);
      }
    };

    fetchDenuncias();
  }, []);

  if (loading) {
    return <Container>Carregando...</Container>;
  }

  if (error) {
    return <Container>Erro: {error}</Container>;
  }

  return (
    <Container>
      <BarChartGraph
        data={chartData}
        title="Tipo de denúncia"
        subtitle="Dados atualizados dinamicamente"
        color="#8e24aa"
      />
    </Container>
  );
};

export default BarChartComponent;
