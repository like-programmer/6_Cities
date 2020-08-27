import React from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";
import {OfferType} from "../../const";

const FavoritesItem = (props) => {
  const {offerType, cityName, offers} = props;

  return (
    <li className="favorites__locations-items">

      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{cityName}</span>
          </a>
        </div>
      </div>

      <div className="favorites__places">

        {offers.map((offer, i) => {
          return <OfferCard
            offerType={offerType}
            card={offer}
            key={`${offer.title}-${i}`}
            onCardHover={() => {}}
            onCardClick={() => {}}
          />;
        })}

      </div>

    </li>
  );
};

FavoritesItem.propTypes = {
  offerType: PropTypes.oneOf([OfferType.CITIES, OfferType.NEARBY, OfferType.FAVORITES]).isRequired,
  cityName: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
};

export default FavoritesItem;
