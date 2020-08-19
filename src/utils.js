import {SortType} from "./const.js";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getFilteredByCityOffers = (offers, city) => {
  return offers.filter((offer) => {
    return offer.city.name === city.name;
  });
};

export const getCityList = (offers) => {
  const cityList = offers.map((offer) => offer.city);

  return Object.values(cityList.reduce((acc, it) => Object.assign(acc, {[it[`name`]]: it}), {}));
};

export const getSortedOffers = (offers, sortType) => {
  const offersCopy = offers.slice();

  switch (sortType) {
    case SortType.HIGH_TO_LOW.value:
      return offersCopy.sort((a, b) => b.price - a.price);
    case SortType.LOW_TO_HIGH.value:
      return offersCopy.sort((a, b) => a.price - b.price);
    case SortType.TOP_RATED.value:
      return offersCopy.sort((a, b) => b.rating - a.rating);
  }

  return offers;
};
