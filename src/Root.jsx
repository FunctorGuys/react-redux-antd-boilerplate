import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

// pages
import LoginPage from 'pages/login';
import AppPage from 'pages/app/AppPage';
import { NotFound } from 'elements/statics';

export default function Root() {
  return (
    <div className="Root-App">
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={AppPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
