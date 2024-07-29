import styled from "styled-components";

export const DetailsContainer = styled.div`
    width: 100%;
`
export const DetailsTitle = styled.div`
    display: flex;
    align-items: end;
    gap: 2rem;
    padding-bottom: 1.2rem;
    border-bottom: 3px solid #5B0390;
`
export const DetailsLogo = styled.img`
   
`
export const Title = styled.h2`
  color: #5B0390;
  font-weight: bold;
  font-size: 5.5rem;
`

export const Details = styled.div`
    padding: 1rem 0rem;
`
export const Row = styled.div`
    display: flex;
    justify-content: space-between;
`
export const Status = styled.div`
    display: flex;
    gap: 0.6rem;
    align-items: center;
`
export const StatusText = styled.span`
color: #5B0390;
font-size: 1.4rem;
`
export const StatusCircle = styled.div`
width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 1px solid #F3CD01;
    background-color: #F3CD01;
`
export const Date = styled.span`
color: #5B0390;
font-size: 1.5rem;
font-style: italic;
`
export const Text = styled.p`
color: #5B0390;
font-size: 1.8rem;

 padding: 2rem 0rem;
 max-height: 38rem;

`

export const Evidence = styled.div``

export const EvidenceTitle = styled.h3`
    font-size: 2rem;
    color: #5B0390;
    text-align: center;
    font-weight: bold;
    padding: 1rem 0rem;
`

export const Slots = styled.div`
    display: flex;
    justify-content: space-around;
`
export const Slot = styled.div`
    height: 12rem;
    width: 12rem;
    background-color: #D9D9D9;
    transition: all ease 200ms;
    cursor: pointer;
     &:hover {
        transform: scale(1.05);
        // box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`

export const Delete = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
`

export const DeleteButton = styled.div`
    display: flex;
    background-color: #DD2445;
    width: auto;
    height: 3rem;
    padding: 1rem 3rem;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: 0.5rem;
    cursor: pointer
`

export const Icon = styled.img`
    width: 1.8rem;
    height: 1.8rem;
`

export const BtnTitle = styled.span`
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
`