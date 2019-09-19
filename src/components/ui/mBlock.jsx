import React from 'react';
import moment from 'moment';

const MBlock = ({
  match: { final, date, time, local, away, resultLocal, resultAway }
}) => {
  return (
    <div className="match_block">
      <div className="match_date">
        {final === 'Yes' ? `Played at ${moment(date).format("ddd MMM Do YYYY")} ${time} Local Time` : `Starts at ${moment(date).format("ddd MMM Do YYYY")} ${time} Local Time`}
      </div>
      <div className="match_wrapper">
        <div className="match_top">
          <div className="left">
            <div
              className="icon"
              style={{
                background: `url(/images/team_icons/${local.toLowerCase().replace(' ', '.')}.png)`
              }}
            />
            <div className="team_name">{local}</div>
          </div>
          <div className="right">{final === 'Yes' ? resultLocal : '-'}</div>
        </div>
        <div className="match_bottom">
          <div className="left">
            <div
              className="icon"
              style={{
                background: `url(/images/team_icons/${away.toLowerCase().replace(' ', '.')}.png)`
              }}
            />
            <div className="team_name">{away}</div>
          </div>
          <div className="right">{final === 'Yes' ? resultAway : '-'}</div>
        </div>
      </div>
    </div>
  );
};

export default MBlock;
