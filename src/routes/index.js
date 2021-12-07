import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PlayerForm from '../api/compontents/PlayerForm';
import TeamForm from '../api/compontents/TeamForm';
import DevLinks from '../views/devLinks';
import FullSystemRankings from '../views/fullSystemRankings';
import Home from '../views/home';
import TopFiveProspects from '../views/TopFiveProspects';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
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
