import React, { useEffect } from 'react';
import Featured from './featured';
import Matches from './matches'
import MeetPlayers from './meetPlayers';
import Promotion from './promotion';

const Home = () => {
  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, [])
  return ( 
    <div className="bck_red">
      <Featured/>
      <Matches/>
      <MeetPlayers/>
      <Promotion/>
    </div>
   );
}
 
export default Home;