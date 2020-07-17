import React from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

const OfferList = (props) => {
  const {offers, onCardHover} = props;

  return (
    <div className="cities__places-list places__list tabs__content">

      <OfferCard
        card={offers[0]}
        onCardHover={onCardHover}
      />

    </div>
  );
};

OfferList.propTypes = {
  offers: PropTypes.array.isRequired,
  onCardHover: PropTypes.func.isRequired,
};

export default OfferList;
