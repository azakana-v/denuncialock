import styled from 'styled-components';
import Main from '../components/main'


const MainContainer = styled.div`
display: flex;
`;

function Reports(){
    return(
        <MainContainer>
            <Main />
        </MainContainer>
    )
}

export default Reports;