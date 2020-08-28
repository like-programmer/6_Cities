import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute, OfferType} from "../../const.js";

const OfferCard = (props) => {
  const {
    offerType,
    card,
    onCardHover,
    onCardClick,
  } = props;

  const starRating = card.rating * 20;

  return (
    <article
      className={`${offerType === OfferType.CITIES ? `${OfferType.CITIES}__place-card` : `${offerType}__card`} place-card`}
      onMouseEnter={() => onCardHover(card)}
      onMouseLeave={() => onCardHover({})}
    >
      {card.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : ``}
      <div className={`${offerType}__image-wrapper place-card__image-wrapper`}>
        {/*<a href="#">*/}
          <img className="place-card__image" src={`${card.previewImage}`} width={260} height={200} alt={card.title}/>
        {/*</a>*/}
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{card.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${card.isFavorite ? `place-card__bookmark-button--active` : ``} button`}
            type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">{card.isFavorite ? `In bookmarks` : `To bookmarks`}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${starRating}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to={`${AppRoute.PROPERTY}/${card.id}`}
          >
            {card.title}
          </Link>
        </h2>
        <p className="place-card__type">{card.type}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offerType: PropTypes.oneOf([OfferType.CITIES, OfferType.NEARBY, OfferType.FAVORITES]).isRequired,
  card: PropTypes.shape({
    previewImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default OfferCard;
