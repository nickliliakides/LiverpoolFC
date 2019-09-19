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
import { fdbMatches } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

const AdminMatches = () => {
  const [state, setState] = useState({
    isLoading: true,
    matches: []
  })

  useEffect(() => {
    fdbMatches.orderByChild('date').once('value').then((snapshot)=>{
      const matches = firebaseLooper(snapshot);
      setState({
        ...state,
        isLoading: false,
        matches: reverseArray(matches)
      })
    })
  },[])

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

    const { matches, isLoading } = state

    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table style={{ margin: '0 0 0 120px', width: '92vw' }}>
              <TableHead>
                <TableRow>
                  <CustomTableCell align="center">Date</CustomTableCell>
                  <CustomTableCell align="center">Match</CustomTableCell>
                  <CustomTableCell align="center">Result</CustomTableCell>
                  <CustomTableCell align="center">Final</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matches
                  && matches.map((match, i) => (
                      <TableRow key={i}>
                        <CustomTableCell align="center">
                          {match.date}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          <Link
                            to={`/admin_matches/add_edit/${match.id}`}
                          >
                            {match.local}{' '}
                            <strong style={{ color: '#e31923' }}>Vs</strong>{' '}
                            {match.away}
                          </Link>
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {match.resultLocal} <strong>-</strong>{' '}
                          {match.resultAway}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {match.final === 'Yes' ? (
                            <span className="matches_tag_red">Final</span>
                          ) : (
                            <span className="matches_tag_green">
                              Not played yet
                            </span>
                          )}
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
    );
  }

export default AdminMatches;