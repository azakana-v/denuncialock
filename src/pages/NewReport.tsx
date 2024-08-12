import styled from "styled-components";
import logo from '../assets/Logo2.svg'

const MainContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    height: 100%;
    padding-top: 8rem;
`

const Title = styled.div`
    display: flex;
    align-items: end;
    gap: 1rem;
`

const TitleLogo = styled.img`
   width: 100px;
   height: 90px;
`
const TitleText = styled.h2`
   font-size: 4.5rem;
   font-weight: bold;
   color: #5B0390;
`

function NewReport(){
    return(
        <MainContainer>
            <Title>
                <TitleLogo src={logo}/>
                <TitleText>Fomrulário de Denúncia</TitleText>
            </Title>
        </MainContainer>
    )
}

export default NewReport;