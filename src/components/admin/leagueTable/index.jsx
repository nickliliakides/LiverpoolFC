import React, { useState, useEffect } from 'react';
import { fdb } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AdminLayout from '../../../Hoc/AdminLayout';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

const TeamListTable = () => {
  const [state, setState] = useState({
    positions:[],
    isLoading: true
  })

  useEffect(() => {
    fdb.ref('positions').orderByChild('team').once('value').then((snapshot) => {
        
        const positions = firebaseLooper(snapshot);
        
        setState({
            positions,
            isLoading: false
        })
    })
  }, [])


  const CustomTableCell = withStyles(theme => ({
    head: {
      fontSize: 18,
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 16,
      fontFamily:'Viga'
    },
  }))(TableCell);

  console.log(state.positions)

  const { positions, isLoading } = state;
  
  return (
    <AdminLayout>
    <div>
      <Paper>
        <Table style={{ margin: '0 0 0 110px', width: '94vw' }}>
          <TableHead>
            <TableRow>
              <CustomTableCell align="center">Team</CustomTableCell>
              <CustomTableCell align="center">Wins</CustomTableCell>
              <CustomTableCell align="center">Draws</CustomTableCell>
              <CustomTableCell align="center">Loses</CustomTableCell>
              <CustomTableCell align="center">Points</CustomTableCell>
              <CustomTableCell align="center"></CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {positions
              && positions.map((team, i) => (               
                  <TableRow key={i}>                 
                    <CustomTableCell align="center">
                      {team.team}
                    </CustomTableCell>
                    <CustomTableCell align="center">
                    {team.w}
                    </CustomTableCell>
                    <CustomTableCell align="center">
                      {team.d}
                    </CustomTableCell>
                    <CustomTableCell align="center">
                    {team.l}
                    </CustomTableCell>
                    <CustomTableCell align="center">
                      {team.pts}
                    </CustomTableCell>
                    <CustomTableCell align="center">
                    <Link className='btn edit-btn' to={`/admin_table/team_edit/${team.id}`}>Edit</Link>
                    </CustomTableCell>                  
                  </TableRow>                  
                ))}    
          </TableBody>
        </Table>
      </Paper>

      <div className="admin_progress">
        {isLoading && (
          <CircularProgress
            thickness={9}
            style={{ color: '#e31923', margin: '20% auto'}}
          />
        )}
      </div>
    </div>
  </AdminLayout>
  )
}

export default TeamListTable
