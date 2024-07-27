import * as Styles from './styles';
import Logo from '../../assets/Logo2.svg'
import Report from '../report';
import NewBtn from '../../assets/icons/newBtn.svg'
import comoFunciona from '../../assets/icons/comofunciona.svg'
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './scrollbar.css';

function Main(){

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
                            <Report />
                            <Report />
                            <Report />
                            <Report />
                        </Styles.ReportList>
                    </PerfectScrollbar>
            </Styles.Reports>
            <Styles.Action>
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