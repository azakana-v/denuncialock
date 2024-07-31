import SideBtn from '../sideButton';
import * as Styles from './styles';
// @ts-ignore
import profile from '../../assets/icons/profile.svg';
import report from '../../assets/icons/report.svg';
import customer from '../../assets/icons/customer-support.svg';
import question from '../../assets/icons/question.svg';

import { useNavigate } from 'react-router-dom'; 


function Sidebar(){
    const navigate = useNavigate();

    const handleRedirect = () =>{
        navigate('/')
    }
    return(
        <Styles.SideContainer>
            <div>
                <SideBtn icon={profile} toolTip='Perfil'/>
                <SideBtn icon={report} toolTip='Denúncia' onClick={handleRedirect}/>
                <SideBtn icon={customer} toolTip='Suporte'/>
            </div>
            <div>
            <Styles.GhostDiv />
                <SideBtn icon={question} toolTip='Ajuda'/>
       
            </div>
        </Styles.SideContainer>
    )
}

export default Sidebar;
