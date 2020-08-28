import {extend} from "../../utils.js";
import Offer from "../../adapters/offer.js";
import Review from "../../adapters/review.js";

const offersAdapter = new Offer();
const reviewsAdapter = new Review();

const replaceItemInArray = (offers, item) => {
  const itemIndex = offers.indexOf(item);

  const newItem = extend(item, {
    isFavorite: !item.isFavorite,
  });

  return [].concat(offers.slice(0, itemIndex), newItem, offers.slice(itemIndex + 1));
};

const initialState = {
  offers: [],
  reviews: [],
  nearbyOffers: [],
  favoriteOffers: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_NEARBY_OFFERS: `LOAD_NEARBY_OFFERS`,
  LOAD_FAVORITE_OFFERS: `LOAD_FAVORITE_OFFERS`,
  UPDATE_FAVORITE: `UPDATE_FAVORITE`,
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

  loadFavoriteOffers: (offerList) => {
    return {
      type: ActionType.LOAD_FAVORITE_OFFERS,
      payload: offerList,
    };
  },

  updateFavorite: (offer) => {
    return {
      type: ActionType.UPDATE_FAVORITE,
      payload: offer,
    };
  },
};

const Operation = {
  loadOffers: (onSuccess) => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const parsedOffers = response.data.map((offer) => offersAdapter.parse(offer));

        dispatch(ActionCreator.loadOffers(parsedOffers));
        onSuccess();
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

  loadFavoriteOffers: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const parsedOffers = response.data.map((offer) => offersAdapter.parse(offer));

        dispatch(ActionCreator.loadFavoriteOffers(parsedOffers));
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

  updateFavorite: (offer) => (dispatch, getState, api) => {
    const status = offer.isFavorite ? 0 : 1;

    return api.post(`/favorite/${offer.id}/${status}`, offersAdapter.toRAW(offer))
      .then(() => {
        dispatch(ActionCreator.updateFavorite(offer));
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

    case ActionType.LOAD_FAVORITE_OFFERS:
      return extend(state, {
        favoriteOffers: action.payload,
      });

    case ActionType.UPDATE_FAVORITE:
      let newFavoriteOffers = state.favoriteOffers;

      if (action.payload.isFavorite === false) {
        const newOffer = extend(action.payload, {
          isFavorite: true,
        });

        newFavoriteOffers.push(newOffer);
      } else {
        const index = newFavoriteOffers.findIndex((offer) => offer.id === action.payload.id);

        if (index !== -1) {
          newFavoriteOffers.splice(index, 1);
        }
      }

      const newOffers = replaceItemInArray(state.offers, action.payload);
      const newNearbyOffers = replaceItemInArray(state.nearbyOffers, action.payload);

      return extend(state, {
        offers: newOffers,
        nearbyOffers: newNearbyOffers,
        favoriteOffers: newFavoriteOffers,
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
