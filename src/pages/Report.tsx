import Details from '../components/details'
import styled from "styled-components";
import TimeLine from "../components/timeLine";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MainContainer = styled.div`
    display: flex;
    width: 100%;
   padding: 5rem 6rem;
`

function Report(){
    const baseUrl = "http://localhost:3000";
    const userId = '66c4bb87a93ff03ddc53d5cd';
    const { reportId } = useParams();
    const [report, setReport] = useState(null);

    useEffect(() => {
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
            {report && <Details report={report} />}
            <TimeLine />
        </MainContainer>
    )
}

export default Report;