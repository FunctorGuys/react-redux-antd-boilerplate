import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { MasterLayout } from 'components/layouts';
import { NotFound } from 'elements/statics';

const HomePage = lazy(() => import('./home'));

export default function AppPage({ match }) {
  return (
    <MasterLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={`${match.path}`} component={HomePage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </MasterLayout>
  );
}
