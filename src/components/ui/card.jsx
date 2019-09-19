import React from 'react';

const Card = ({ bg, number, name, lastname, nationality }) => {
  return ( 
      <div className="player_card_wrapper">
        <div className="player_card_thmb"
          style={{background:`#f2f9ff url(${bg})`}}
        >
        </div>
          <div className="player_card_nfo">
            <div className="player_card_number">
              {number}
            </div>
            <div className="player_card_name">
              <span>{name}</span>
              <span>{lastname}</span>
              <p>Nationality:{' '}{nationality}</p>
            </div>
          </div>      
      </div>
   );
}
 
export default Card;