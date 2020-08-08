import {City} from "./const.js";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getFilteredByCityOffers = (offers, city) => {
  return offers.filter((offer) => {
    return offer.city.name === city;
  });
};

export const getCityCoordinates = (activeCity) => {
  let coordinates;

  for (let city in City) {
    if (City[city].name === activeCity) {
      coordinates = City[city].coordinates;
    }
  }
  return coordinates;
};
