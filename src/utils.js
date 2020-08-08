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
  const [foundedCity] = Object.values(City).filter((city) => city.name === activeCity);

  return foundedCity.coordinates;
};
