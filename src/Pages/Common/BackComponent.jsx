
import React, {Component} from "react";
import {Button} from 'reactstrap';
import { withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import compose from "compose-function";
import { translate } from "react-multi-lang";

class BackComponent extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Button className="btn-shadow btn btn-primary float-right mt-3" onClick={e=>this.props.history.goBack()}><i className="fas fa-arrow-left pr-1"></i>{this.props.t("CL.BACK")}</Button>
        );
    }
}
export default compose(
    translate,
    withRouter,
    connect()
  )(BackComponent);