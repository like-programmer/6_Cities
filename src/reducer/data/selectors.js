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

export const getOfferById = (state, id) => {
  const offers = getOffers(state);
  const [activeOffer] = offers.filter((offer) => offer.id === parseInt(id, 10));
  return activeOffer;
};
