import styled from "styled-components";

export const ReportContainer = styled.div`
    margin-top: 1rem;
    width: 100%;
    height: 22rem;
    background-color: #fff;
    border: 3px solid #5B0390;
    border-radius: 1rem;
    padding: 1rem;
` 

export const Row = styled.div`
    display: flex;
    gap: 5rem;
`
export const ReportTitleDescription = styled.div`

`

export const Title = styled.h3`
    color: #5B0390;  
    font-size: 2.4rem;
    font-weight: bold;
    &::before {
    content: '•'; 
    color: #5B0390; 
    position: relative;
    left: 0;
    top: 50%;
    transform: translateY(-50%); 
    font-size: 3.2rem; 
    margin-right: 1rem;
  }
`

export const Description = styled.span`
    color: #5B0390;
    font-size: 1.5rem;
`

export const ReportDate = styled.div`
    display: flex;
 flex-direction: column;
 align-items: center;
`

export const Date = styled.span`
    color: #5B0390;
    font-size: 1.2rem;
    font-style: italic;
    white-space: nowrap;
    
`
export const Logo = styled.img`
margin-top: 1rem;
   width: 4rem;
   height: 4rem;
`