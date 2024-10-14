import React, { useEffect, useState } from 'react';
import { videoArray } from './videoArray';
import olho from './olho.png';
import './Treinamento.css';
import confirmacao from '../imgs/confirmacao.png';

const ListaDeVideos = (props: any) => {
  console.log(props.dados);
  return (
    <>
      {props.dataSource.map((item: any, index: any) => {
        return (
          <div key={index} className='class-container'>
           
            <div>
              <img
                className='view-image'
                alt='confirmado'
              src={olho}
              ></img>
            </div>
            <p className='clickableClass' onClick={() => props.fn(index)}>
              {item.titulo}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default ListaDeVideos;
