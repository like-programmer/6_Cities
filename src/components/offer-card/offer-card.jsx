import React from "react";
import PropTypes from "prop-types";

const OfferCard = (props) => {
  const {
    className,
    card,
    onCardHover,
    onCardClick,
  } = props;

  return (
    <article
      className={`${className} place-card`}
      onMouseEnter={() => onCardHover(card)}
      onMouseLeave={() => onCardHover({})}
      onClick={() => onCardClick(card)}
    >
      {card.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : ``}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={`img/${card.previewImage}`} width={260} height={200} alt={card.title}/>
        </a>
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
            <span style={{width: `${card.rating}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{card.title}</a>
        </h2>
        <p className="place-card__type">{card.type}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  className: PropTypes.string.isRequired,
  card: PropTypes.array.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default OfferCard;
