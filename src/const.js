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

export const ReviewSettings = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 300,
  RATINGS: [`perfect`, `good`, `not-bad`, `badly`, `terribly`],
};

export const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

export const AppRoute = {
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  PROPERTY: `/offer`,
  ROOT: `/`,
};
