import NameSpace from "../name-space";

const NAME_SPACE = NameSpace.DATA;

export const getReviews = (state) => {
  return state[NAME_SPACE].reviews;
};
