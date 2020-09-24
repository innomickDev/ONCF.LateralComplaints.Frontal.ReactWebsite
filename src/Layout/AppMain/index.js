import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";
import Loader from "react-loaders";
import Logoimage from "../../assets/img/svg/LOGO.svg";

import { ToastContainer } from "react-toastify";

const backoffice = lazy(() => import("../../Pages/Components"));
const Dashboards = lazy(() => import("../../Pages/Dashboards"));

const AppMain = () => {
  return (
    <Fragment>
      {/* Components */}

      {/* Pages */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                {/* <Loader type="ball-grid-beat" /> */}
                <img src={Logoimage} />
              </div>
              {/* <h6 className="mt-3">
                            Please wait while we load all the Pages examples
                            <small>Because this is a demonstration we load at once all the Pages examples. This wouldn't happen in a real live app!</small>
                        </h6> */}
            </div>
          </div>
        }
      >
        <Route path="/backoffice" component={backoffice} />
        {/*<Route exact path="/" render={() => (
                <Redirect to="/pages/login"/>
                )}/>*/}
      </Suspense>

      {/* Dashboards */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                {/* <Loader type="ball-grid-beat"/> */}
                <img src={Logoimage} />
              </div>
              {/* <h6 className="mt-3">
                            Please wait while we load all the Dashboards examples
                            <small>Because this is a demonstration, we load at once all the Dashboards examples. This wouldn't happen in a real live app!</small>
                        </h6> */}
            </div>
          </div>
        }
      >
        <Route path="/dashboards" component={Dashboards} />
      </Suspense>

      <Route
        exact
        path="/"
        render={() => <Redirect to="/backoffice/login" />}
      />
      <ToastContainer autoClose={15000} />
    </Fragment>
  );
};

export default AppMain;
