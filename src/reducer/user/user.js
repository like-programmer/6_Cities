import {extend} from "../../utils.js";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizarionStatus: AuthorizationStatus.NO_AUTH,
  userData: null,
};

const ActionType = {
  SET_AUTHORIZATION_STATUS: `SET_AUTHORIZATION_STATUS`,
  SET_USER_DATA: `SET_USER_DATA`,
};

const ActionCreator = {
  setAuthorizationStatus: (status) => {
    return {
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: status,
    };
  },

  setUserData: (data) => {
    return {
      type: ActionType.SET_USER_DATA,
      payload: data,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTHORIZATION_STATUS:
      return extend(state, {
        authorizarionStatus: action.payload,
      });

    case ActionType.SET_USER_DATA:
      return extend(state, {
        userData: action.payload,
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then(({response}) => {
        dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUserData(response));
      });
  },
};

export {
  reducer,
  ActionType,
  ActionCreator,
  AuthorizationStatus,
  Operation,
};
