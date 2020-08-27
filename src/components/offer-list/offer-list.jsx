import React from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

const OfferList = (props) => {
  const {
    className,
    offerType,
    offers,
    onCardHover,
    onCardClick,
  } = props;

  return <div className={`${className} places__list`}>

    {offers.map((offer, i) => {
      return <OfferCard
        offerType={offerType}
        card={offer}
        key={`${offer.title}-${i}`}
        onCardHover={onCardHover}
        onCardClick={onCardClick}
      />;
    })}

  </div>;
};

OfferList.propTypes = {
  className: PropTypes.string.isRequired,
  offerType: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default OfferList;
