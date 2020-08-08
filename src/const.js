export const RATING = [20, 40, 60, 80, 100];

export const MapClassNames = {
  CITY: `cities`,
  PROPERTY: `property`,
};

export const OfferListClassNames = {
  MAIN_PAGE: `cities__places-list tabs__content`,
  NEARBY: `near-places__list`,
};

export const OfferCardClassNames = {
  MAIN_PAGE: `cities__place-card`,
  NEARBY: `near-places__card`,
};

export const City = {
  PARIS: {
    name: `Paris`,
    coordinates: [48.857183, 2.351556],
  },
  COLOGNE: {
    name: `Cologne`,
    coordinates: [50.9391, 6.96089],
  },
  BRUSSELS: {
    name: `Brussels`,
    coordinates: [50.847509, 4.351718],
  },
  AMSTERDAM: {
    name: `Amsterdam`,
    coordinates: [52.373057, 4.892557],
  },
  HAMBURG: {
    name: `Hamburg`,
    coordinates: [53.550645, 9.999287],
  },
  DUSSELDORF: {
    name: `Dusseldorf`,
    coordinates: [51.225969, 6.775428],
  },
};

export const SortType = {
  POPULAR: {
    name: `Popular`,
    value: `popular`,
  },
  LOW_TO_HIGH: {
    name: `Price: low to high`,
    value: `to-high`,
  },
  HIGH_TO_LOW: {
    name: `Price: high to low`,
    value: `to-low`,
  },
  TOP_RATED: {
    name: `Top rated first`,
    value: `top-rated`,
  },
};
