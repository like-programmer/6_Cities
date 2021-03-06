import {SortType} from "../../const.js";
import {extend} from "../../utils.js";

const initialState = {
  city: null,
  sortType: SortType.POPULAR.value,
  hoveredCard: {},
  activeOffer: null,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  SET_ACTIVE_OFFER: `SET_ACTIVE_OFFER`,
  SET_HOVERED_CARD: `SET_HOVERED_CARD`,
  REVERT_ACTIVE_OFFER_FAVORITE_FLAG: `REVERT_ACTIVE_OFFER_FAVORITE_FLAG`,
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),

  changeSortType: (sortType) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: sortType,
  }),

  setHoveredCard: (card) => ({
    type: ActionType.SET_HOVERED_CARD,
    payload: card,
  }),

  setActiveOffer: (card) => ({
    type: ActionType.SET_ACTIVE_OFFER,
    payload: card,
  }),

  revertActiveOfferFavoriteFlag: () => ({
    type: ActionType.REVERT_ACTIVE_OFFER_FAVORITE_FLAG,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });

    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        sortType: action.payload,
      });

    case ActionType.SET_HOVERED_CARD:
      return extend(state, {
        hoveredCard: action.payload,
      });

    case ActionType.SET_ACTIVE_OFFER:
      return extend(state, {
        activeOffer: action.payload,
      });

    case ActionType.REVERT_ACTIVE_OFFER_FAVORITE_FLAG:
      const newActiveOffer = extend(state.activeOffer, {
        isFavorite: !state.activeOffer.isFavorite,
      });

      return extend(state, {
        activeOffer: newActiveOffer,
      });
  }

  return state;
};

export {
  reducer,
  ActionType,
  ActionCreator
};
