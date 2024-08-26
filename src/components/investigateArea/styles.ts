import styled from "styled-components";



export const AgentContainer = styled.div`
display:flex;
color: #5B0390;
padding: 1rem;
border: .2rem solid #EEEEEE;
border-radius: 1rem;
align-items: center;
`

export const MainContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: end;
flex: .8;
margin: 1.2rem;
`
export const InvestigateAreaContainer = styled.div`
border: .2rem solid #EEEEEE;
border-radius: 1rem;
height: 80%;

`
export const InvestigateAreaTittle = styled.h2`
text-align: center;
color: #5B0390;
border-bottom: .2rem solid #EEEEEE;
margin-bottom: .5rem;
`


export const CircleIcon = styled.div<{ status: string }>`
width: 1rem;
height: 1rem;
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
export const ReportsAttr = styled.span`
margin-left: .3rem;
`
export const ReportsAttrContainer= styled.div`
display: flex;
align-items: center;
`
export const Name = styled.p`

font-size: 2.0rem;
`
export const InfoContainer = styled.div`
margin-left: 1rem;
`
export const ProfileImage = styled.img`
border-radius: 50%;
width: 5rem;
height: 5rem;
`

