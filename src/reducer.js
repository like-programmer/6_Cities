import offers from "./mocks/offers.js";
import {City, SortType} from "./const.js";
import {extend, getFilteredByCityOffers} from "./utils.js";

const initialState = {
  city: City.AMSTERDAM.name,
  offers: getFilteredByCityOffers(offers, City.AMSTERDAM.name),
  sortType: SortType.POPULAR.value,
  hoveredCard: {},
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  SET_HOVERED_CARD: `SET_HOVERED_CARD`,
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),

  getOffers: (cityName) => ({
    type: ActionType.GET_OFFERS,
    payload: getFilteredByCityOffers(offers, cityName),
  }),

  changeSortType: (sortType) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: sortType,
  }),

  setHoveredCard: (card) => ({
    type: ActionType.SET_HOVERED_CARD,
    payload: card,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });

    case ActionType.GET_OFFERS:
      return extend(state, {
        offers: action.payload,
      });

    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        sortType: action.payload,
      });

    case ActionType.SET_HOVERED_CARD:
      return extend(state, {
        hoveredCard: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
