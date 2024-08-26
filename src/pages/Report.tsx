import Details from '../components/details'
import styled from "styled-components";
import TimeLine from "../components/timeLine";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IReportDetailsProps } from '../components/details/IReportDetailsProps';

const MainContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 8rem 6rem;
    `
const Divisor = styled.div`
min-height: 100%;
min-width: 3px;
max-width: 3px;
background-color:#5B0390;
flex: 1; 
margin: 0 10%;
`

function Report(){
    const baseUrl = "http://localhost:3000";
    const userId = '66c4bb87a93ff03ddc53d5cd';
    const { reportId } = useParams();
    const [report, setReport] = useState<IReportDetailsProps>({
        report:{
        titulo: "Aprendendo JavaScript",
        data: "2024-08-26",
        status: "Em progresso",
        descricao: "Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.Explorando os fundamentos do JavaScript moderno.",
        _id: "7891011",
      }});



      
      useEffect(() => {
        // setReport(xumba)
        const fetchReport = async () => {
            try{   
                
                const response = await axios.get(`${baseUrl}/denuncias/${reportId}/usuario/${userId}`);
                console.log(response.data)
                setReport(response.data);
            }catch(error){
                console.log('Erro ao buscar detalhes da denúncia: ', error)
            }
        };
        fetchReport();
    }, [reportId])
    return(
        <MainContainer>
            {report && <Details report={report.report} />}
            <Divisor></Divisor>
            <TimeLine />
        </MainContainer>
    )
}

export default Report;