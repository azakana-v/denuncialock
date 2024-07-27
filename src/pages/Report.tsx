import Sidebar from "../components/sidebar";
import styled from "styled-components";

const MainContainer = styled.div`
    display: flex;
`

function Report(){
    return(
        <MainContainer>
            <Sidebar />
            <h1>Hello World!</h1>
        </MainContainer>
    )
}

export default Report;