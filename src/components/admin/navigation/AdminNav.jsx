import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import { firebase } from '../../../firebase';

const AdminNav = () => {

  const links = [
    {
      title:'Matches',
      linkTo: '/admin_matches'
    },
    {
      title:'Add Match',
      linkTo: '/admin_matches/add_edit'
    },
    {
      title:'Players',
      linkTo: '/admin_players'
    },
    {
      title:'Add Player',
      linkTo: '/admin_players/add_edit'
    },
    {
      title:'League Table',
      linkTo: '/admin_table'
    }
  ]

  const styles = {
    color: '#ffffff',
    fontWeight: '300',
    borderBottom:'1px solid #353535',
  }

  const renderItems = () => (
    links.map(link => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem button style={styles}>
          {link.title}
        </ListItem>
      </Link>
    ))
  )

  const logoutHandler = () => {
    firebase.auth().signOut().then(()=> {
      console.log('Log out succesfull')
    },(error)=> {
      console.log('Error logging out')
    })
  }

  return ( 
      <div style={{marginTop:'5px'}}>
        {renderItems()}
        <ListItem button style={styles} onClick={()=> logoutHandler()}>
          Log out
        </ListItem>
      </div>
   );
}
 
export default AdminNav;