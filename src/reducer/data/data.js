import {extend} from "../../utils.js";
import reviews from "../../mocks/reviews.js";

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload,
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
};


export {
  reducer,
  ActionType,
  ActionCreator,
  Operation
};
