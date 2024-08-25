import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Styles from './styles';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo2.svg'
import Report from '../report';
import NewBtn from '../../assets/icons/newBtn.svg'
import comoFunciona from '../../assets/icons/comofunciona.svg'
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './scrollbar.css';

function Main(){
    const baseUrl = "http://localhost:3000";
    const userId = '66c4bb87a93ff03ddc53d5cd';
    const navigate = useNavigate();
    const [reports, setReports] = useState([]); 

    useEffect(()=>{
       getReports();
    }, [])

    const getReports = async () => {
        try{
            const response = await axios.get(`${baseUrl}/denuncias/usuario/${userId}`);
            setReports(response.data);
        }catch(error){
            console.log('Erro ao buscar denúncias anteriores', error)
        }
    }
    const createReport = async () => {
        try{
            
        }catch(error){
            console.log('Erro ao gerar denúncia', error)
        }
    }


    const redirectNewReport = () => {
        navigate('/newReport')
    } 
    return(
        <Styles.MainContainer>
           <Styles.Grid>
            <Styles.Reports>
                <Styles.ReportsTitle>
                    <Styles.ReportsLogo src={Logo}/>
                    <Styles.Title>Denúncias recentes</Styles.Title>
                </Styles.ReportsTitle>
                <PerfectScrollbar style={{ width: '100%', height: '72vh' }}>
                        <Styles.ReportList>
                            {reports.map((report, index) => (
                                <Report key={index} report={report} />
                            ))}
                        </Styles.ReportList>
                    </PerfectScrollbar>
            </Styles.Reports>
            <Styles.Action onClick={redirectNewReport}>
                <Styles.NewBtn src={NewBtn}/>
                <Styles.NewReport>Adicionar Denúncia</Styles.NewReport>
            </Styles.Action>
            <Styles.Intro>
                <Styles.GhostDiv></Styles.GhostDiv>
                <Styles.SecondGhostDiv>
                <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                <Styles.IntroTitle>Bem-vindo ao seu canal de denúncias!</Styles.IntroTitle>
                <Styles.IntroText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium excepturi ea iure odit quaerat iusto aut facilis, soluta quisquam.</Styles.IntroText>
                </div>
                <Styles.IntroImage src={comoFunciona}/>
                <Styles.IntroLogo src={Logo}/>
                </Styles.SecondGhostDiv>
            </Styles.Intro>
           </Styles.Grid>
        </Styles.MainContainer>
    )
}

export default Main;