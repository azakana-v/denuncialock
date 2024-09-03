import styled from 'styled-components';
import Main from '../components/main'
import MainAdmin from '../components/mainAdmin'
import { useUser } from '../UserContext';
import MainAgent from '../components/mainAgent';
import { useNavigate } from 'react-router-dom';


const MainContainer = styled.div`
display: flex;
`;

function HomeUser(){
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('token');
        navigate('/');
    }

    const { admin, agent} = useUser();
    return(
        <MainContainer>
            <button onClick={handleLogout}>logout</button>
            {admin ? <MainAdmin/> : <Main />}  
        </MainContainer>
    )
}

export default HomeUser;