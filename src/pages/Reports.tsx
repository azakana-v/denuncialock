import styled from 'styled-components';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Main from '../components/main'


const MainContainer = styled.div`
display: flex;
`;

function Reports(){
    return(
        <MainContainer>
        <Sidebar />
        <Main />
    </MainContainer>
    )
}

export default Reports;