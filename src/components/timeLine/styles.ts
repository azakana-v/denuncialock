import styled from "styled-components";

export const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const Title = styled.h2`
  font-size: 2rem;
  color: #5b0390;
  margin-bottom: 1rem;
`;
export const FakeBorder = styled.div`
  background-color: #2c088d;
  height: 2px;
  width: 30%;
`;

export const TimeLineContainer = styled.div`
   display: flex;
  flex-direction: column;
   justify-content: space-between;
  position: relative;
  margin: 40px 0px;
  height: 60%;
  width: 100%;
  &:after {
    background-color: #5B0390;
    content: "";
    position: absolute;
    left: calc(50% - 2px);
    width: 0.5rem;
    height: 100%;
  }
`;
