import styled from 'styled-components';
import Main from '../components/main'
import MainAdmin from '../components/mainAdmin'
import { useUser } from '../UserContext';
import MainAgent from '../components/mainAgent';


const MainContainer = styled.div`
display: flex;
`;

function HomeUser(){

    const { admin, agent} = useUser();
    return(
        <MainContainer>
            {admin ? <MainAdmin/> : <Main />}  
        </MainContainer>
    )
}

export default HomeUser;