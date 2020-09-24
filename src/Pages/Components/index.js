import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// Backoffice user pages

import Login from "./Login/";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
// import ActivateAccount from "./ActivateAccountScreen";


const frontOffice = ({ match }) => (
  <Fragment>
    <div className='app-container'>
      {/* User Pages */}
      <Route path={`${match.url}/login`} component={Login} />
      <Route path={`${match.url}/forgot-password`} component={ForgotPassword} />
      <Route path={`${match.url}/change-password`} component={ChangePassword} />
      {/* <Route
        path={`${match.url}/activate-account`}
        component={ActivateAccount}
      /> */}
    </div>
  </Fragment>
);

export default frontOffice;
