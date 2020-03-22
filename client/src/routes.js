import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './pages/Auth';
import CreateLink from './pages/CreateLink';
import Detail from './pages/Detail';
import Links from './pages/Links';

export function useRoutes(isAuth) {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/links" exact>
          <Links />
        </Route>
        <Route path="/create" exact>
          <CreateLink />
        </Route>
        <Route path="/detail/:id">
          <Detail />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}
