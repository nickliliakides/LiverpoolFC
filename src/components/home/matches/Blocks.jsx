import React, { useState, useEffect } from 'react';
import { fdbMatches } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';
import MBlock from '../../ui/mBlock';
import Slide from 'react-reveal/Slide';

const Blocks = () => {
  const [state, setState] = useState({
    matches: []
  });
 
  useEffect(() => {
    fdbMatches
      .limitToFirst(6)
      .orderByChild('final')
      .equalTo('No')
      .once('value')
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);
        // setState({ matches: reverseArray(matches) });
        setState({ matches })
      });
  }, []);

  const showMatches = matches =>
    matches
      ? matches.map(match => (
          <Slide bottom key={match.id}>
            <div className="item">
              <div className="wrapper">
                <MBlock match={match} />
              </div>
            </div>
          </Slide>
        ))
      : null;
  return <div className="home_matches">{showMatches(state.matches)}</div>;
};

export default Blocks;
