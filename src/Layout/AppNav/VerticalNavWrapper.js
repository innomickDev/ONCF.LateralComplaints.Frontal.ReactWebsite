import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import MetisMenu from "react-metismenu";

import {
  ProcessCertificationNav,
  MainNav,
  ComponentsNav,
  FormsNav,
  WidgetsNav,
  ChartsNav
} from "./NavItems";

import { translate } from "react-multi-lang";

class Nav extends Component {
  // function for language based content

  getLangContent = navContent => {
    if (navContent && navContent.length) {
      for (let i = 0; i < navContent.length; i++) {
        // console.log(navContent[i]);
        navContent[i].label = this.props.t(navContent[i].label);
        if (navContent[i].content && navContent[i].content.length) {
          for (let j = 0; j < navContent[i].content.length; j++) {
            // TODO Optimize this function code
            navContent[i].content[j].label = this.props.t(
              navContent[i].content[j].label
            );
          }
        }
      }
      // console.log(navContent);
      return navContent;
    } else {
      return [];
    }
  };

  state = {};

  render() {
    return (
      <Fragment>
        <h5 className="app-sidebar__heading">&nbsp;</h5>
        <MetisMenu
          content={this.getLangContent(ProcessCertificationNav)}
          activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
        />
        {/*<h5 className="app-sidebar__heading">Menu</h5>
                <MetisMenu content={MainNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">UI Components</h5>
                <MetisMenu content={ComponentsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">Dashboard Widgets</h5>
                <MetisMenu content={WidgetsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">Forms</h5>
                <MetisMenu content={FormsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">Charts</h5>
                <MetisMenu content={ChartsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>*/}
      </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(translate(Nav));
