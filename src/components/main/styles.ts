import styled from "styled-components";

export const MainContainer = styled.div`
    width: 100%;
    max-height: 100vh;
    display: flex;
    margin-top: 4.5rem;
    padding: 4rem 6rem;
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
`