import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerForm from '../api/compontents/PlayerForm';
import TeamForm from '../api/compontents/TeamForm';
import DevLinks from '../views/devLinks';
import EditProspect from '../views/EditProspect';
import FullSystemRankings from '../views/fullSystemRankings';
import Home from '../views/home';
import TopFiveProspects from '../views/TopFiveProspects';
import EditTeam from '../views/EditTeam';
import WatchedProspect from '../views/WatchedProspects';

export default function Routes({ user }) {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home user={user} />
        </Route>
        <Route exact path="/full-rankings">
          <FullSystemRankings user={user} />
        </Route>
        <Route
          exact
          path="/watched-prospects/:uid"
          component={() => <WatchedProspect user={user} />}
        />
        <Route
          exact
          path="/top-5-prospects/:teamId"
          component={() => <TopFiveProspects user={user} />}
        />
        <Route exact path="/devPortal">
          <DevLinks user={user} />
        </Route>
        <Route
          exact
          path="/edit/:firebaseKey"
          component={() => <EditProspect user={user} />}
        />
        <Route
          exact
          path="/editTeams/:teamId"
          component={() => <EditTeam user={user} />}
        />
        <Route exact path="/createProspects">
          <PlayerForm user={user} />
        </Route>
        <Route exact path="/createTeams">
          <TeamForm user={user} />
        </Route>
      </Switch>
    </>
  );
}

Routes.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Routes.defaultProps = { user: null };
