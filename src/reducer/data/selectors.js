import NameSpace from "../name-space";

const NAME_SPACE = NameSpace.DATA;

export const getOffers = (state) => {
  return state[NAME_SPACE].offers;
};

export const getReviews = (state) => {
  return state[NAME_SPACE].reviews;
};

export const getNearbyOffers = (state) => {
  return state[NAME_SPACE].nearbyOffers;
};
