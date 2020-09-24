
import React, {Component, Fragment} from "react";
import Loader from 'react-loaders'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import compose from "compose-function";
import { translate } from "react-multi-lang";

class LoaderComponent extends Component {
    constructor() {
        super();
    }
    render() {
        
        return (
            <Fragment>
            <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
                <Row>
                    <Col md="12">
                        <div className="loader-s d-flex justify-content-center align-items-center">
                        
                            <Loader type="square-spin"/>
                        </div>
                    </Col>
                </Row>
            </ReactCSSTransitionGroup>
        </Fragment>
        );
    }
}
export default compose(
    translate,
    withRouter,
    connect()
  )(LoaderComponent);