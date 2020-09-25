import React, { Fragment } from "react";
import { reduxForm, Field } from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { AvForm } from "availity-reactstrap-validation";
import { showSuccess, showError } from "../../../Helpers/utils";
import SubmitBtnLoader from "../../../Common/ButtonLoader";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Row,
  Col,
  Label,
} from "reactstrap";
import RenderSelectMultiInput from "../../../Common/renderMultipleInput";
import { getAgents } from "../../../../actions/accountAction";
import { assignClaimToAgent } from "../../../../actions/claimAction";

class ClaimUserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  componentDidMount = () => {
    this.props.dispatch(getAgents());
  };

  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.agentsData &&
        nextProps.agentsData !== this.props.agentsData
      ) {
        const agentsData = nextProps.agentsData;
        let agents = [];
        agentsData &&
          agentsData.data &&
          agentsData.data.agentClients.map((agent, key) => {
            agents.push({
              value: agent.code, //value used for dropdown plugin
              label: agent.title + " " + agent.firstName + " " + agent.lastName,
              mobileNumber: agent.mobileNumber,
              email: agent.email,
              createDate: agent.createDate,
              updateDate: agent.updateDate,
            });
            this.setState({ agents });
          });
      }

      // success
      if (
        nextProps.isAgentSuccess &&
        nextProps.isAgentSuccess !== this.props.isAgentSuccess
      ) {
        showSuccess(this.props.t("Common.ASSIGN_SUCCESS"));
        this.setState({ loading: false });
        this.toggle();
      }
      // error
      if (
        nextProps.isAgentFailure &&
        nextProps.isAgentFailure !== this.props.isAgentFailure
      ) {
        showError(nextProps.isAgentFailure);
        this.setState({ loading: false });
      }
    }
  }

  onSubmit = (formProps) => {
    if (formProps.agents) {
      const requestData = {
        claimCode: parseInt(this.props.claimId),
        agentCode: parseInt(formProps.agents.value),
      };

      this.props.dispatch(assignClaimToAgent(requestData));
    } else {
      showError(this.props.t("ErrorMsg.TEXT_ONLY"));
      return;
    }
    this.setState({ loading: true });
  };
  toggle = () => {
    this.props.usersList();
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Fragment>
        <Modal
          isOpen={this.props.modal}
          toggle={this.toggle}
          // className="modalSize"
        >
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
                      {this.props.t("Common.SELECT_AGENT_NAMES") + "*"}
                    </Label>
                    <Field
                      component={RenderSelectMultiInput}
                      isMulti={false}
                      name="agents"
                      type="select"
                      id="selectField"
                      options={this.state.agents}
                    />
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

ClaimUserList = reduxForm({
  form: "ClaimUserList",
  //validate,
  // asyncValidate,
})(ClaimUserList);
function mapStateToProps(state) {
  return {
    agentsData: state.Account.agentsData,
    isAgentSuccess: state.Claim.isAgentSuccess,
    isAgentFailure: state.Claim.isAgentFailure,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ClaimUserList);
