import {City, SortType} from "./const.js";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getFilteredByCityOffers = (offers, city) => {
  return offers.filter((offer) => {
    return offer.city.name === city;
  });
};

export const getCityCoordinates = (activeCity) => {
  const [foundedCity] = Object.values(City).filter((city) => city.name === activeCity);

  return foundedCity.coordinates;
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
