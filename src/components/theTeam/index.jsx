import React, { useState, useEffect } from 'react';
import Card from '../ui/card';
import Fade from 'react-reveal/Fade';
import { fdbPlayers, firebase } from '../../firebase';
import { firebaseLooper } from '../ui/misc';
import { Promise } from 'core-js';

const Team = () => {
  const [state, setState] = useState({
    loading: true,
    players: []
  });

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    fdbPlayers
      .orderByChild('number')
      .once('value')
      .then(snapshot => {
        const players = firebaseLooper(snapshot);
        let promises = [];

        for (let key in players) {
          promises.push(
            new Promise((res, rej) => {
              firebase
                .storage()
                .ref('players')
                .child(players[key].image)
                .getDownloadURL()
                .then(url => {
                  players[key].url = url;
                  res();
                });
            })
          );
        }

        Promise.all(promises).then(() => {
          setState({
            loading: false,
            players
          });
        });
      });
  }, []);

  const showPlayersByCategory = category =>
    state.players &&
    state.players.map((player, i) => {

      return (
        player.position === category && (
          <Fade left delay={i * 100} key={i}>
            <div className="item">
              <Card
                number={parseInt(player.number)}
                name={player.name}
                lastname={player.lastname}
                nationality={player.nationality}
                bg={player.url}
              />
            </div>
          </Fade>
        )
      );
    });

  return (
    <div className="the_team_container">
      {!state.loading && (
        <div>
          <div className="team_category_wrapper">
            <div className="title">Manager</div>
            <div className="team_cards">
              <Fade left delay={100}>
                <div className="item">
                  <Card
                    number="M"
                    name="Jürgen"
                    lastname="Klopp"
                    nationality="Germany"
                    bg="https://firebasestorage.googleapis.com/v0/b/liverpoolfc-de252.appspot.com/o/players%2Fklopp.png?alt=media&token=eb8cebcc-796b-4ad4-99ec-15f794f60981"
                  />
                </div>
              </Fade>
            </div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Goalkeepers</div>
            <div className="team_cards">
              {showPlayersByCategory('Goalkeeper')}
            </div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Defenders</div>
            <div className="team_cards">
              {showPlayersByCategory('Defender')}
            </div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Midfielders</div>
            <div className="team_cards">
              {showPlayersByCategory('Midfielder')}
            </div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Attackers</div>
            <div className="team_cards">
              {showPlayersByCategory('Attacker')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
