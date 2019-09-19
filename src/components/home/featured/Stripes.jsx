import React, { useState } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

const Stripes = () => {
  const [state] = useState({
    stripes: [
      {
        background: '#e31923',
        left: 120,
        rotate: 25,
        top: -260,
        delay: 0
      },
      {
        background: '#ffffff',
        left: 360,
        rotate: 25,
        top: -397,
        delay: 150
      },
      {
        background: '#e31923',
        left: 600,
        rotate: 25,
        top: -498,
        delay: 300
      }
    ]
  });

  const showStripes = () =>
    state.stripes.map((stripe, i) => (
      <Animate
        key={i}
        show={true}
        start={{
          background: '#ffffff',
          opacity: 0,
          left: 0,
          rotate: 0,
          top: 0
        }}
        enter={{
          background: stripe.background,
          opacity: 1,
          left: stripe.left,
          rotate: [stripe.rotate],
          top: stripe.top,
          timing: { delay: stripe.delay, duration: 150, ease: easePolyOut }
        }}
      >
        {({ background, opacity, left, rotate, top }) => {
          return (
            <div
              className="stripe"
              style={{
                background,
                opacity,
                transform: `rotate(${rotate}deg) translate(${left}px, ${top}px)`
              }}
            />
          );
        }}
      </Animate>
    ));

  return <div className="featured_stripes">{showStripes()}</div>;
};

export default Stripes;
