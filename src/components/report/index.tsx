import * as Styles from './styles';
import Logo from '../../assets/Logo2.svg'
import userIcon from '../../assets/icons/user.svg'
import { useNavigate } from 'react-router-dom';

interface ReportProps {
    report: {
        titulo: string;
        descricao: string;
        data: string;
        autor: string;
        status: string;
    };
}

function Report({ report }: ReportProps){
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/report')
        // Uso provisório antes da entrada de um possível ID para cada report
    }

    return(
        <Styles.ReportContainer onClick={handleRedirect}>
            <Styles.Row>
                <Styles.ReportTitleDescription>
                    <Styles.Title>
                        {report.titulo}
                    </Styles.Title>
                    <Styles.Description>
                        {report.descricao}
                    </Styles.Description>
                </Styles.ReportTitleDescription>
                <Styles.ReportDate>
                    <Styles.Date>
                        {report.data}
                    </Styles.Date>
                    <Styles.Logo src={Logo}/>
                </Styles.ReportDate>
            </Styles.Row>
            <Styles.Row>
                <Styles.User>
                    <Styles.UserIcon src={userIcon} />
                    <Styles.UserName>
                        Responsável:
                        <Styles.Name>
                            {report.autor}
                        </Styles.Name>
                    </Styles.UserName>
                </Styles.User>
                <Styles.Status>
                    <Styles.StatusCircle></Styles.StatusCircle>
                    <Styles.StatusText>{report.status}</Styles.StatusText>
                </Styles.Status>
            </Styles.Row>
        </Styles.ReportContainer>
    )
}

export default Report;