import React from 'react';
import { LivLogo } from '../ui/Icons';

const Footer = () => {
  return ( 
    <footer className="bck_red">
      <div className="footer_logo">
        <LivLogo
          link
          linkTo="/"
          width="70px"
          height="70px"
        />
      </div>
      <div className="footer_discl">
        Liverpool FC 2019. All rights reserved
      </div>
    </footer>
   );
}
 
export default Footer;