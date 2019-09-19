import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fdbPlayers } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

const AdminPlayers = () => {
  const [state, setState] = useState({
    isLoading: true,
    players: []
  });

  useEffect(() => {
    fdbPlayers
      .orderByChild('number')
      .once('value')
      .then(snapshot => {
        const players = firebaseLooper(snapshot);

        setState({
          ...state,
          isLoading: false,
          players
        });
      });
  });

  const CustomTableCell = withStyles(theme => ({
    head: {
      fontSize: 18,
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 16,
      fontFamily: 'Viga'
    }
  }))(TableCell);

  const { players } = state;
  return (
    <AdminLayout>
      <div>
        <Paper>
          <Table style={{ margin: '0 0 0 110px', width: '100vw' }}>
            <TableHead>
              <TableRow>
                <CustomTableCell align="center">First name</CustomTableCell>
                <CustomTableCell align="center">Last name</CustomTableCell>
                <CustomTableCell align="center">Number</CustomTableCell>
                <CustomTableCell align="center">Position</CustomTableCell>
                <CustomTableCell align="center">Nationality</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players &&
                players.map((player, i) => (
                  <TableRow key={i}>
                    <CustomTableCell align="center">
                      <Link to={`/admin_players/add_edit/${player.id}`}>
                        {player.name}
                      </Link>
                    </CustomTableCell>
                    <CustomTableCell align="center">
                      <Link to={`/admin_players/add_edit/${player.id}`}>
                        {player.lastname}
                      </Link>
                    </CustomTableCell>
                    <CustomTableCell align="center">
                      {player.number}
                    </CustomTableCell>
                    <CustomTableCell align="center">
                      {player.position}
                    </CustomTableCell>
                    <CustomTableCell align="center">
                      {player.nationality}
                    </CustomTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>

        <div className="admin_progress">
          {state.isLoading && (
            <CircularProgress thickness={9} style={{ color: '#e31923' }} />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPlayers;
