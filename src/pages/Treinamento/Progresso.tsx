import React from 'react';
import '../Pages/Treinamento.css';

const Progresso = (props: any) => {
  props.fn();
  return (
    <>
      <div className='progress-bar'>
        <p>Progresso de treinamento</p>

        <p>{props.percent}%</p>
      </div>
      <progress
        max={100}
        value={props.percent}
        className='classes-progress-bar'
      ></progress>
    </>
  );
};

export default Progresso;
