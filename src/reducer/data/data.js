import {extend} from "../../utils.js";
import reviews from "../../mocks/reviews.js";
import Offer from "../../adapters/offer.js";
import {ActionCreator as AppActionCreator} from "../app/app.js";

const offersAdapter = new Offer();

const initialState = {
  offers: [],
  reviews,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const parsedOffers = response.data.map((offer) => offersAdapter.parse(offer));

        dispatch(ActionCreator.loadOffers(parsedOffers));
        dispatch(AppActionCreator.changeCity(parsedOffers[0].city));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:

      return extend(state, {
        offers: action.payload,
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
