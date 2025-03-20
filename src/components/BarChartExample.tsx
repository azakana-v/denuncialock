import React from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// 1. Defina a interface do seu dado
interface ChartData {
  name: string;
  value: number;
}

// 2. Defina as props que o componente irá receber
interface BarChartExampleProps {
  data: ChartData[];
  title?: string;
  subtitle?: string;
  color?: string;
}

// 3. Crie um styled container para o gráfico
const ChartContainer = styled.div`
  width: 100%;
  max-width: 600px; /* ajuste conforme o layout */
  min-width: 1000px;
  height: 550px; /* ajuste conforme o layout */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 4. Você pode criar um styled component para títulos, legendas, etc.
const Title = styled.h2`
  font-size: 1.5rem;
  color: #6a1b9a; /* cor roxa de exemplo */
  margin: 0;
`;

const Subtitle = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 16px;
`;

const BarChartGraph: React.FC<BarChartExampleProps> = ({
  data,
  title = "Tipo de denúncia",
  subtitle = "19/11 - 19/12",
  color = "#9C27B0", // roxo, mas pode ajustar
}) => {
  return (
    <ChartContainer>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>

      {/* ResponsiveContainer ajusta o gráfico ao tamanho do container */}
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* 
            Bar -> fill define a cor. 
            dataKey -> a propriedade do objeto de data que deve ser usada para gerar a altura da barra.
          */}
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default BarChartGraph;
