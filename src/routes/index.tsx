import React from 'react';
import { Switch, Route } from 'react-router-dom';
/**
 * Pages
 */
import Dashboar from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboar} />
    <Route path="/repository" component={Repository} />
  </Switch>
);

export default Routes;
