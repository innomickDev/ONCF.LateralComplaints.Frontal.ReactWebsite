import React, { Component } from "react";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DatePicker from "react-datepicker";

// import bg3 from '../../../assets/utils/images/originals/citynights.jpg';
import {
  Button,
  Col,
  Card,
  CardHeader,
  Select,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import compose from "compose-function";
import { translate } from "react-multi-lang";
import { getByCriteria } from "../../actions/certificationDemandsAction";
import { reduxForm, Field } from "redux-form";
import {
  renderTextField,
  renderCustomField,
  renderSelectField
} from "./RenderTextField";
import { getAllBoardingPoints } from "../../actions/boardingPointsAction";
import { getAllLandingPoints } from "../../actions/landingPointsAction";
import { getAllExportersByCriteria } from "../../actions/exportersAction";
import { getAllDestinations } from "../../actions/destinationsAction";
import { getAllMarketPlaces } from "../../actions/marketPlacesAction";
import { getAllInfastructure } from "../../actions/infrastructureAction";
import { requestDateFormat, getOrderedItems } from "../Helpers/utils";

class FilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      exporterData: [],
      boardingPoints: [],
      destinations: [],
      marketPlace: [],
      landingPoints: []
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.exporterData) {
      this.setState({ exporterData: nextProps.exporterData });
    }
    if (nextProps.boardingPoints) {
      this.setState({ boardingPoints: nextProps.boardingPoints });
    }
    if (nextProps.landingPoints) {
      this.setState({ landingPoints: nextProps.landingPoints });
    }
    if (nextProps.destinations) {
      this.setState({ destinations: nextProps.destinations });
    }
    if (nextProps.infrastructureData) {
      this.setState({ infrastructureData: nextProps.infrastructureData });
    }
  };

  componentDidMount() {
    const administrativeUnit = JSON.parse(localStorage.getItem("user"));
    this.admistrativeUnitId =
      administrativeUnit.InternalUserAdministrativeUnits &&
      administrativeUnit.InternalUserAdministrativeUnits[0].AdministrativeUnit
        .Id;
    this.props.dispatch(getAllExportersByCriteria(this.admistrativeUnitId));
    this.props.dispatch(getAllLandingPoints());
    this.props.dispatch(getAllBoardingPoints());
    this.props.dispatch(getAllDestinations());
    //this.props.dispatch(getAllMarketPlaces());
    this.props.dispatch(getAllInfastructure());
  }
  resetForm = () => {
    //this.props.reset();
    this.props.initialize({ infrastructureId: this.props.defaultSiteValue });
    this.props.onFilterSubmit({
      infrastructureId: this.props.defaultSiteValue,
      statusCode: "inProgress"
    });
  };
  renderOptions = (optionsList, type) => {
    if (type === "destination") {
      return getOrderedItems(optionsList, "Label").map(option => {
        return <option value={option.Label}> {option.Label}</option>;
      });
    } else {
      return getOrderedItems(optionsList, "Label").map(option => {
        return <option value={option.Id}> {option.Label}</option>;
      });
    }
  };
  getExporterOptions = optionsList => {
    return getOrderedItems(optionsList, "SocialReason").map(option => {
      return <option value={option.Id}> {option.SocialReason}</option>;
    });
  };
  onSubmit = formProps => {
    if (formProps.infrastructureId === "0") {
      delete formProps.infrastructureId;
    }
    if (this.state.startDate) {
      formProps.fromCreationDate = requestDateFormat(
        this.state.startDate.toISOString()
      );
    }
    if (this.state.endDate) {
      formProps.toCreationDate = requestDateFormat(
        this.state.endDate.toISOString()
      );
    }

    if (formProps && !formProps.statusCode) {
      formProps.statusCode = "InProgress";
    }
    if (formProps) {
      this.props.onFilterSubmit(formProps);
    }
  };
  getInfrastructureSites = () => {
    if (this.props.infrastructureData) {
      return getOrderedItems(this.props.infrastructureData, "Name").map(
        (site, key) => {
          return (
            <option value={site.Id} key={site.Id}>
              {site.Name}
            </option>
          );
        }
      );
    }
  };

  // handleDateChange
  handleStartDateChange = date => {
    this.setState({ startDate: date });
  };

  handleEndDateChange = date => {
    this.setState({ endDate: date });
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <Col md="3" className="CI-list-filter">
        <Card>
          <CardHeader>
            <div className="my-3 text-center">
              <h4>{this.props.t("CIList.FILTER")}</h4>
            </div>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit(this.onSubmit)}>
              {/**--------------------------new code for filters----------------------------------- */}
              <FormGroup row className="CIList-formgroup">
                <Col>
                  <Label className="filter-labels" for="examplePassword">
                    {this.props.t("Sites.REFERENCE")}
                  </Label>
                  <Field
                    component={renderTextField}
                    name="reference"
                    id=""
                    className="CiList-inputs"
                  />
                </Col>
              </FormGroup>

              {this.props.hideSelector && (
                <FormGroup>
                  <Label className="filter-labels">
                    {this.props.t("CIList.FROM_CREATION_DATE")}
                  </Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <div className="input-group-text">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </div>
                    </InputGroupAddon>
                    <DatePicker
                      className="form-control"
                      selected={this.state.startDate}
                      onChange={this.handleStartDateChange}
                    />
                  </InputGroup>
                </FormGroup>
              )}
              {this.props.hideSelector && (
                <FormGroup>
                  <Label className="filter-labels">
                    {this.props.t("CIList.TO_CREATION_DATE")}
                  </Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <div className="input-group-text">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </div>
                    </InputGroupAddon>
                    <DatePicker
                      className="form-control"
                      selected={this.state.endDate}
                      onChange={this.handleEndDateChange}
                      minDate={this.state.startDate}
                    />
                  </InputGroup>
                </FormGroup>
              )}
              {this.props.hideSelector && (
                <FormGroup row className="CIList-formgroup">
                  <Col>
                    <Label className="filter-labels" for="exampleEmail">
                      {this.props.t("CL.INFRASTRUCTURE")}
                    </Label>
                    <Field
                      className="form-control mb-2"
                      component={renderSelectField}
                      name="infrastructureId"
                      defaultValue={this.props.defaultSiteValue}
                    >
                      <option>{this.props.t("CIList.SELECT_SITES")}</option>
                      {this.getInfrastructureSites()}
                    </Field>
                    {/*<Field component="Select" type="text" name="nExporter" id=""
                                              className="CiList-inputs" /> */}
                  </Col>
                </FormGroup>
              )}

              <FormGroup row className="CIList-formgroup">
                <Col>
                  <Label className="filter-labels" for="exampleEmail">
                    {this.props.t("CIList.EXPORTER")}
                  </Label>
                  <Field
                    className="form-control mb-2"
                    name="exporterId"
                    component={renderSelectField}
                    defaultValue={"InProgress"}
                  >
                    <option>{this.props.t("CIList.SELECT")}</option>
                    {this.getExporterOptions(this.state.exporterData)}
                  </Field>
                </Col>
              </FormGroup>
              <FormGroup row className="CIList-formgroup">
                <Col>
                  <Label className="filter-labels" for="exampleEmail">
                    {this.props.t("CL.DESTINATION")}
                  </Label>
                  <Field
                    className="form-control mb-2"
                    name="destinationCountry"
                    component={renderSelectField}
                    defaultValue={"InProgress"}
                  >
                    <option>{this.props.t("CIList.SELECT")}</option>
                    {this.renderOptions(this.state.destinations, "destination")}
                  </Field>
                </Col>
              </FormGroup>
              {/*<FormGroup row className="CIList-formgroup">
                                    <Col>
                                     <Label className="filter-labels" for="exampleEmail">{this.props.t("CIList.MARKET_PLACE")}</Label>
                                      <Field className="form-control mb-2" name="marketPlaceId" component={renderSelectField} defaultValue={"InProgress"}>
                                            <option>{this.props.t("CIList.SELECT")}</option> 
                                            {this.renderOptions(this.state.marketPlace) }
                                       </Field>
                                    </Col>
                                </FormGroup>*/}
              <FormGroup row className="CIList-formgroup">
                <Col>
                  <Label className="filter-labels" for="exampleEmail">
                    {this.props.t("CIList.LandingPoint")}
                  </Label>
                  <Field
                    className="form-control mb-2"
                    name="landingPointId"
                    component={renderSelectField}
                    defaultValue={"InProgress"}
                  >
                    <option>{this.props.t("CIList.SELECT")}</option>
                    {this.renderOptions(this.state.landingPoints)}
                  </Field>
                </Col>
              </FormGroup>
              <FormGroup row className="CIList-formgroup">
                <Col>
                  <Label className="filter-labels" for="exampleEmail">
                    {this.props.t("CIList.BoardingPoint")}
                  </Label>
                  <Field
                    className="form-control mb-2"
                    name="boradingPointsId"
                    component={renderSelectField}
                    defaultValue={"InProgress"}
                  >
                    <option>{this.props.t("CIList.SELECT")}</option>
                    {this.renderOptions(this.state.boardingPoints)}
                  </Field>
                </Col>
              </FormGroup>
              <FormGroup row className="CIList-formgroup">
                <Col>
                  <Label className="filter-labels" for="exampleEmail">
                    {this.props.t("CIList.SELECT_STATUS")}
                  </Label>
                  <Field
                    className="form-control mb-2"
                    name="statusCode"
                    component={renderSelectField}
                    defaultValue={"InProgress"}
                  >
                    <option>{this.props.t("CIList.SELECT_STATUS")}</option>
                    <option value="InProgress">
                      {this.props.t("CIList.IN_PROGRESS")}
                    </option>
                    <option value="Validated">
                      {this.props.t("CIList.VALID")}
                    </option>
                    <option value="Rejected">
                      {this.props.t("CIList.REJECT")}
                    </option>
                  </Field>
                </Col>
              </FormGroup>
              <Button
                type="submit"
                className="mt-2 d-inline-block"
                color="primary"
              >
                {this.props.t("CIList.FILTER")}
              </Button>
              <Button
                onClick={e => this.resetForm()}
                className="mt-2 ml-2 d-inline-block"
                color="secondary"
              >
                {this.props.t("CIList.RESET")}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
FilterComponent = reduxForm({
  form: "FilterComponent"
  //validate,
  // asyncValidate,
})(FilterComponent);

const mapStateToProps = state => {
  return {
    intialValues: { infrastructureId: "1" },
    exporterData: state.Exporters.exporterData,
    boardingPoints: state.BoardingPoints.masterData,
    destinations: state.Destinations.masterData,
    // marketPlace:state.MarketPlaces.masterData,
    landingPoints: state.LandingPoints.masterData,
    infrastructureData: state.Infrastructure.infrastructureData
  };
};
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(FilterComponent);
