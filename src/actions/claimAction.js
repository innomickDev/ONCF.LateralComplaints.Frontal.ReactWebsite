import { CLAIM_CONST } from "./actionTypes";
import { AXIOS_INSTANCE, CLAIM_API, LOGIN_CONFIG } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";
import { canManage, permissions } from "../Pages/Helpers/utils";
//action for get my claims
export function getMyClaims() {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("boGRCAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.GET_MY_CLAIM_REQUEST));
    AXIOS_INSTANCE.get(`${CLAIM_API}/MyClaims`, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.GET_MY_CLAIM_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.GET_MY_CLAIM_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      // .catch(error => {
      //   checkHttpStatus(error.response);
      //   dispatch(
      //     base.getFailure(CLAIM_CONST.GET_MY_CLAIM_FAILURE, {
      //       error: {
      //         data: error
      //       }
      //     })
      //   );
      // });
      .catch((error) => {
        dispatch(base.handleCatch(CLAIM_CONST.GET_MY_CLAIM_FAILURE, error));
      });
  };
}

//action for add claim
export function addClaim(claimData, formValue) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("boGRCAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.ADD_CLAIM_REQUEST));
    AXIOS_INSTANCE.post(`${CLAIM_API}/AddClaim`, claimData, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.ADD_CLAIM_SUCCESS, {
              response: {
                data: result,
                formValue: formValue,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.ADD_CLAIM_FAILURE, {
              response: {
                data: result,
                formValue: formValue,
              },
            })
          );
        }
      })
      // .catch(error => {
      //   error = checkHttpStatus(error.response);
      //   dispatch(
      //     base.getFailure(CLAIM_CONST.ADD_CLAIM_FAILURE, {
      //       error: {
      //         data: error,
      //         formValue: formValue
      //       }
      //     })
      //   );
      // });
      .catch((error) => {
        dispatch(base.handleCatch(CLAIM_CONST.ADD_CLAIM_FAILURE, error));
      });
  };
}

// Get claim details by id
export function getClaimsDetailsById(code) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("boGRCAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.GET_CLAIM_DETAILS_REQUEST));
    AXIOS_INSTANCE.get(`${CLAIM_API}?code=${code}`, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.GET_CLAIM_DETAILS_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.GET_CLAIM_DETAILS_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(CLAIM_CONST.GET_CLAIM_DETAILS_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Get ticket attachment based on calim ID
export function getTicketAttachment(code) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("boGRCAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.GET_TICKET_ATTACHMENT_REQUEST));
    AXIOS_INSTANCE.get(`${CLAIM_API}/GetTicketAttachment?code=${code}`, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.GET_TICKET_ATTACHMENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.GET_TICKET_ATTACHMENT_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(CLAIM_CONST.GET_TICKET_ATTACHMENT_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}
// Get claim attachment based on calim ID
export function getClaimAttachment(code) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("boGRCAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.GET_CLAIM_ATTACHMENT_REQUEST));
    AXIOS_INSTANCE.get(`${CLAIM_API}/GetClaimAttachment?code=${code}`, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.GET_CLAIM_ATTACHMENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.GET_CLAIM_ATTACHMENT_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(CLAIM_CONST.GET_CLAIM_ATTACHMENT_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Update ticket attachment based on calim ID
export function updateTicketAttachment(formData) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("boGRCAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.UPDATE_TICKET_ATTACHMENT_REQUEST));
    AXIOS_INSTANCE.patch(
      `${CLAIM_API}/UpdateTicketAttachment`,
      formData,
      HEADER
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.UPDATE_TICKET_ATTACHMENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.UPDATE_TICKET_ATTACHMENT_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(CLAIM_CONST.UPDATE_TICKET_ATTACHMENT_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// add claim by agent
export function addClaimByAgent(claimData) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("boGRCAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.ADD_CLAIM_BY_AGENT_REQUEST));
    AXIOS_INSTANCE.post(`${CLAIM_API}/CreateClaimByAgent`, claimData, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.ADD_CLAIM_BY_AGENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.ADD_CLAIM_BY_AGENT_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          base.handleCatch(CLAIM_CONST.ADD_CLAIM_BY_AGENT_FAILURE, error)
        );
      });
  };
}

export function getAllClaims(queryParams) {
  const boGRCuserDetails = JSON.parse(localStorage.getItem("boGRCuserDetails"));
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.GET_ALL_CLAIM_DETAILS_REQUEST));
    if (canManage(permissions.canChangeClaimAssignment)) {
      if (queryParams) {
        apiPromise = AXIOS_INSTANCE.post(
          `${CLAIM_API}/GetClaims`,
          queryParams,
          LOGIN_CONFIG
        );
      } else {
        apiPromise = AXIOS_INSTANCE.post(
          `${CLAIM_API}/GetClaims`,
          LOGIN_CONFIG
        );
      }
    } else {
      if (queryParams) {
        queryParams.agentCode = parseInt(boGRCuserDetails.data.userCode);

        apiPromise = AXIOS_INSTANCE.post(
          `${CLAIM_API}/GetClaimByAgent`,
          queryParams
        );
      } else {
        apiPromise = AXIOS_INSTANCE.post(`${CLAIM_API}/GetClaimByAgent`, {
          agentCode: parseInt(boGRCuserDetails.data.userCode),
        });
      }
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.GET_ALL_CLAIM_DETAILS_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.GET_ALL_CLAIM_DETAILS_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(CLAIM_CONST.GET_ALL_CLAIM_DETAILS_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
    // .catch((error) => {
    //   dispatch(
    //     base.handleCatch(CLAIM_CONST.GET_ALL_CLAIM_DETAILS_FAILURE, error)
    //   );
    // });
  };
}
export function answerClaim(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.ANSWER_CLAIM_REQUEST));
    AXIOS_INSTANCE.patch(`${CLAIM_API}/AnswerClaim`, formData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.ANSWER_CLAIM_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.ANSWER_CLAIM_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      // .catch(error => {
      //   checkHttpStatus(error.response);
      //   dispatch(
      //     base.getFailure(CLAIM_CONST.ANSWER_CLAIM_FAILURE, {
      //       error: {
      //         data: error
      //       }
      //     })
      //   );
      // });
      .catch((error) => {
        dispatch(base.handleCatch(CLAIM_CONST.ANSWER_CLAIM_FAILURE, error));
      });
  };
}

// Update ticket attachment based on calim ID   // REJECT CLAIM

// Assign claim to agent
export function assignClaimToAgent(assignData) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.ASSIGN_CLAIM_TO_AGENT_REQUEST));
    AXIOS_INSTANCE.post(`${CLAIM_API}/AssignClaimToAgent`, assignData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.ASSIGN_CLAIM_TO_AGENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.ASSIGN_CLAIM_TO_AGENT_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          base.handleCatch(CLAIM_CONST.ASSIGN_CLAIM_TO_AGENT_FAILURE, error)
        );
      });
  };
}

// Assign claim to entity
export function assignClaimToEntity(assignData) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.ASSIGN_CLAIM_TO_ENTITY_REQUEST));
    AXIOS_INSTANCE.post(`${CLAIM_API}/AssignClaimToEntity`, assignData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.ASSIGN_CLAIM_TO_ENTITY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.ASSIGN_CLAIM_TO_ENTITY_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          base.handleCatch(CLAIM_CONST.ASSIGN_CLAIM_TO_ENTITY_FAILURE, error)
        );
      });
  };
}

// get claim by agent
export function getClaimsByAgent(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.GET_CLAIM_BY_AGENT_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.post(
        `${CLAIM_API}/getClaimClientsByAgent`,
        queryParams
      );
    } else {
      apiPromise = AXIOS_INSTANCE.post(`${CLAIM_API}/getClaimClientsByAgent`);
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.GET_CLAIM_BY_AGENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.GET_CLAIM_BY_AGENT_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      // .catch(error => {
      //   checkHttpStatus(error.response);
      //   dispatch(
      //     base.getFailure(CLAIM_CONST.GET_ALL_CLAIM_DETAILS_FAILURE, {
      //       error: {
      //         data: error
      //       }
      //     })
      //   );
      // });
      .catch((error) => {
        dispatch(
          base.handleCatch(CLAIM_CONST.GET_CLAIM_BY_AGENT_FAILURE, error)
        );
      });
  };
}

// Get List Claim
export function getListClaim(assignData) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.GET_LIST_CLAIM_REQUEST));
    AXIOS_INSTANCE.post(`${CLAIM_API}/getListClaim`, assignData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.GET_LIST_CLAIM_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.GET_LIST_CLAIM_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        dispatch(base.handleCatch(CLAIM_CONST.GET_LIST_CLAIM_FAILURE, error));
      });
  };
}

//  Get List Claim By Agent
export function getListClaimByAgent(code) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("boGRCAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.GET_LIST_CLAIM_BY_AGENT_REQUEST));
    AXIOS_INSTANCE.get(`${CLAIM_API}/getListClaimByAgent?code=${code}`, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.GET_LIST_CLAIM_BY_AGENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.GET_LIST_CLAIM_BY_AGENT_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(CLAIM_CONST.GET_LIST_CLAIM_BY_AGENT_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Get List Claim Reports

export function getListClaimReports(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.GET_LIST_CLAIM_REPORTS_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.get(
        `${CLAIM_API}/GetListClaimReports${queryParams}`
      );
    } else {
      apiPromise = AXIOS_INSTANCE.get(`${CLAIM_API}/GetListClaimReports`);
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result) {
          dispatch(
            base.getSuccess(CLAIM_CONST.GET_LIST_CLAIM_REPORTS_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.GET_LIST_CLAIM_REPORTS_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })

      .catch((error) => {
        dispatch(
          base.handleCatch(CLAIM_CONST.GET_LIST_CLAIM_REPORTS_FAILURE, error)
        );
      });
  };
}

// Get List Claim Reports

export function exportListClaimReports(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.EXPORT_LIST_CLAIM_REPORTS_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.get(
        `${CLAIM_API}/ExportListClaimReports${queryParams}`
      );
    } else {
      apiPromise = AXIOS_INSTANCE.get(`${CLAIM_API}/ExportListClaimReports`);
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result) {
          dispatch(
            base.getSuccess(CLAIM_CONST.EXPORT_LIST_CLAIM_REPORTS_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.EXPORT_LIST_CLAIM_REPORTS_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })

      .catch((error) => {
        dispatch(
          base.handleCatch(CLAIM_CONST.EXPORT_LIST_CLAIM_REPORTS_FAILURE, error)
        );
      });
  };
}

// Get claim by Entity Staistics

export function getClaimByEntityStatistics(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(
      base.getRequest(CLAIM_CONST.GET_CLAIM_BY_ENTITY_STATISTICS_REQUEST)
    );
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.get(
        `${CLAIM_API}/GetClaimByEntityStatistics${queryParams}`
      );
    } else {
      apiPromise = AXIOS_INSTANCE.get(
        `${CLAIM_API}/GetClaimByEntityStatistics`
      );
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result) {
          dispatch(
            base.getSuccess(
              CLAIM_CONST.GET_CLAIM_BY_ENTITY_STATISTICS_SUCCESS,
              {
                response: {
                  data: result,
                },
              }
            )
          );
        } else {
          dispatch(
            base.getFailure(
              CLAIM_CONST.GET_CLAIM_BY_ENTITY_STATISTICS_FAILURE,
              {
                response: {
                  data: result,
                },
              }
            )
          );
        }
      })

      .catch((error) => {
        dispatch(
          base.handleCatch(
            CLAIM_CONST.GET_CLAIM_BY_ENTITY_STATISTICS_FAILURE,
            error
          )
        );
      });
  };
}

// Get claim by Category Staistics

export function getClaimByCategoryStatistics(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(
      base.getRequest(CLAIM_CONST.GET_CLAIM_BY_CATEGORY_STATISTICS_REQUEST)
    );
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.get(
        `${CLAIM_API}/GetClaimByCategoryStatistics${queryParams}`
      );
    } else {
      apiPromise = AXIOS_INSTANCE.get(
        `${CLAIM_API}/GetClaimByCategoryStatistics`
      );
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result) {
          dispatch(
            base.getSuccess(
              CLAIM_CONST.GET_CLAIM_BY_CATEGORY_STATISTICS_SUCCESS,
              {
                response: {
                  data: result,
                },
              }
            )
          );
        } else {
          dispatch(
            base.getFailure(
              CLAIM_CONST.GET_CLAIM_BY_CATEGORY_STATISTICS_FAILURE,
              {
                response: {
                  data: result,
                },
              }
            )
          );
        }
      })

      .catch((error) => {
        dispatch(
          base.handleCatch(
            CLAIM_CONST.GET_CLAIM_BY_CATEGORY_STATISTICS_FAILURE,
            error
          )
        );
      });
  };
}

// claim progress
export function progressClaim(claimCode) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.PROGRESS_CLAIM_REQUEST));
    AXIOS_INSTANCE.post(`${CLAIM_API}/InProgressClaim`, claimCode)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.PROGRESS_CLAIM_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.PROGRESS_CLAIM_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(base.handleCatch(CLAIM_CONST.PROGRESS_CLAIM_FAILURE, error));
      });
  };
}

// claim reject
export function approveClaim(claimCode) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.APPROVE_CLAIM_REQUEST));
    AXIOS_INSTANCE.post(`${CLAIM_API}/ApproveClaim`, claimCode)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.APPROVE_CLAIM_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.APPROVE_CLAIM_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(base.handleCatch(CLAIM_CONST.APPROVE_CLAIM_FAILURE, error));
      });
  };
}

export function temporaryApproveClaim(claimCode) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.TEMPORARY_APPROVE_CLAIM_REQUEST));
    AXIOS_INSTANCE.post(`${CLAIM_API}/TemporaryApprovedClaim`, claimCode)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.TEMPORARY_APPROVE_CLAIM_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.TEMPORARY_APPROVE_CLAIM_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          base.handleCatch(CLAIM_CONST.TEMPORARY_APPROVE_CLAIM_FAILURE, error)
        );
      });
  };
}

export function rejectClaim(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM_CONST.ANSWER_CLAIM_REQUEST));
    AXIOS_INSTANCE.post(`${CLAIM_API}/RejectClaim`, formData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM_CONST.ANSWER_CLAIM_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM_CONST.ANSWER_CLAIM_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        dispatch(base.handleCatch(CLAIM_CONST.ANSWER_CLAIM_FAILURE, error));
      });
  };
}
