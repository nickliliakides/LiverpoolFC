import React, { useState } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import Virgil from '../../../Resources/images/players/liverpoolteam/DF/virgil_van_dijk.png';
import Card from '../../ui/card';

const Cards = ({show}) => {
  const [state] = useState({
    show,
    cards: [
      {
        bottom: 90,
        left: 300
      },
      {
        bottom: 60,
        left: 200
      },
      {
        bottom: 30,
        left: 100
      },
      {
        bottom: 0,
        left: 0
      },
    ]
  });

  const showAnimatedCards = () =>
    state.cards.map((card, i) => (
      <Animate
        key={i}
        show={show}
        start={{
          left: 0,
          bottom: 0
        }}
        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: { duration: 700, ease: easePolyOut }
        }}
      >
        {({ left, bottom }) => (
          <div
            style={{
              position: 'absolute',
              left,
              bottom
            }}
          >
            <Card number="4" name="Virgil" lastname="van Dijk" bg={Virgil} nationality="Netherlands"/>
          </div>
        )}
      </Animate>
    ));

  return <div>{showAnimatedCards()}</div>;
};

export default Cards;
