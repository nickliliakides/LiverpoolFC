import React from 'react';
import { Link } from 'react-router-dom';
import liverpoolLogo from '../../Resources/images/liverpool.png';

export const LivLogo = (props) => {
  const template = <div
    className="img_cover"
    style={{
      width: props.width,
      height: props.height,
      background:`url(${liverpoolLogo}) no-repeat`
    }}
  />
  
  if(props.link){
    return (
      <Link to={props.linkTo} className="link_logo">
        {template}
      </Link>
    )
  }else {
    return template
  }
}