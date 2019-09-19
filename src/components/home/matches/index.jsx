import React from 'react';
import { Tag } from '../../ui/misc';
import Blocks from './Blocks';

const MatchesHome = () => {
  return ( 
    <div className="home_matches_wrapper">
      <div className="container match-cont">
        <Tag
          bg='#e31923'
          size='50px'
          color='#ffffff'
          text='Matches'
          mt='20px'
        />

        <Blocks/>

        <Tag
          className='btn'
          link
          linkTo="/matches"
          bg='#ffffff'
          size='24px'
          color='#e31923'
          text='See all matches'
          mt='16px'
        />
        
      </div>
    </div>
   );
}
 
export default MatchesHome;