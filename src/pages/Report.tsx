import Details from '../components/details'
import styled from "styled-components";
import TimeLine from "../components/timeLine";

const MainContainer = styled.div`
    display: flex;
    margin-top: 4.5rem;
    width: 100%;
   padding: 4rem 6rem;
 
`

function Report(){
    return(
        <MainContainer>
            <Details />
            <TimeLine />
        </MainContainer>
    )
}

export default Report;