import offers from "./mocks/offers.js";
import {City} from "./const.js";
import {extend} from "./utils.js";

const initialState = {
  city: City.AMSTERDAM.name,
  offers,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),

  getOffers: () => ({
    type: ActionType.GET_OFFERS,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });

    case ActionType.GET_OFFERS:
      return extend({}, state);
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
