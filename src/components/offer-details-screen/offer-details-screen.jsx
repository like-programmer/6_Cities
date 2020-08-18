import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/website/website.js";
import PageHeader from "../page-header/page-header.jsx";
import ReviewList from "../review-list/review-list.jsx";
import OfferList from "../offer-list/offer-list.jsx";
import Map from "../map/map.jsx";
import {getOffers} from "../../reducer/data/selectors.js";
import {getCityName, getHoveredCard, getActiveOffer} from "../../reducer/website/selectors.js";
import {OfferListClassNames, OfferCardClassNames} from "../../const.js";
import {getCityCoordinates} from "../../utils.js";

const getFractionalRating = (relativeRating) => {
  return (relativeRating / 20).toFixed(1);
};

class OfferDetailsScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._changeBookmarkStateHandler = this._changeBookmarkStateHandler.bind(this);

    this.state = {
      isBookmarked: this.props.offer.isBookmarked,
    };
  }

  _changeBookmarkStateHandler() {
    this.setState({
      isBookmarked: !this.state.isBookmarked,
    });
  }

  render() {
    const {
      mapClassName,
      offer,
      offers,
      reviews,
      activeCity,
      hoveredCard,
      onCardHover,
      onCardClick,
    } = this.props;

    const fractionalRating = getFractionalRating(offer.rating);

    const offerIndex = offers.indexOf(offer);
    const nearbyOffers = [].concat(offers.slice(0, offerIndex), offers.slice(offerIndex + 1));
    const slicedOffers = nearbyOffers.slice(0, 3);

    const cityCoordinates = getCityCoordinates(activeCity);

    return (
      <div className="page">

        <PageHeader/>

        <main className="page__main page__main--property">
          <section className="property">

            <div className="property__gallery-container container">
              <div className="property__gallery">

                {offer.pictures.map((picture, i) => {
                  return (
                    <div
                      className="property__image-wrapper"
                      key={`${picture}-${i}`}>
                      <img className="property__image" src={`img/${picture}`} alt="Photo studio"/>
                    </div>
                  );
                })}

              </div>
            </div>

            <div className="property__container container">
              <div className="property__wrapper">

                {offer.isPremium ?
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                  : ``}

                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {offer.title}
                  </h1>
                  <button
                    className="property__bookmark-button button"
                    type="button"
                    onClick={this._changeBookmarkStateHandler}
                  >
                    <svg
                      className="property__bookmark-icon"
                      width="31"
                      height="33"
                      style={{
                        stroke: (this.state.isBookmarked ? `#4481c3` : ``),
                        fill: (this.state.isBookmarked ? `#4481c3` : ``)
                      }}
                    >
                      <use xlinkHref="#icon-bookmark"/>
                    </svg>
                    <span className="visually-hidden">{offer.isBookmarked ? `In bookmarks` : `To bookmarks`}</span>
                  </button>
                </div>

                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${offer.rating}%`}}/>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{fractionalRating}</span>
                </div>

                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {offer.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {offer.bedroomsCount} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {offer.guestsCount} adults
                  </li>
                </ul>

                <div className="property__price">
                  <b className="property__price-value">&euro;{offer.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>

                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">

                    {offer.appliances.map((appliance, i) => {
                      return (
                        <li
                          className="property__inside-item"
                          key={`${appliance}-${i}`}
                        >
                          {appliance}
                        </li>
                      );
                    })}

                  </ul>
                </div>

                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div
                      className={`property__avatar-wrapper ${offer.host.isSuper ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                      <img
                        className="property__avatar user__avatar"
                        src={`img/${offer.host.picture}`}
                        width="74"
                        height="74"
                        alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">
                      {offer.host.name}
                    </span>
                  </div>
                  <div className="property__description">

                    {offer.description.map((paragraph, i) => {
                      return (
                        <p
                          className="property__text"
                          key={`${paragraph}-${i}`}
                        >
                          {paragraph}
                        </p>
                      );
                    })}

                  </div>
                </div>

                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span
                    className="reviews__amount">{reviews.length}</span></h2>

                  <ReviewList
                    reviews={reviews}
                  />

                  <form className="reviews__form form" action="#" method="post">
                    <label className="reviews__label form__label" htmlFor="review">Your review</label>
                    <div className="reviews__rating-form form__rating">
                      <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars"
                        type="radio"/>
                      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"/>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars"
                        type="radio"/>
                      <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"/>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars"
                        type="radio"/>
                      <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"/>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars"
                        type="radio"/>
                      <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"/>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star"
                        type="radio"/>
                      <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"/>
                        </svg>
                      </label>
                    </div>
                    <textarea className="reviews__textarea form__textarea" id="review" name="review"
                      placeholder="Tell how was your stay, what you like and what can be improved"/>
                    <div className="reviews__button-wrapper">
                      <p className="reviews__help">
                        To submit review please make sure to set <span className="reviews__star">rating</span> and
                        describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                      </p>
                      <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
                    </div>
                  </form>

                </section>

              </div>
            </div>

            <Map
              className={mapClassName}
              offers={slicedOffers}
              cityLocation={cityCoordinates}
              hoveredCard={hoveredCard}
            />

          </section>

          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>

              <OfferList
                className={OfferListClassNames.NEARBY}
                offerCardClassName={OfferCardClassNames.NEARBY}
                offers={slicedOffers}
                onCardClick={onCardClick}
                onCardHover={onCardHover}
              />

            </section>
          </div>

        </main>
      </div>
    );
  }
}

OfferDetailsScreen.propTypes = {
  mapClassName: PropTypes.string.isRequired,
  activeCity: PropTypes.string.isRequired,
  hoveredCard: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  offer: PropTypes.array.isRequired,
  offers: PropTypes.array.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeCity: getCityName(state),
  offers: getOffers(state),
  hoveredCard: getHoveredCard(state),
  offer: getActiveOffer(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCardHover(card) {
    dispatch(ActionCreator.setHoveredCard(card));
  },

  onCardClick(card) {
    dispatch(ActionCreator.setActiveOffer(card));
  },
});

export {OfferDetailsScreen};
export default connect(mapStateToProps, mapDispatchToProps)(OfferDetailsScreen);
