import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import NodeGroup from 'react-move/NodeGroup'

class MatchesList extends Component {
  state = {
    matchesList: []
  };

  static getDerivedStateFromProps(props, state) {
    return (state = {
      matchesList: props.matches
    });
  }

  showMatches = () =>
    this.state.matchesList && (
      <NodeGroup
        data={this.state.matchesList}
        keyAccessor={d => d.id}
        start={() => ({
          opacity: 0,
          x: -200
        })}
        enter={(d, i) => ({
          opacity: [1],
          x: [0],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut }
        })}
        update={(d, i) => ({
          opacity: [1],
          x: [0],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut }
        })}
        leave={(d, i) => ({
          opacity: [0],
          x: [-200],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut }
        })}
      >
        {nodes => (
          <div>
            {nodes.map(({ key, data, state: { x, opacity } }) => (
              <div
                key={key}
                className="match_box_big"
                style={{
                  opacity,
                  transform: `translate(${x}px)`
                }}
              >
                <div className="block_wrapper">
                  <div className="block">
                    <div
                      className="icon"
                      style={{
                        background: `url(/images/team_icons/${data.local.toLowerCase().replace(' ', '.')}.png)`
                      }}
                    />
                    <div className="team">{data.local}</div>
                    <div className="result">{data.resultLocal}</div>
                  </div>

                  <div className="block">
                    <div
                      className="icon"
                      style={{
                        background: `url(/images/team_icons/${data.away.toLowerCase().replace(' ', '.')}.png)`
                      }}
                    />
                    <div className="team">{data.away}</div>
                    <div className="result">{data.resultAway}</div>
                  </div>
                </div>

                <div className="block_wrapper nfo">
                  <div><strong>Date: </strong>{data.date}</div>
                  <div><strong>Time: </strong>{data.time}</div>
                  <div><strong>Stadium: </strong>{data.stadium}</div>
                </div>

              </div>
            ))}
          </div>
        )}
      </NodeGroup>
    );

  render() {
    return <div>{this.showMatches()}</div>;
  }
}
 
export default MatchesList;