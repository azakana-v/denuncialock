import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Styles from "./styles";
import TimeLineItem from "../timeLineItem";
import { useUser } from "../../UserContext";

function TimeLine({ reportId }: { reportId: string }) {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const { userId } = useUser();
  const [timeLineData, setTimeLineData] = useState([]);

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await axios.get(
          `${baseUrl}/denuncias/${reportId}/usuario/${userId}`
        );
        const timeline = response.data.timeline;
        console.log("Resposta da API quanto a timeline:", timeline); // Verifique a resposta
        setTimeLineData(timeline); // Certifique-se de que você está substituindo corretamente o estado
      } catch (error) {
        console.error("Erro ao buscar denúncia:", error);
      }
    }

    fetchReport();
  }, [reportId, userId]);

  return (
    <Styles.DetailsContainer>
      <Styles.Title>Progresso de denúncia</Styles.Title>
      <Styles.FakeBorder />
      {timeLineData.length > 0 ? (
        <Styles.TimeLineContainer>
          {timeLineData.map((data, index) => (
            <TimeLineItem data={data} key={index} odd={index % 2 !== 0} />
          ))}
        </Styles.TimeLineContainer>
      ) : (
        <p>Nenhum progresso registrado ainda.</p>
      )}
    </Styles.DetailsContainer>
  );
}

export default TimeLine;
