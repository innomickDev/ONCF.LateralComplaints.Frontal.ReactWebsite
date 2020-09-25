import React from "react";
import compose from "compose-function";
import { Row, Col, Card, Container, CardBody } from "reactstrap";
import { translate } from "react-multi-lang";

import Logo from "assets/img/svg/LOGO.svg";
import { reduxForm } from "redux-form";
class permissionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const boGRCuserDetails = JSON.parse(
      localStorage.getItem("boGRCuserDetails")
    );
    const userName =
      boGRCuserDetails && boGRCuserDetails.data && boGRCuserDetails.data;
    return (
      <Container fluid className="welcome-block  c-h">
        <Row className="">
          <Col md={8} className="mx-auto">
            <Card className="main-card welcome-center mb-5">
              <CardBody>
                <div className="text-center p-2">
                  <img
                    src={Logo}
                    alt="logo"
                    className="img-fluid"
                    width="30%"
                  />
                </div>
                <h5 className="text-center py-3  font-weight-bold rounded">
                  Hello {userName.userName},
                </h5>
                <h5 className="text-center py-3  font-weight-bold rounded">
                  Welcome to ONCF-2255
                </h5>
              </CardBody>
              <div className="text-center text-white p-ab">
                <p className="c-bg p-3 "></p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
permissionScreen = reduxForm({
  form: "permissionScreen",
})(permissionScreen);

export default compose(translate)(permissionScreen);
