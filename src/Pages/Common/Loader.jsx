import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Row } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import compose from "compose-function";
import { translate } from "react-multi-lang";

class MainLoader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        {this.props.loading && (
          <Row>
            <div className="w-100 loader-s d-flex justify-content-center align-items-center">
              <div className="text-center">
                <img src={require("../../assets/img/svg/LOGO.svg")} />
              </div>
              <div className="browser-screen-loading-content">
                <div className="l-wrapper">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </Row>
        )}
      </Fragment>
    );
  }
}
export default compose(translate, withRouter, connect())(MainLoader);
