import styled from "styled-components";

export const MainContainer = styled.div`
    width: 100%;
    max-height: 100vh;
    display: flex;

    padding: 8rem 6rem;
`

export const Grid = styled.div`
    display: inline-grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr 320px 320px;
`

export const Reports = styled.div`
    
`

export const ReportsTitle = styled.div`
    display: flex;
    align-items: end;
    gap: 1.2rem;
    font-size: 3rem;    
    color: #5B0390;
    border-bottom: 0.2rem solid #5B0390;
    padding-bottom: 1rem;
`

export const ReportsLogo = styled.img`
`

export const Title = styled.h2`
`

export const ReportList = styled.div`

    max-height: 70vh;
`

export const Action = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    padding-bottom: 2.5rem;
   
`

export const NewBtn = styled.img`
    cursor: pointer;
    height: 6rem;
    width: 6rem;
`

export const NewReport = styled.span`
    cursor: pointer;
    color: #5B0390;
    font-size: 2rem;
    font-weight: bold;
`

export const Intro = styled.div`
    display: flex;


`

export const IntroTitle = styled.h3`
    font-size: 2.6rem;
    color: #5B0390;
`

export const IntroText = styled.p`
    font-size: 2.2rem;
    color: #5B0390;
    text-align: center;
`

export const IntroImage = styled.img`
    
`

export const IntroLogo = styled.img`
     width: 5rem;
    height: 5rem;
`

export const GhostDiv = styled.div`
     width: 1rem;
    height: 65%;
    background-color: #2C088D;
    margin: auto auto;
`

export const SecondGhostDiv = styled.div`
     max-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10rem 2.5rem;
`