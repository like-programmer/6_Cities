import NameSpace from "../name-space";

const NAME_SPACE = NameSpace.WEBSITE;

export const getCityName = (state) => {
  return state[NAME_SPACE].city;
};

export const getSortType = (state) => {
  return state[NAME_SPACE].sortType;
};

export const getHoveredCard = (state) => {
  return state[NAME_SPACE].hoveredCard;
};

export const getActiveOffer = (state) => {
  return state[NAME_SPACE].activeOffer;
};
