import React, { Fragment, Component } from "react";
import { reduxForm, Field, change } from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { showSuccess, showError, required } from "../../../Helpers/utils";
import SubmitBtnLoader from "../../../Common/ButtonLoader";
import { renderSelectField } from "../../../Common/RenderTextField";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Row,
  Col,
  Label,
} from "reactstrap";
import _ from "lodash";
import RenderSelectMultiInput from "../../../Common/renderMultipleInput";
import { getAgents } from "../../../../actions/accountAction";
import {
  getListEntity,
  getEntityByCode,
  getListEntityByResponsibility,
} from "../../../../actions/entityAction";
import {
  assignClaimToAgent,
  assignClaimToEntity,
} from "../../../../actions/claimAction";

class ClaimEntityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  componentDidMount = () => {
    const requestData = {
      responsibilityCode: this.props.subCategoryCode.toString(),
    };

    this.props.dispatch(getListEntityByResponsibility(requestData));
  };

  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.listDataSuccess &&
        nextProps.listDataSuccess !== this.props.listDataSuccess
      ) {
        this.setState({ mainLoader: false });
        let entities = [];
        if (nextProps.listDataSuccess && nextProps.listDataSuccess.length)
          nextProps.listDataSuccess.map((entity, key) => {
            entities.push({
              value: entity.code,
              label: entity.entityName,
              actions: {
                key: key,
              },
            });
          });
        this.setState({ entities });
      }
      if (
        nextProps.isEntityResponsibilitySuccess &&
        nextProps.isEntityResponsibilitySuccess !==
          this.props.isEntityResponsibilitySuccess
      ) {
        this.setState({ mainLoader: false });
        let entityResponsibility = [];
        if (
          nextProps.isEntityResponsibilitySuccess.entityClients &&
          nextProps.isEntityResponsibilitySuccess.entityClients.length
        ) {
          nextProps.isEntityResponsibilitySuccess.entityClients.map(
            (entityResponse, key) => {
              entityResponsibility.push({
                value: entityResponse.code,
                label: entityResponse.entityName,
                actions: {
                  key: key,
                },
              });
            }
          );
          this.setState({ entityResponsibility });
        } else {
          showError(this.props.t("ErrorMsg.ENTITY_NOT_AVAILABLE"));
        }
      }

      if (
        nextProps.isEntityCodeSuccess &&
        nextProps.isEntityCodeSuccess !== this.props.isEntityCodeSuccess
      ) {
        this.setState({
          isEntityCodeSuccess: nextProps.isEntityCodeSuccess,
          mainLoader: false,
        });
      }
      // success
      if (
        nextProps.isAssignEntitySuccess &&
        nextProps.isAssignEntitySuccess !== this.props.isAssignEntitySuccess
      ) {
        showSuccess(this.props.t("Common.ASSIGN_SUCCESS"));
        this.setState({ loading: false });
        this.toggle();
      }
      // error
      if (
        nextProps.isAssignEntityFailure &&
        nextProps.isAssignEntityFailure !== this.props.isAssignEntityFailure
      ) {
        showError(nextProps.isAssignEntityFailure);
        this.setState({ loading: false });
      }
      if (
        nextProps.assignClaimNetworkError &&
        nextProps.assignClaimNetworkError !== this.props.assignClaimNetworkError
      ) {
        this.setState({ loading: false });
        showError(this.props.t("Common.SOMETHING_WENT_WRONG"));
      }
    }
  }

  onSubmit = (formProps) => {
    if (formProps.users === "0") {
      delete formProps.users;
    }
    if (formProps.entities && formProps.users) {
      const requestData = {
        claimCode: parseInt(this.props.claimId),
        entityCode: parseInt(formProps.entities),
        agentCode: parseInt(formProps.users),
      };
      this.setState({ loading: true });

      this.props.dispatch(assignClaimToEntity(requestData));
    } else {
      showError(this.props.t("ErrorMsg.TEXT_ONLY"));
    }
  };
  toggle = () => {
    this.props.usersListGrc();
  };
  /*-----------call this function to get UserOptions----------*/

  getUsers = (e) => {
    if (e.target.value !== "0") {
      this.props.dispatch(getEntityByCode(e.target.value));
    } else {
      this.setState({
        isEntityCodeSuccess: [],
      });
    }
  };
  showOptions = (data) => {
    console.log(data);
    if (data && data.length) {
      console.log(data && data.length);
      return data.map((entities, key) => {
        return (
          <option value={entities.value} key={key}>
            {entities.label}
          </option>
        );
      });
    }
    // } else {
    //   showError(this.props.t("ErrorMsg.ENTITY_NOT_AVAILABLE"));
    // }
  };
  showUserOptions = (UserData) => {
    console.log(UserData);
    // console.log(UserData);

    if (UserData) {
      return (
        UserData.data &&
        UserData.data.userClients &&
        UserData.data.userClients.length &&
        UserData.data.userClients.map((users, key) => {
          return (
            <option value={users.code} key={key}>
              {users.firstName}
            </option>
          );
        })
      );
    }
    // } else if (
    //   UserData &&
    //   UserData.data &&
    //   UserData.data.userClients &&
    //   UserData.data.userClients.length === 0
    // ) {
    //   showError(this.props.t("ErrorMsg.ENTITY_NOT_AVAILABLE"));
    // }
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Fragment>
        <Modal isOpen={this.props.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <h4 className="font-weight-bold">
              {this.props.t("Common.ASSIGN_TO_USER")}
            </h4>
          </ModalHeader>
          <ModalBody>
            <AvForm
              className="px-5"
              noValidate
              onSubmit={handleSubmit(this.onSubmit)}
              model={this.props.initialValues}
            >
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label>
                      {this.props.t("Common.SELECT_ENTITY_NAMES") + "*"}
                    </Label>
                    <Field
                      component={renderSelectField}
                      className="form-control"
                      name="entities"
                      type="select"
                      id="selectField"
                      required
                      onChange={(e) => this.getUsers(e)}
                    >
                      <option value="0">
                        {this.props.t("Common.SELECT_ENTITY_NAMES")}
                      </option>
                      {this.showOptions(
                        this.state.entityResponsibility
                          ? this.state.entityResponsibility
                          : null
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label>{this.props.t("Common.SELECT_USER") + "*"}</Label>
                    <Field
                      name="users"
                      type="select"
                      component={renderSelectField}
                      id="selectField"
                      className="form-control"
                    >
                      <option value="0">
                        {this.props.t("Common.SELECT_USER")}
                      </option>
                      {this.showUserOptions(
                        this.state.isEntityCodeSuccess
                          ? this.state.isEntityCodeSuccess
                          : null
                      )}
                    </Field>
                  </FormGroup>
                </Col>
              </Row>
              <div className="">
                <SubmitBtnLoader
                  label={this.props.t("Common.ASSIGN")}
                  className="btn btn-success"
                  loading={this.state.loading}
                  submitting={""}
                  type="submit"
                />
              </div>
            </AvForm>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

ClaimEntityList = reduxForm({
  form: "ClaimEntityList",
  //validate,
  // asyncValidate,
})(ClaimEntityList);
function mapStateToProps(state) {
  return {
    listDataSuccess:
      state.Entity.listDataSuccess && state.Entity.listDataSuccess.data
        ? state.Entity.listDataSuccess.data.entityClients
        : [],
    agentsData: state.Account.agentsData,
    isEntityCodeSuccess: state.Entity.isEntityCodeSuccess,
    isAgentSuccess: state.Claim.isAgentSuccess,
    isAssignEntitySuccess: state.Claim.isAssignEntitySuccess,
    isEntityResponsibilitySuccess:
      state.Entity.isEntityResponsibilitySuccess &&
      state.Entity.isEntityResponsibilitySuccess.data,

    isEntityResponsibilityFailure: state.Entity.isEntityResponsibilityFailure,
    isAssignEntityFailure: state.Claim.isAssignEntityFailure,
    isAgentFailure: state.Claim.isAgentFailure,
    assignClaimNetworkError: state.Claim.assignClaimNetworkError,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ClaimEntityList);
