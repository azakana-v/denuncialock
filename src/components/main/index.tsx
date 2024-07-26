import * as Styles from './styles';
import Logo from '../../assets/Logo2.svg'
import Report from '../report';

function Main(){
    return(
        <Styles.MainContainer>
           <Styles.Grid>
            <Styles.Reports>
                <Styles.ReportsTitle>
                    <Styles.ReportsLogo src={Logo}/>
                    <Styles.Title>Denúncias recentes</Styles.Title>
                </Styles.ReportsTitle>
                <Styles.ReportList>
                    <Report />
                </Styles.ReportList>
            </Styles.Reports>
            <div>2</div>
            <div>3</div>
           </Styles.Grid>
        </Styles.MainContainer>
    )
}

export default Main;