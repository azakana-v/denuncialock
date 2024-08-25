import styled from "styled-components";

export const ReportContainer = styled.div`
    margin-top: 1rem;
    width: 96%;
    height: auto;
    background-color: #fff;
    border: 3px solid #5B0390;
    border-radius: 1rem;
    padding: 2rem;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
     &:hover {
        // transform: scale(1.01);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

` 

export const Row = styled.div`
    display: flex;
    gap: 0rem;
    justify-content: space-between;
`
export const ReportTitleDescription = styled.div`


`

export const Title = styled.h3`
    color: #5B0390;  
    font-size: 2rem;
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
    font-size: 1.2rem;

`

export const ReportDate = styled.div`
    display: flex;
 flex-direction: column;
 align-items: center;
`

export const Date = styled.span`
    color: #5B0390;
    font-size: 1rem;
    font-style: italic;
    white-space: nowrap;
    
`
export const Logo = styled.img`
margin-top: 1rem;
   width: 4rem;
   height: 4rem;
`
export const User = styled.div`
display: flex;
gap: 1rem;

`

export const UserIcon = styled.img`
width: 3rem;

`
export const UserName = styled.div`
display: flex;
flex-direction: column;
color: #5B0390;

`
export const Name = styled.span`
    color: #5B0390;
    font-size: 1.5rem;
    font-weight: bold;
`
export const Status = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;

`
export const StatusText = styled.div`
color: #5B0390;
font-size: 1rem;

`
export const StatusCircle = styled.div<{ status: string }>`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: ${({ status }) => {
        switch(status){
            case 'pendente':
                return '#F3CD01'
            
            case 'Em aberto':
                return 'green'

            case 'Encerrada':
                return 'red'
        }
    }};

`