import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { LivLogo } from '../ui/Icons';

const Header = () => {
  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: '#e31923',
        padding: '12px',
        borderBottom: '3px solid #b5151c'
      }}
    >
      <Toolbar style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          <div className="header_logo">
            <LivLogo link linkTo="/" width="70px" height="70px" />
          </div>
        </div>

        <Link to="/team">
          <Button color="inherit">Team</Button>
        </Link>

        <Link to="/matches">
          <Button color="inherit">Matches</Button>
        </Link>

        <Link to="/signin">
          <Button color="inherit">Admin</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
