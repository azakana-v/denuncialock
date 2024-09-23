import * as Styles from './styles';
import Logo from '../../assets/Logo2.svg'
import userIcon from '../../assets/icons/user.svg'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';

interface ReportProps {
    report: {
        titulo: string;
        descricao: string;
        data: string;
        autor: string;
        status: string;
        id: string;
    };
}

function Report({ report }: ReportProps){
    const navigate = useNavigate();
    const { admin, agent} = useUser();

    const handleRedirect = () => {
        navigate( `report/${report.id}`)
    }

    const truncateDescription = (description: string, maxLength: number) => {
        if (description.length <= maxLength) return description;
        return description.slice(0, maxLength) + '...';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return(
        <Styles.ReportContainer onClick={handleRedirect}>
            <Styles.Row>
                <Styles.ReportTitleDescription>
                    <Styles.Title>
                        {report.titulo}
                    </Styles.Title>
                    <Styles.Description>
                        {truncateDescription(report.descricao, 150)}
                    </Styles.Description>
                </Styles.ReportTitleDescription>
                <Styles.ReportDate>
                    <Styles.Date>
                        {formatDate(report.data)}
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
                    <Styles.StatusCircle status={report.status}></Styles.StatusCircle>
                    <Styles.StatusText>{report.status}</Styles.StatusText>
                </Styles.Status>
            </Styles.Row>
        </Styles.ReportContainer>
    )
}

export default Report;