import styled, { css } from 'styled-components';

export const TimeLineItem = styled.div<{ odd: boolean }>`
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
    position: relative;
    margin: 10px 0;
    width: 50%;


  ${({ odd }) =>
    odd &&
    css`
      align-self: flex-end;
      justify-content: flex-start;
      padding-left: 30px;
      padding-right: 0;
    `}
`;

export const Circle = styled.div<{ odd: boolean }>`
  background-color: #5B0390;
  border: 2px solid #5B0390;
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 10px);
  width: 20px;
  height: 20px;
  z-index: 100;

  ${({ odd }) =>
    odd
      ? css`
          right: auto;
          left: -10px;
        `
      : css`
          right: -10px;
          left: auto;
        `}
`;