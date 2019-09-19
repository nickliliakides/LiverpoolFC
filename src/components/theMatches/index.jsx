import React, { useState, useEffect } from 'react';
import { fdbMatches } from '../../firebase';
import { firebaseLooper, reverseArray } from '../ui/misc';
import LeagueTable from './table';
import MatchesList from './matchesList';

const MatchesAll = () => {
  const [state, setState] = useState({
    matches: [],
    loading: true,
    filterMatches: [],
    playedFilter: 'All',
    resultFilter: 'All'
  });

  useEffect(() => {
    fdbMatches
      .orderByChild('date')
      .once('value')
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);

        setState({
          ...state,
          loading: false,
          matches,
          filterMatches: matches
        });
      });
  }, []);

  const showPlayed = played => {
    const filteredMatches = state.matches.filter(match => {
      return match.final === played;
    });
    setState({
      ...state,
      filterMatches: played === 'All' ? state.matches : played === 'Yes' ? reverseArray(filteredMatches) : filteredMatches,
      playedFilter: played,
      resultFilter: 'All'
    });
  };

  const showResult = result => {
    const filteredMatches = state.matches.filter(match => {
      return match.result === result;
    });
    setState({
      ...state,
      filterMatches: result === 'All' ? state.matches : filteredMatches,
      playedFilter: 'All',
      resultFilter: result
    });
  };

  const { playedFilter, resultFilter, filterMatches } = state;

  return (
    <div className="the_matches_container">
      <div className="the_matches_wrapper">
        <div className="left">
          <div className="match_filters">
            <div className="match_filters_box">
              <div className="tag">Show Match</div>
              <div className="cont">
                <div
                  className={`option ${playedFilter === 'All' ? 'active' : ''}`}
                  onClick={() => showPlayed('All')}
                >
                  All
                </div>
                <div
                  className={`option ${playedFilter === 'Yes' ? 'active' : ''}`}
                  onClick={() => showPlayed('Yes')}
                >
                  Played
                </div>
                <div
                  className={`option ${playedFilter === 'No' ? 'active' : ''}`}
                  onClick={() => showPlayed('No')}
                >
                  Not played
                </div>
              </div>
            </div>

            <div className="match_filters_box">
              <div className="tag">Show Match</div>
              <div className="cont">
                <div
                  className={`option ${resultFilter === 'All' ? 'active' : ''}`}
                  onClick={() => showResult('All')}
                >
                  All
                </div>
                <div
                  className={`option ${resultFilter === 'W' ? 'active' : ''}`}
                  onClick={() => showResult('W')}
                >
                  Wins
                </div>
                <div
                  className={`option ${resultFilter === 'D' ? 'active' : ''}`}
                  onClick={() => showResult('D')}
                >
                  Draws
                </div>
                <div
                  className={`option ${resultFilter === 'L' ? 'active' : ''}`}
                  onClick={() => showResult('L')}
                >
                  Losses
                </div>
              </div>
            </div>
          </div>
          <MatchesList matches={filterMatches} />
        </div>
        <div className="right">
          <LeagueTable />
        </div>
      </div>
    </div>
  );
};

export default MatchesAll;
