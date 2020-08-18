import NameSpace from "../name-space";

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].authorizarionStatus;
};

export const getUserData = (state) => {
  return state[NAME_SPACE].userData;
};
