import React, { Fragment, Component } from "react";
import {
  Row,
  Col,
  Alert,
  Button,
  CardHeader,
  Table,
  ButtonGroup,
  Nav,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  Progress,
  Card,
  CardBody,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledButtonDropdown,
  CardFooter
} from "reactstrap";
import { translate } from "react-multi-lang";
import Circle from "react-circle";
// import FooterComponent from "./Footer";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faQuestionCircle,
  faBusinessTime,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
class UsersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          transitionLeave={false}
        >
          <div className="">
            <div className="app-page-title">
              <div className="page-title-wrapper">
                <div className="page-title-heading">
                  <div className="page-title-icon">
                    <i className="pe-7s-medal icon-gradient bg-tempting-azure"></i>
                  </div>
                  <div>
                    Dashboard
                    <div className="page-title-subheading">
                      Choose between regular React Bootstrap tables or advanced
                      dynamic ones.
                    </div>
                  </div>
                </div>
                <div className="page-title-actions">
                  <Breadcrumb>
                    <BreadcrumbItem>
                      <a href="javascript:void(0);">
                        <FontAwesomeIcon icon={faHome} />
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <a href="javascript:void(0);">Dashboard</a>
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col md="6" lg="3">
              <Card className="widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-primary border-primary">
                <div className="widget-chat-wrapper-outer">
                  <div className="widget-chart-content">
                    <div className="widget-title opacity-5 text-uppercase">
                      New accounts
                    </div>
                    <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                      <div className="widget-chart-flex align-items-center">
                        <div>
                          <span className="opacity-10 text-success pr-2">
                            <FontAwesomeIcon icon={faAngleUp} />
                          </span>
                          234
                          <small className="opacity-5 pl-1">%</small>
                        </div>
                        <div className="widget-title ml-auto font-size-lg font-weight-normal text-muted">
                          <div className="ml-auto">
                            <Circle
                              animate={true} // Boolean: Animated/Static progress
                              animationDuration="10s" // String: Length of animation
                              responsive={false} // Boolean: Make SVG adapt to parent size
                              size="46" // String: Defines the size of the circle.
                              lineWidth="30" // String: Defines the thickness of the circle's stroke.
                              progress="56" // String: Update to change the progress and percentage.
                              progressColor="var(--primary)" // String: Color of "progress" portion of circle.
                              bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                              textColor="#6b778c" // String: Color of percentage text color.
                              textStyle={{
                                fontSize: "6rem" // CSSProperties: Custom styling for percentage.
                              }}
                              percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                              roundedStroke={true} // Boolean: Rounded/Flat line ends
                              showPercentage={true} // Boolean: Show/hide percentage.
                              showPercentageSymbol={false} // Boolean: Show/hide only the "%" symbol.
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md="6" lg="3">
              <Card className="widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-danger border-danger">
                <div className="widget-chat-wrapper-outer">
                  <div className="widget-chart-content">
                    <div className="widget-title opacity-5 text-uppercase">
                      Total Expenses
                    </div>
                    <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                      <div className="widget-chart-flex align-items-center">
                        <div>
                          <span className="opacity-10 text-danger pr-2">
                            <FontAwesomeIcon icon={faAngleDown} />
                          </span>
                          71
                          <small className="opacity-5 pl-1">%</small>
                        </div>
                        <div className="ml-auto">
                          <Circle
                            animate={true} // Boolean: Animated/Static progress
                            animationDuration="10s" // String: Length of animation
                            responsive={false} // Boolean: Make SVG adapt to parent size
                            size="46" // String: Defines the size of the circle.
                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                            progress="41" // String: Update to change the progress and percentage.
                            progressColor="var(--danger)" // String: Color of "progress" portion of circle.
                            bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                            textColor="#6b778c" // String: Color of percentage text color.
                            textStyle={{
                              fontSize: "6rem" // CSSProperties: Custom styling for percentage.
                            }}
                            percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                            roundedStroke={true} // Boolean: Rounded/Flat line ends
                            showPercentage={true} // Boolean: Show/hide percentage.
                            showPercentageSymbol={false} // Boolean: Show/hide only the "%" symbol.
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md="6" lg="3">
              <Card className="widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-warning border-warning">
                <div className="widget-chat-wrapper-outer">
                  <div className="widget-chart-content">
                    <div className="widget-title opacity-5 text-uppercase">
                      Company Value
                    </div>
                    <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                      <div className="widget-chart-flex align-items-center">
                        <div>
                          <small className="opacity-5 pr-1">$</small>
                          1,45M
                        </div>
                        <div className="ml-auto">
                          <Circle
                            animate={true} // Boolean: Animated/Static progress
                            animationDuration="10s" // String: Length of animation
                            responsive={false} // Boolean: Make SVG adapt to parent size
                            size="46" // String: Defines the size of the circle.
                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                            progress="71" // String: Update to change the progress and percentage.
                            progressColor="var(--warning)" // String: Color of "progress" portion of circle.
                            bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                            textColor="#6b778c" // String: Color of percentage text color.
                            textStyle={{
                              fontSize: "6rem" // CSSProperties: Custom styling for percentage.
                            }}
                            percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                            roundedStroke={true} // Boolean: Rounded/Flat line ends
                            showPercentage={true} // Boolean: Show/hide percentage.
                            showPercentageSymbol={false} // Boolean: Show/hide only the "%" symbol.
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md="6" lg="3">
              <Card className="widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-success border-success">
                <div className="widget-chat-wrapper-outer">
                  <div className="widget-chart-content">
                    <div className="widget-title opacity-5 text-uppercase">
                      New Employees
                    </div>
                    <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                      <div className="widget-chart-flex align-items-center">
                        <div>
                          <small className="text-success pr-1">+</small>
                          34
                          <small className="opacity-5 pl-1">hires</small>
                        </div>
                        <div className="ml-auto">
                          <Circle
                            animate={true} // Boolean: Animated/Static progress
                            animationDuration="10s" // String: Length of animation
                            responsive={false} // Boolean: Make SVG adapt to parent size
                            size="46" // String: Defines the size of the circle.
                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                            progress="85" // String: Update to change the progress and percentage.
                            progressColor="var(--success)" // String: Color of "progress" portion of circle.
                            bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                            textColor="#6b778c" // String: Color of percentage text color.
                            textStyle={{
                              fontSize: "6rem" // CSSProperties: Custom styling for percentage.
                            }}
                            percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                            roundedStroke={true} // Boolean: Rounded/Flat line ends
                            showPercentage={true} // Boolean: Show/hide percentage.
                            showPercentageSymbol={false} // Boolean: Show/hide only the "%" symbol.
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
        {/* <FooterComponent /> */}
      </Fragment>
    );
  }
}
export default translate(UsersComponent);
