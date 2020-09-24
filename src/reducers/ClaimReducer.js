import { CLAIM_CONST } from "../actions/actionTypes";
export default function reducer(
  state = {
    myClaimsData: null,
    addClaimData: null,
    addAgentClaimData: null,
    formValue: null,
    // assignClaimNetworkError: false,
    isRequest: false,
  },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    // GET my claims
    case CLAIM_CONST.GET_MY_CLAIM_REQUEST:
      return {
        ...state,
        myClaimsData: null,
        claimDataError: null,
      };
    case CLAIM_CONST.GET_MY_CLAIM_SUCCESS:
      return {
        ...state,
        myClaimsData: action.payload
          ? action.payload.response.data.data.claimClients
          : null,
        claimDataError: null,
      };
    case CLAIM_CONST.GET_MY_CLAIM_FAILURE:
      return {
        ...state,
        myClaimsData: null,
        claimDataError: action.payload.response.data.error.errorDescription,
      };
    // add claim
    case CLAIM_CONST.ADD_CLAIM_REQUEST:
      return {
        ...state,
        addClaimData: null,
        addClaimDataError: false,
      };
    case CLAIM_CONST.ADD_CLAIM_SUCCESS:
      return {
        ...state,
        addClaimData: action.payload ? action.payload.response.data.data : null,
        addClaimDataError: false,
      };
    case CLAIM_CONST.ADD_CLAIM_FAILURE:
      return {
        ...state,
        addClaimData: null,
        addClaimDataError: action.payload.response.data.error.errorDescription,
      };
    //get claim by id
    case CLAIM_CONST.GET_CLAIM_DETAILS_REQUEST:
      return {
        ...state,
        getClaimsDataById: null,
        getClaimsDataError: false,
      };
    case CLAIM_CONST.GET_CLAIM_DETAILS_SUCCESS:
      return {
        ...state,
        getClaimsDataById: action.payload.response.data.isSuccess
          ? action.payload.response.data.data
          : null,
        getClaimsDataError: false,
      };
    case CLAIM_CONST.GET_CLAIM_DETAILS_FAILURE:
      return {
        ...state,
        getClaimsDataById: null,
        getClaimsDataError: action.payload.error ? true : false,
      };
    //get ticket attachment
    case CLAIM_CONST.GET_TICKET_ATTACHMENT_REQUEST:
      return {
        ...state,
        getTicketAttachmentData: null,
        getTicketAttachmentErrorStatus: false,
        // getTicketAttachmentNetworkErrorStatus: false,
      };
    case CLAIM_CONST.GET_TICKET_ATTACHMENT_SUCCESS:
      return {
        ...state,
        getTicketAttachmentData: action.payload.response
          ? action.payload.response.data.data
          : null,
        getTicketAttachmentErrorStatus: false,
        // getTicketAttachmentNetworkErrorStatus: false,
      };
    case CLAIM_CONST.GET_TICKET_ATTACHMENT_FAILURE:
      return {
        ...state,
        getTicketAttachmentData: null,
        getTicketAttachmentErrorStatus: action.payload.response
          ? action.payload.response.data.error.errorDescription
          : false,
      };
    //update ticket attachements
    case CLAIM_CONST.UPDATE_TICKET_ATTACHMENT_REQUEST:
      return {
        ...state,
        updateTicketAttachmentData: null,
        updateTicketAttachmentErrorStatus: false,
      };
    case CLAIM_CONST.UPDATE_TICKET_ATTACHMENT_SUCCESS:
      return {
        ...state,
        updateTicketAttachmentData: action.payload.response
          ? action.payload.response.data.data
          : null,
        updateTicketAttachmentErrorStatus: false,
      };
    case CLAIM_CONST.UPDATE_TICKET_ATTACHMENT_FAILURE:
      return {
        ...state,
        updateTicketAttachmentData: null,
        updateTicketAttachmentErrorStatus: action.payload.response
          ? action.payload.response.data.error.errorDescription
          : false,
      };
    // add claim by agent
    case CLAIM_CONST.ADD_CLAIM_BY_AGENT_REQUEST:
      return {
        ...state,
        addAgentClaimData: null,
        addAgentClaimDataError: false,
      };
    case CLAIM_CONST.ADD_CLAIM_BY_AGENT_SUCCESS:
      return {
        ...state,
        addAgentClaimData: action.payload.response.data.data,

        addAgentClaimDataError: false,
      };
    case CLAIM_CONST.ADD_CLAIM_BY_AGENT_FAILURE:
      return {
        ...state,
        addAgentClaimData: null,
        addAgentClaimDataError:
          action.payload.response.data.error.errorDescription,
      };
    // get all claims
    case CLAIM_CONST.GET_ALL_CLAIM_DETAILS_REQUEST:
      return {
        ...state,
        getAllClaimsData: null,
        getAllClaimsDataFail: null,
      };
    case CLAIM_CONST.GET_ALL_CLAIM_DETAILS_SUCCESS:
      return {
        ...state,
       
        getAllClaimsData: action.payload.response
        ? action.payload.response.data.data
        : null,
        getAllClaimsDataFail: null,
      };
    case CLAIM_CONST.GET_ALL_CLAIM_DETAILS_FAILURE:
      return {
        ...state,
        getAllClaimsData: null,
        // getAllClaimsDataFail: action.payload.response.data.data
        getAllClaimsDataFail:
          action.payload.response.data &&
          action.payload.response.data.error.errorDescription,
      };

    // Answer claim
    case CLAIM_CONST.ANSWER_CLAIM_REQUEST:
      return {
        ...state,
        isAnswerSuccess: null,
        isAnswerError: null,
      };
    case CLAIM_CONST.ANSWER_CLAIM_SUCCESS:
      return {
        ...state,
        isAnswerSuccess: action.payload.response.data.isSuccess ? true : false,
        isAnswerError: null,
      };
    case CLAIM_CONST.ANSWER_CLAIM_FAILURE:
      return {
        ...state,
        isAnswerSuccess: null,
        isAnswerError: action.payload.response.data.error.errorDescription,
      };

    // Assign claim to agent
    case CLAIM_CONST.ASSIGN_CLAIM_TO_AGENT_REQUEST:
      return {
        ...state,
        isAgentSuccess: null,
        isAgentFailure: null,
      };
    case CLAIM_CONST.ASSIGN_CLAIM_TO_AGENT_SUCCESS:
      return {
        ...state,
        isAgentSuccess: action.payload.response.data.isSuccess ? true : false,
        isAgentFailure: null,
      };
    case CLAIM_CONST.ASSIGN_CLAIM_TO_AGENT_FAILURE:
      return {
        ...state,
        isAgentSuccess: null,
        isAgentFailure: action.payload.response.data.error.errorDescription,
      };

    // Assign claim to Entity
    case CLAIM_CONST.ASSIGN_CLAIM_TO_ENTITY_REQUEST:
      return {
        ...state,
        isAssignEntitySuccess: null,
        isAssignEntityFailure: null,
      };
    case CLAIM_CONST.ASSIGN_CLAIM_TO_ENTITY_SUCCESS:
      return {
        ...state,
        isAssignEntitySuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isAssignEntityFailure: null,
      };
    case CLAIM_CONST.ASSIGN_CLAIM_TO_ENTITY_FAILURE:
      return {
        ...state,
        isAssignEntitySuccess: null,
        isAssignEntityFailure:
          action.payload.response.data.error.errorDescription,
      };
    //get claim attachment
    case CLAIM_CONST.GET_CLAIM_ATTACHMENT_REQUEST:
      return {
        ...state,
        getClaimAttachment: null,
        ClaimAttachmentData: null,
        isRequest: true,
      };
    case CLAIM_CONST.GET_CLAIM_ATTACHMENT_SUCCESS:
      return {
        ...state,
        getClaimAttachment: action.payload.response.data.isSuccess
          ? true
          : false,
        ClaimAttachmentData: action.payload.response.data.data,
        isRequest: false,
      };
    case CLAIM_CONST.GET_CLAIM_ATTACHMENT_FAILURE:
      return {
        ...state,
        getClaimAttachment: null,
        ClaimAttachmentData: null,
        isRequest: false,
      };

    //get list claim
    case CLAIM_CONST.GET_LIST_CLAIM_REQUEST:
      return {
        ...state,
        getListClaim: null,

        isRequest: true,
      };
    case CLAIM_CONST.GET_LIST_CLAIM_SUCCESS:
      return {
        ...state,
        getListClaim: action.payload.response.data.isSuccess ? true : false,

        isRequest: false,
      };
    case CLAIM_CONST.GET_LIST_CLAIM_FAILURE:
      return {
        ...state,
        getListClaim: null,

        isRequest: false,
      };

    //get list claim by Agent
    case CLAIM_CONST.GET_LIST_CLAIM_BY_AGENT_REQUEST:
      return {
        ...state,
        getListClaimAgent: null,
        isRequest: true,
      };
    case CLAIM_CONST.GET_LIST_CLAIM_BY_AGENT_SUCCESS:
      return {
        ...state,
        getListClaimAgent: action.payload.response.data.isSuccess
          ? true
          : false,

        isRequest: false,
      };
    case CLAIM_CONST.GET_LIST_CLAIM_BY_AGENT_FAILURE:
      return {
        ...state,
        getListClaimAgent: null,

        isRequest: false,
      };

    case CLAIM_CONST.TEMPORARY_APPROVE_CLAIM_REQUEST:
      return {
        ...state,
        temporaryApproveSuccess: null,
        temporaryApproveError: null,
        isRequest: true,
      };
    case CLAIM_CONST.TEMPORARY_APPROVE_CLAIM_SUCCESS:
      return {
        ...state,
        temporaryApproveSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        temporaryApproveError: null,
        isRequest: false,
      };
    case CLAIM_CONST.TEMPORARY_APPROVE_CLAIM_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        temporaryApproveSuccess: null,
        temporaryApproveError: action.payload.response
          ? action.payload.response.error.errorDescription
          : "",
        isRequest: false,
      };

    case CLAIM_CONST.GET_LIST_CLAIM_REPORTS_REQUEST:
      return {
        ...state,
        reportData: null,
        isRequest: true,
        isLoading: true,
      };
    case CLAIM_CONST.GET_LIST_CLAIM_REPORTS_SUCCESS:
      return {
        ...state,
          reportData: action.payload.response
            ? action.payload.response.data.data
            : null,
        isRequest: false,
        isLoading: false,
      };
    case CLAIM_CONST.GET_LIST_CLAIM_REPORTS_FAILURE:
      return {
        ...state,
        reportData: null,
        isRequest: false,
        isLoading: false,
      };

    case CLAIM_CONST.EXPORT_LIST_CLAIM_REPORTS_REQUEST:
      return {
        ...state,
        exportData: null,
        exportDataError: null,
        isRequest: true,
      };
    case CLAIM_CONST.EXPORT_LIST_CLAIM_REPORTS_SUCCESS:
      return {
        ...state,
        exportData: action.payload.response
          ? action.payload.response.data.data
          : null,
        exportDataError: null,
        isRequest: false,
      };
    case CLAIM_CONST.EXPORT_LIST_CLAIM_REPORTS_FAILURE:
      return {
        ...state,
        exportData: null,
        exportDataError: action.payload.error.data ? true : false,
        isRequest: false,
      };

    case CLAIM_CONST.GET_CLAIM_BY_ENTITY_STATISTICS_REQUEST:
      return {
        ...state,
        graphEntityData: null,
        graphEntityDataError: null,
        isRequest: true,
      };
    case CLAIM_CONST.GET_CLAIM_BY_ENTITY_STATISTICS_SUCCESS:
      return {
        ...state,
        graphEntityData: action.payload.response
          ? action.payload.response.data.data
          : null,
        graphEntityDataError: null,
        isRequest: false,
      };
    case CLAIM_CONST.GET_CLAIM_BY_ENTITY_STATISTICS_FAILURE:
      return {
        ...state,
        graphEntityData: null,
        graphEntityDataError: action.payload.error.data ? true : false,
        isRequest: false,
      };

    case CLAIM_CONST.GET_CLAIM_BY_CATEGORY_STATISTICS_REQUEST:
      return {
        ...state,
        graphCategoryData: null,
        graphCategoryDataError: null,
        isRequest: true,
      };
    case CLAIM_CONST.GET_CLAIM_BY_CATEGORY_STATISTICS_SUCCESS:
      return {
        ...state,
        graphCategoryData: action.payload.response
          ? action.payload.response.data.data
          : null,
        graphCategoryDataError: null,
        isRequest: false,
      };
    case CLAIM_CONST.GET_CLAIM_BY_CATEGORY_STATISTICS_FAILURE:
      return {
        ...state,
        graphCategoryData: null,
        graphCategoryDataError: action.payload.error.data ? true : false,
        isRequest: false,
      };
    //Progress claim
    case CLAIM_CONST.PROGRESS_CLAIM_REQUEST:
      return {
        ...state,
        isClaimProgressSuccess: null,
        isClaimProgressError: null,
      };
    case CLAIM_CONST.PROGRESS_CLAIM_SUCCESS:
      return {
        ...state,
        isClaimProgressSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isClaimProgressError: null,
        // isClaimProgressNetworkError: null,
      };
    case CLAIM_CONST.PROGRESS_CLAIM_FAILURE:
      return {
        ...state,
        isClaimProgressSuccess: null,
        isClaimProgressError: action.payload.response
          ? action.payload.response.error.errorDescription
          : null,
      };
    //Progress claim
    case CLAIM_CONST.APPROVE_CLAIM_REQUEST:
      return {
        ...state,
        isApproveClaimSuccess: null,
        isApproveClaimError: null,
      };
    case CLAIM_CONST.APPROVE_CLAIM_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isApproveClaimSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isApproveClaimError: null,
      };
    case CLAIM_CONST.APPROVE_CLAIM_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        isApproveClaimSuccess: null,
        isApproveClaimError: action.payload.response
          ? action.payload.response.error.errorDescription
          : "",
      };
  }
  return state;
}
