import React from 'react';

import style from './iconStyle.module.scss'

export function Tick ( props ){

  return (
    <svg className={ props.styling } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    <title>icn_greentick</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
    <path className={ style.tick } d="M10,0A10,10,0,1,0,20,10,10,10,0,0,0,10,0Zm6,7.91L9,14.83a.43.43,0,0,1-.61,0L4,10.4a.43.43,0,0,1,0-.61L5.32,8.45a.45.45,0,0,1,.61,0l2.49,2.49a.43.43,0,0,0,.61,0l5-5a.43.43,0,0,1,.61,0L16,7.3A.43.43,0,0,1,16,7.91Z"/></g></g>
    </svg>
  )
}