import Details from '../components/details'
import styled from "styled-components";
import TimeLine from "../components/timeLine";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IReportDetailsProps } from '../components/details/IReportDetailsProps';
import { useUser } from '../UserContext';
import InvestigateArea from '../components/investigateArea';
import InvestigateAction from '../components/investigateAction';

interface DivisorProps {
    admin?: boolean; // Prop opcional 'admin' que é um booleano
  }
  

const MainContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 8rem 6rem;
    `
const Divisor = styled.div<DivisorProps>`
min-height: 100%;
min-width: 3px;
max-width: 3px;
background-color:#5B0390;
flex: 1; 
margin: 0 10%;
margin-left: ${(props) => (props.admin ? '2%' : '10%')};

`

const agentXumbado = [{
    member: {
      nome: "Jose Fagundes",
      reports: 1,
      profile: "https://th.bing.com/th/id/OIP.0f3JWKSq-cAJK_IwP7mzYwAAAA?rs=1&pid=ImgDetMain",
    }
  }
  ]

function Action(){
    const { admin} = useUser();
    const baseUrl = "http://localhost:3000";
    const userId = '66c4bb87a93ff03ddc53d5cd';
    const { reportId } = useParams();
    const [report, setReport] = useState<IReportDetailsProps>();
    console.log(report);
    


      
      useEffect(() => {
        // setReport(xumba)
        const fetchReport = async () => {
            try{   
                
                const response = await axios.get(`${baseUrl}/denuncias/${reportId}/usuario/${userId}`);
                console.log(response.data)
                setReport({report:response.data});
            }catch(error){
                console.log('Erro ao buscar detalhes da denúncia: ', error)
            }
        };
        fetchReport();
    }, [reportId])
    return(
        <MainContainer>
            {/* <InvestigateAction /> 
           <InvestigateArea member={agentXumbado[0].member}></InvestigateArea>
            <Divisor admin></Divisor>
            <TimeLine /> */}
        </MainContainer>
    )
}

export default Action;