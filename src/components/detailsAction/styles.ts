import styled from "styled-components";

export const DetailsContainer = styled.div`
  width: 100%;
  flex: 2;
`;
export const DetailsTitle = styled.div`
  display: flex;
  align-items: end;
  gap: 2rem;
  padding-bottom: 1.2rem;
  border-bottom: 3px solid #5b0390;
`;
export const DetailsLogo = styled.img``;
export const Title: any = styled.h2`
  color: #5b0390;
  font-weight: bold;
  font-size: 4rem;
`;

export const Details = styled.div`
  padding: 1rem 0rem;
`;
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Status = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
`;
export const StatusText = styled.span`
  color: #5b0390;
  font-size: 1.4rem;
`;
export const StatusCircle = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid #f3cd01;
  background-color: #f3cd01;
`;
export const Date = styled.span`
  color: #5b0390;
  font-size: 1.5rem;
  font-style: italic;
`;
export const Text: any = styled.p`
  color: #5b0390;
  font-size: 1.8rem;
  padding: 2rem 0rem;
  max-height: 30rem;
`;

export const Evidence = styled.div``;

export const EvidenceTitle = styled.h3`
  font-size: 2rem;
  color: #5b0390;
  text-align: center;
  font-weight: bold;
  padding: 1rem 0rem;
`;

export const Slots = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const Slot = styled.div`
  height: 12rem;
  width: 12rem;
  background-color: #d9d9d9;
  transition: all ease 200ms;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    // box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const Delete = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export const Conclude = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export const AttrButton = styled.div`
  display: flex;
  background-color: #5b0390;
  width: auto;
  height: 3rem;
  padding: 1rem 3rem;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    scale: 1.05;
  }
`;

export const DeleteButton = styled.div`
  display: flex;
  background-color: #dd2445;
  width: auto;
  height: 3rem;
  padding: 1rem 3rem;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    scale: 1.05;
  }
`;

export const ConcludeButton = styled.div`
  display: flex;
  background-color: #00de3e;
  width: auto;
  height: 3rem;
  padding: 1rem 3rem;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    scale: 1.05;
  }
`;

export const Icon = styled.img`
  width: 1.8rem;
  height: 1.8rem;
`;

export const BtnTitle = styled.span`
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
`;
