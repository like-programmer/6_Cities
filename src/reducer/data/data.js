import {extend} from "../../utils.js";
import {getFilteredByCityOffers} from "../../utils";

const initialState = {
  offers: [],
  offersInCity: [],
  reviews: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  GET_OFFERS: `GET_OFFERS`,
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },

  getOffers: (cityName) => ({
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

    case ActionType.GET_OFFERS:
      return extend(state, {
        offersInCity: action.payload,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
