import React from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import player from '../../../Resources/images/SalahCover.png';

const Text = () => {
  const animateNumber = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        rotate: 0
      }}
      enter={{
        opacity: 1,
        rotate: [360],
        timing: { duration: 1000, ease: easePolyOut }
      }}
    >
      {({ opacity, rotate }) => {
        return (
          <div
            className="featured_number"
            style={{
              opacity,
              transform: `translate(230px,170px) rotateY(${rotate}deg)`
            }}
          >
            18
          </div>
        );
      }}
    </Animate>
  );

  const animateFirst = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 503,
        y: 450
      }}
      enter={{
        opacity: [1],
        x: [240],
        y: [450],
        timing: { duration: 500, ease: easePolyOut }
      }}
    >
      {({ opacity, x, y }) => {
        return (
          <div
            className="featured_first"
            style={{
              opacity,
              transform: `translate(${x}px,${y}px)`
            }}
          >
            League
          </div>
        );
      }}
    </Animate>
  );

  const animateSecond = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 503,
        y: 582
      }}
      enter={{
        opacity: [1],
        x: [240],
        y: [582],
        timing: { delay: 250, duration: 500, ease: easePolyOut }
      }}
    >
      {({ opacity, x, y }) => {
        return (
          <div
            className="featured_second"
            style={{
              opacity,
              transform: `translate(${x}px,${y}px)`
            }}
          >
            Championships
          </div>
        );
      }}
    </Animate>
  );

  const animatePlayer = () => (
    <Animate
      show={true}
      start={{
        opacity: 0
      }}
      enter={{
        opacity: [1],
        timing: { delay: 600, duration: 500, ease: easePolyOut }
      }}
    >
      {({ opacity }) => {
        return (
          <div
            className="featured_player"
            style={{
              opacity,
              background: `url(${player})`,
              transform: 'translate(550px, 200px)'
            }}
          />
        );
      }}
    </Animate>
  );

  return (
    <div className="featured_text">
      {animateNumber()}
      {animateFirst()}
      {animateSecond()}
      {animatePlayer()}
    </div>
  );
};

export default Text;
