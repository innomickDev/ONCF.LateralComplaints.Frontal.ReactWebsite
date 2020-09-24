import React, { Fragment, Component } from "react";
import {
  Button,
  Col,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Row,
  Form,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import compose from "compose-function";
import { translate } from "react-multi-lang";
import { reduxForm, Field } from "redux-form";

import {
  renderTextField,
  renderSelectField,
} from "../../Common/RenderTextField";
import moment from "moment";

import { defaultDateFormat } from "../../Helpers/utils";
class FilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dis: true,
      startDates: null,
      endDates: null,
      hideCustomDate: false,
    };
  }

  // This function is used to handle startDateChange
  handleStartDateChange = (date) => {
    console.log(date)
    this.setState({ startDates: date });
  };
  // This function is used to handle EndDateChange
  handleEndDateChange = (date) => {
    this.setState({ endDates: date });
  };
  componentWillReceiveProps(nextProps) {
    //for Loader
    this.setState({
      isLoading: nextProps.isLoading,
    });
  }

  disableDate = (e) => {
    if (e.target.value === "customDate") {
      this.setState({
        hideCustomDate: true,
      });
    } else {
      this.setState({
        hideCustomDate: false,
      });
    }
  };
  /*-----------to reset filter-----------*/
  resetForm = () => {
    this.props.reset();
    this.setState({
      startDates: null,
      endDates: null,
      hideCustomDate: false,
      value: "",
    });
    this.props.onFilterSubmit();
  };
  /*-----------on filter submit -----------*/
  onSubmit = (formProps) => {
    if (formProps.statusCode === "0") {
      delete formProps.claimReportsEnum;
    } else if (formProps.statusCode === "lastSixMonth") {
      formProps.claimReportsEnum = "2";
    } else if (formProps.statusCode === "lastYear") {
      formProps.claimReportsEnum = "3";
    } else if (formProps.statusCode === "lastMonth") {
      formProps.claimReportsEnum = "1";
    } else if (formProps.statusCode === "customDate") {
      formProps.claimReportsEnum = "4";
    }

    if (this.state.startDates) {
      formProps.startDate = `${moment(new Date(this.state.startDates)).format("YYYY-MM-DD")}`;
    
      // formProps.startDate = `${moment(
      //   new Date(this.state.startDates).getTime()
      // )}`;
    } else {
      delete formProps.startDate;
    }
    if (this.state.endDates) {
      formProps.endDate = `${moment(new Date(this.state.endDates)).format("YYYY-MM-DD")}`;
      // formProps.endDate = `${moment(new Date(this.state.endDates).getTime())}`;
     
    } else {
      delete formProps.endDate;
    }
    if (formProps && !formProps.statusCode) {
      formProps.claimReportsEnum = "1";
    }
    if (formProps) {
      this.props.onFilterSubmit(formProps);
    }
  };

  /*-----------render function -----------*/
  render() {
    const { handleSubmit } = this.props;
    const { startDate, endDate } = this.state;
    console.log(startDate)
    return (
      <Fragment>
        <Col md="12" className="CI-list-filter">
          <Card>
            <CardHeader>
              <div className="my-3 text-center">
                <h4> {this.props.t("Common.FILTER")}</h4>
              </div>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit(this.onSubmit)}>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="examplePassword">
                        {this.props.t("Common.DATE_FILTER")}
                      </Label>
                      <Field
                        name="statusCode"
                        defaultValue={"lastMonth"}
                        component={renderSelectField}
                        className="form-control"
                        onChange={(e) => this.disableDate(e)}
                      >
                        {/* <option value="0">select Date</option> */}
                        <option value="lastMonth">
                          {this.props.t("Common.LAST_MONTH")}
                        </option>
                        <option value="lastSixMonth">
                          {this.props.t("Common.LAST_SIX_MONTH")}
                        </option>{" "}
                        {/* <option value="lastYear">
                          {this.props.t("Common.LAST_YEAR")}  //->change done in preprodcution from client side
                        </option> */}
                        <option value="customDate">
                          {" "}
                          {this.props.t("Common.CUSTOM_DATE")}
                        </option>
                      </Field>
                    </FormGroup>
                  </Col>

                  {this.state.hideCustomDate && (
                    <Col md={4}>
                      <FormGroup>
                        <Label for="examplePassword">
                          {this.props.t("Common.START_DATE")}
                        </Label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <div className="input-group-text">
                              <FontAwesomeIcon icon={faCalendarAlt} />
                            </div>
                          </InputGroupAddon>
                          <DatePicker
                            className="form-control"
                            dateFormat={defaultDateFormat}
                            selected={
                              startDate
                                ? new Date(startDate)
                                : this.state.startDates
                            }
                            onChange={this.handleStartDateChange}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  )}
                  {this.state.hideCustomDate && (
                    <Col md={4}>
                      <FormGroup>
                        <Label for="examplePassword">
                          {" "}
                          {this.props.t("Common.END_DATE")}
                        </Label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <div className="input-group-text">
                              <FontAwesomeIcon icon={faCalendarAlt} />
                            </div>
                          </InputGroupAddon>
                          <DatePicker
                            className="form-control"
                            dateFormat={defaultDateFormat}
                            selected={
                              endDate
                                ? new Date(startDate)
                                : this.state.endDates
                            }
                            onChange={this.handleEndDateChange}
                            minDate={this.state.startDates}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  )}

                  <br />
                  <Col md={12}>
                    <Button
                      color="btn btn-lg btn-primary px-5 btn-pill"
                      className="mt-1"
                      type="submit"
                      disabled={this.state.loading}
                    >
                      {this.props.t("Common.FILTER")}
                    </Button>{" "}
                    <Button
                      onClick={(e) => this.resetForm()}
                      color="btn btn-lg btn-primary px-5 btn-pill"
                      className="mt-1"
                    >
                      {this.props.t("Common.RESET")}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoading: state.Claim.isLoading,
  };
}

export default compose(
  translate,
  withRouter,
  reduxForm({
    form: "FilterComponent",
  }),
  connect(mapStateToProps)
)(FilterComponent);
