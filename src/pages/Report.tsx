import Details from '../components/details'
import styled from "styled-components";
import TimeLine from "../components/timeLine";


const MainContainer = styled.div`
    display: flex;
    width: 100%;
   padding: 5rem 6rem;
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