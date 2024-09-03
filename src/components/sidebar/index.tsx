import SideBtn from '../sideButton';
import * as Styles from './styles';
// @ts-ignore
import profile from '../../assets/icons/profile.svg';
import report from '../../assets/icons/report.svg';
import customer from '../../assets/icons/customer-support.svg';
import question from '../../assets/icons/question.svg';
import user from '../../assets/icons/user2.svg';

import { useNavigate } from 'react-router-dom'; 
import { useUser } from '../../UserContext';

function Sidebar(){
    const { logged, setLogged , admin} = useUser();
    const navigate = useNavigate();

    const handleRedirect = () =>{
        navigate('/home')
    }
    return(
        <>{logged ?         
        <Styles.SideContainer>
            <div>
                <SideBtn onClick={()=>{navigate("/Profile")}} icon={profile} toolTip='Perfil'/>
                <SideBtn icon={report} toolTip='Denúncia' onClick={handleRedirect}/>
                <SideBtn icon={customer} toolTip='Suporte'/>
                {admin ? <SideBtn icon={user} toolTip='Membros'/> : ""}
                
            </div>
            <div>
            <Styles.GhostDiv />
                <SideBtn icon={question} toolTip='Ajuda'/>
       
            </div>
        </Styles.SideContainer> : ""}

        </>
    )
}

export default Sidebar;
