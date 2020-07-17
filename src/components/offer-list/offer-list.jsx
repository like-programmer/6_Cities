import React from "react";
import PropTypes from "prop-types";

const OfferList = (props) => {
  const {offers} = props;

  return (
    <div className="cities__places-list places__list tabs__content"></div>
  );
};

OfferList.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default OfferList;
