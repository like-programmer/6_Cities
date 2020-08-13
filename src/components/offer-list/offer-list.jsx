import React from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

const OfferList = (props) => {
  const {
    className,
    offerCardClassName,
    offers,
    onCardHover,
    onCardClick,
  } = props;

  return <div className={`${className} places__list`}>

    {offers.map((offer, i) => {
      return <OfferCard
        className={offerCardClassName}
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
  offerCardClassName: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default OfferList;
