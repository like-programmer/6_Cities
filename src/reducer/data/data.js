import {extend} from "../../utils.js";
import Offer from "../../adapters/offer.js";
import Review from "../../adapters/review.js";

const offersAdapter = new Offer();
const reviewsAdapter = new Review();

const initialState = {
  offers: [],
  reviews: [],
  nearbyOffers: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_NEARBY_OFFERS: `LOAD_NEARBY_OFFERS`,
  UPDATE_ACTIVE_OFFER_IN_OFFERS: `UPDATE_ACTIVE_OFFER_IN_OFFERS`,
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },

  loadReviews: (reviewList) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviewList,
    };
  },

  loadNearbyOffers: (offerList) => {
    return {
      type: ActionType.LOAD_NEARBY_OFFERS,
      payload: offerList,
    };
  },

  updateActiveOfferInOffers: (offer) => ({
    type: ActionType.UPDATE_ACTIVE_OFFER_IN_OFFERS,
    payload: offer,
  }),
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const parsedOffers = response.data.map((offer) => offersAdapter.parse(offer));

        dispatch(ActionCreator.loadOffers(parsedOffers));
      });
  },

  loadReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        const parsedReviews = response.data.map((review) => reviewsAdapter.parse(review));

        dispatch(ActionCreator.loadReviews(parsedReviews));
      });
  },

  loadNearbyOffers: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
      .then((response) => {
        const parsedOffers = response.data.map((offer) => offersAdapter.parse(offer));

        dispatch(ActionCreator.loadNearbyOffers(parsedOffers));
      });
  },

  uploadReview: (id, message, onSuccess, onError) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, message)
      .then((response) => {
        const parsedReviews = response.data.map((review) => reviewsAdapter.parse(review));

        dispatch(ActionCreator.loadReviews(parsedReviews));
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
    // //     onError(error);
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:

      return extend(state, {
        offers: action.payload,
      });

    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });

    case ActionType.LOAD_NEARBY_OFFERS:
      return extend(state, {
        nearbyOffers: action.payload,
      });

    case ActionType.UPDATE_ACTIVE_OFFER_IN_OFFERS:
      const activeOfferIndex = state.offers.map((offer) => offer.id).indexOf(action.payload.id);

      const newOffers = [].concat(state.offers.slice(0, activeOfferIndex), action.payload, state.offers.slice(activeOfferIndex + 1));

      return extend(state, {
        offers: newOffers,
      });
  }

  return state;
};


export {
  reducer,
  ActionType,
  ActionCreator,
  Operation
};
