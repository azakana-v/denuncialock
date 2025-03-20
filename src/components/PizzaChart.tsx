import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import axios from "axios";

// Definindo a interface para os dados da denúncia com o novo formato
interface Denuncia {
  id: string;
  usuarioId: string;
  status: string;
  descricao: string;
  titulo: string;
  data: string;
  risk: number; // Agora é um número: 0 (baixo), 1 (médio), 2 (alto)
  evidencias: any[];
  conclusions: any[];
  timeline: {
    title: string;
    date: string;
    _id: string;
  }[];
  tipoDenuncia: string;
}

// Mapeamento de valores numéricos para categorias de risco
const riskMapping = {
  0: { name: "Baixo", color: "#1E1552" },
  1: { name: "Médio", color: "#721E9B" },
  2: { name: "Alto", color: "#D527FF" },
};

// Estilização dos componentes
const ChartContainer = styled.div`
  width: 100%;
  max-width: 700px;
  min-width: 700px;
  margin: 0 auto;
  position: relative;
`;

const ChartInnerContainer = styled.div`
  filter: drop-shadow(0 4px 10px rgba(114, 30, 155, 0.3));
  margin-bottom: 20px;
`;

const ChartFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;
`;

const FooterIcon = styled.div`
  background-color: #6b6b6b;
  color: white;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin: 0 10px;
`;

const FooterText = styled.div`
  color: #6b6b6b;
`;

const SummaryContainer = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #6b6b6b;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColorBlock = styled.div<{ color: string }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
  margin: 0 5px;
`;

const PipeText = styled.span`
  margin: 0 5px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  color: #6b6b6b;
  font-size: 16px;
`;

// Componente personalizado para o tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "5px 10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ color: payload[0].payload.color, margin: "0" }}>
          <strong>
            {payload[0].name}: {payload[0].value}%
          </strong>
        </p>
      </div>
    );
  }
  return null;
};

const PizzaChart = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<
    { name: string; value: number; color: string }[]
  >([]);
  const [dateRange, setDateRange] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        if (!backendUrl) {
          throw new Error("URL do backend não está definida");
        }

        const response = await axios.get<Denuncia[]>(`${backendUrl}/denuncias`);

        // Agrupar denúncias por nível de risco (usando o valor numérico)
        const denunciasPorRisco: Record<number, number> = {
          0: 0, // Baixo
          1: 0, // Médio
          2: 0, // Alto
        };

        response.data.forEach((denuncia) => {
          // Garantir que só contamos valores válidos (0, 1, 2)
          if ([0, 1, 2].includes(denuncia.risk)) {
            denunciasPorRisco[denuncia.risk]++;
          }
        });

        // Calcular percentuais
        const total = response.data.length;

        // Mapear para o formato esperado pelo gráfico
        const data = Object.entries(denunciasPorRisco).map(([key, value]) => {
          const riskLevel = parseInt(key);
          const percentual = total > 0 ? Math.round((value / total) * 100) : 0;

          return {
            name: riskMapping[riskLevel as keyof typeof riskMapping].name,
            value: percentual,
            color: riskMapping[riskLevel as keyof typeof riskMapping].color,
            count: value,
          };
        });

        setChartData(data);

        // Definir intervalo de datas (última atualização)
        if (response.data.length > 0) {
          const dates = response.data.map((d) => new Date(d.data));
          const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
          const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

          const formatDate = (date: Date) => {
            return `${date.getDate().toString().padStart(2, "0")}/${(
              date.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}`;
          };

          setDateRange(`${formatDate(minDate)} - ${formatDate(maxDate)}`);
        }

        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Erro ao carregar dados");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função vazia para o onClick
  const handleClick = () => {
    // Não faz nada, apenas para satisfazer a tipagem
  };

  if (loading) {
    return <LoadingContainer>Carregando dados...</LoadingContainer>;
  }

  if (error) {
    return <LoadingContainer>Erro: {error}</LoadingContainer>;
  }

  if (chartData.length === 0) {
    return <LoadingContainer>Nenhum dado disponível</LoadingContainer>;
  }

  return (
    <ChartContainer>
      <ChartInnerContainer>
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={180}
              innerRadius={0}
              fill="#8884d8"
              dataKey="value"
              onClick={handleClick}
              activeShape={{}}
              isAnimationActive={true}
              cursor="pointer"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  style={{ outline: "none" }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartInnerContainer>

      {/* Sumário na parte inferior com os quadrados coloridos */}
      <SummaryContainer>
        {chartData.map((item, index) => (
          <React.Fragment key={index}>
            <span>{item.value}%</span>
            <ColorBlock color={item.color} />
            <span>{item.name}</span>
            {index < chartData.length - 1 && <PipeText>|</PipeText>}
          </React.Fragment>
        ))}
      </SummaryContainer>

      {/* Rodapé com o ícone de calendário */}
      <ChartFooter>
        <FooterIcon>
          <span>&#128197;</span>
        </FooterIcon>
        <FooterText>{dateRange || "Sem dados"}</FooterText>
      </ChartFooter>
    </ChartContainer>
  );
};

export default PizzaChart;
