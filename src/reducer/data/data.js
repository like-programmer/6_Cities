import {extend} from "../../utils.js";
import {getFilteredByCityOffers} from "../../utils";

const initialState = {
  offers: [],
  offersInCity: [],
  reviews: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  GET_OFFERS: `GET_OFFERS`,
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },

  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
  },

  getOffersInCity: (cityName) => ({
    type: ActionType.GET_OFFERS,
    payload: getFilteredByCityOffers(initialState.offers, cityName),
  }),
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

    case ActionType.GET_OFFERS:
      return extend(state, {
        offersInCity: action.payload,
      });
  }

  return state;
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/offers`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
      });
  },

  loadReviews: () => (dispatch, getState, api) => {
    return api.get(`/reviews`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(response.data));
      });
  },
};


export {
  reducer,
  ActionType,
  ActionCreator,
  Operation
};
