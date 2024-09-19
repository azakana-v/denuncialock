import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Styles from './styles';
import TimeLineItem from '../timeLineItem';
import { useUser } from '../../UserContext';

function TimeLine({ reportId }: { reportId: string }) {
    const baseUrl = "http://localhost:3000";
    const {userId} = useUser();
  const [timeLineData, setTimeLineData] = useState([]);

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await axios.get(`${baseUrl}/denuncias/${reportId}/usuario/${userId}`);
        console.log('Resposta da API quanto a timeline:', response.data); // Verifique a resposta
        setTimeLineData(response.data.timeline);
        console.log('Dados da timeline:', response.data.timeline); // Verifique o estado atualizado
      } catch (error) {
        console.error('Erro ao buscar denúncia:', error);
      }
    }
  
    fetchReport();
  }, [reportId]);

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
