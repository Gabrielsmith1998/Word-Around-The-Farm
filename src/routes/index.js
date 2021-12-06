import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FullSystemRankings from '../views/fullSystemRankings';
import Home from '../views/home';

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
      </Switch>
    </>
  );
}
