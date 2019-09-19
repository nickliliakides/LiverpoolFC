import React from 'react';
import Layout from './Hoc/Layout'
import { Switch } from 'react-router-dom';
import Home from './components/home';
import SignIn from './components/signIn';
import Dashboard from './components/admin/Dashboard';
import PrivateRoute from './components/authRoutes/privateRoutes';
import PublicRoute from './components/authRoutes/publicRoutes';
import AdminMatches from './components/admin/matches/index';
import AddEditMatch from './components/admin/matches/addEditMatch';
import AdminPlayers from './components/admin/players/index';
import AddEditPlayers from './components/admin/players/addEditPlayers';
import Team from './components/theTeam/index';
import MatchesAll from './components/theMatches';
import NotFound from './components/ui/notFound';
import TeamListTable from './components/admin/leagueTable/index';
import EditTable from './components/admin/leagueTable/editTable';


const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <PublicRoute {...props} exact component={Home} path="/" />
        <PublicRoute {...props} exact component={Team} path="/team" />
        <PublicRoute {...props} exact component={MatchesAll} path="/matches" />
        <PublicRoute {...props} exact restricted={true} component={SignIn} path="/signin" />     
        <PrivateRoute  {...props} exact component={Dashboard} path="/dashboard" />
        <PrivateRoute  {...props} exact component={AdminMatches} path="/admin_matches" />
        <PrivateRoute  {...props} exact component={AddEditMatch} path="/admin_matches/add_edit/:id" />
        <PrivateRoute  {...props} exact component={AddEditMatch} path="/admin_matches/add_edit" /> 
        <PrivateRoute  {...props} exact component={AdminPlayers} path="/admin_players" /> 
        <PrivateRoute  {...props} exact component={AddEditPlayers} path="/admin_players/add_edit/:id" /> 
        <PrivateRoute  {...props} exact component={AddEditPlayers} path="/admin_players/add_edit" />
        <PrivateRoute  {...props} exact component={TeamListTable} path="/admin_table" />  
        <PrivateRoute  {...props} exact component={EditTable} path="/admin_table/team_edit/:id" /> 
        <PublicRoute {...props} component={NotFound}  />   
      </Switch>
    </Layout>
  )
}

export default Routes;
