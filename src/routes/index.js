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

export default function Routes({ user }) {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home user={user} />
        </Route>
        <Route exact path="/full-rankings">
          <FullSystemRankings />
        </Route>
        <Route
          exact
          path="/top-5-prospects/:teamId"
          component={TopFiveProspects}
        />
        <Route exact path="/devPortal">
          <DevLinks />
        </Route>
        <Route exact path="/edit/:firebaseKey">
          <EditProspect user={user} />
        </Route>
        <Route exact path="/createProspects">
          <PlayerForm />
        </Route>
        <Route exact path="/createTeams">
          <TeamForm />
        </Route>
      </Switch>
    </>
  );
}

Routes.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Routes.defaultProps = { user: null };
