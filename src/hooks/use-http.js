import { useReducer, useCallback } from "react";

function httpReducer(state, action) {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: "pending",
    };
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.responseData,
      error: null,
      status: "completed",
    };
  }

  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.errorMessage,
      status: "completed",
    };
  }
  // If action.type is unrecognized...
  return state;
}

function useHttp(requestFunction, startWithPending = false) {
  // startWithPending asks if you wish to having the pending state active on mount
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? "pending" : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData) {
      // must supply requestData as an arg when you call sendRequest in another function
      dispatch({ type: "SEND" });
      try {
        // Execute the request function you supplied as an argument
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (error) {
        dispatch({
          type: "ERROR",
          errorMessage: error.message || "Something went wrong!",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
    // 1. returns a function we can then call to start making requests in individual files
    // 2. returns { status: ~, data: ~, error: ~,}
  };
}

export default useHttp;

//# SUMMARY 
// ARG 1: An async function that makes a fetch request
// No need to incorporate error handling inside of it, since that's handled here

// ARG 2: Whether you wish to start with pending or not (Boolean)

// This function gives the arg 1 function pending/success/failure state support
// It returns a new 