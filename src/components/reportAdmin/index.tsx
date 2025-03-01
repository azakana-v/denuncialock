import * as Styles from './styles';
import Logo from '../../assets/Logo2.svg'
import userIcon from '../../assets/icons/user.svg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface ReportProps {
    report: {
        titulo: string;
        descricao: string;
        data: string;
        autor: string;
        agente: string;
        status: string;
        id: string;
    };
}

function ReportAdmin({ report }: ReportProps){
    const navigate = useNavigate();
    const [agenteName, setAgentName] = useState<string | null>(null);

    
    

    const handleRedirect = () => {
        console.log('Report ID:', report.id);
        navigate(`report/${report.id}`)
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

    function capitalize(string: string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return(
        <Styles.ReportContainer onClick={handleRedirect}>
            <Styles.Row>
                <Styles.ReportTitleDescription>
                    <Styles.Title>
                        {report.titulo}
                    </Styles.Title>
                    {/* <Styles.Logo src={Logo}/> */}
                    <Styles.ReportDate>
                        <Styles.Date>
                            {formatDate(report.data)}
                        </Styles.Date>
                    </Styles.ReportDate>
                    {/* <Styles.Description>
                        {truncateDescription(report.descricao, 150)}
                    </Styles.Description> */}
                </Styles.ReportTitleDescription>
            </Styles.Row>
            <Styles.Row>
                <Styles.OwnerAndUserContainer>
                    <Styles.User>
                        <Styles.UserIcon src={userIcon} />
                        <Styles.UserName>
                            Responsável:
                            <Styles.Name>
                            {agenteName ? agenteName : "Requer atribuição!"}
                            </Styles.Name>
                        </Styles.UserName>
                    </Styles.User>
                    <Styles.User>
                        <Styles.UserIcon src={userIcon} />
                        <Styles.UserName>
                            Denunciante:
                            <Styles.Name>
                                {report.autor ? report.autor : "Anônimo"}
                            </Styles.Name>
                        </Styles.UserName>
                    </Styles.User>
                </Styles.OwnerAndUserContainer>
                <Styles.Status>
                    <Styles.StatusCircle status={report.status}></Styles.StatusCircle>
                    <Styles.StatusText>{capitalize(report.status)}</Styles.StatusText>
                </Styles.Status>
            </Styles.Row>
        </Styles.ReportContainer>
    )
}

export default ReportAdmin;