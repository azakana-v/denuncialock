import * as Styles from './styles';
import Logo from '../../assets/Logo2.svg'

function Report(){
    return(
        <Styles.ReportContainer>
            <Styles.Row>
                <Styles.ReportTitleDescription>
                    <Styles.Title>
                        Título da denúncia
                    </Styles.Title>
                    <Styles.Description>
                    Descrição denúncia: Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium excepturi ea iure odit quaerat iusto aut facilis, soluta quisquam....
                    </Styles.Description>
                </Styles.ReportTitleDescription>
                <Styles.ReportDate>
                    <Styles.Date>
                        Data: 11/09/2001
                    </Styles.Date>
                    <Styles.Logo src={Logo}/>
                </Styles.ReportDate>
            </Styles.Row>
        </Styles.ReportContainer>
    )
}

export default Report;