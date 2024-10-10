import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IReportDetailsProps } from "../components/details/IReportDetailsProps";

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 8rem 6rem;
`;

function Action() {
  const baseUrl = "http://localhost:3000";
  const userId = "66c4bb87a93ff03ddc53d5cd";
  const { reportId } = useParams();
  const [report, setReport] = useState<IReportDetailsProps>();
  console.log(report);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/denuncias/${reportId}/usuario/${userId}`
        );
        console.log(response.data);
        setReport({ report: response.data });
      } catch (error) {
        console.log("Erro ao buscar detalhes da denúncia: ", error);
      }
    };
    fetchReport();
  }, [reportId]);
  return <MainContainer></MainContainer>;
}

export default Action;
