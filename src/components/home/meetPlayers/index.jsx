import React, { useState } from 'react';
import Stripes from '../../../Resources/images/redstripe.png'
import { Tag } from '../../ui/misc';
import Reveal from 'react-reveal';
import Cards from './Cards';

const MeetPlayers = () => {
  const [ state, setState] = useState(false)
 
    const styles = {
      marginLeft: '40px'
    }

    return ( 
      <Reveal
        fraction={0.7}
        onReveal={()=>{
            setState(true)
        }}
      >
        <div className="home_meetplayers"
          style={{ background: `#ffffff url(${Stripes})` }}
        >
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
                <Cards
                  show={state}
                />
              </div>
              <div className="home_text_wrapper">
                <div style={styles}>
                  <Tag
                    text='Meet'
                    bg='#000000'
                    size='80px'
                    color='#ffffff'
                    font='Righteous'
                    mb='20px'
                    mt='40px'
                  />
                </div>
                <div style={styles}>
                  <Tag
                    text='The'
                    bg='#000000'
                    size='80px'
                    color='#ffffff'
                    font='Righteous'
                    mb='20px'
                  />
                </div>
                <div style={styles}>
                  <Tag
                    text='Players'
                    bg='#000000'
                    size='80px'
                    color='#ffffff'
                    font='Righteous'
                    mb='20px'
                  />
                </div>
                <div style={styles}>
                  <Tag
                    className='btn'
                    text='Meet them here'
                    bg='#ffffff'
                    size='28px'
                    color='#1b0d31'
                    font='Righteous'
                    mb='30px'
                    link={true}
                    linkTo='/team'
                    add={{
                      border: '2px solid #1b0d31'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
     );
  }
 
export default MeetPlayers;