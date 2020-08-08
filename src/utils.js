export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getFilteredByCityOffers = (offers, city) => {
  return offers.filter((offer) => {
    return offer.city.name === city;
  });
};
