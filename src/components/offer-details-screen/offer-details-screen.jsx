import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";
import PageHeader from "../page-header/page-header.jsx";
import ReviewList from "../review-list/review-list.jsx";
import OfferList from "../offer-list/offer-list.jsx";
import Map from "../map/map.jsx";
import {getOffers, getReviews, getNearbyOffers} from "../../reducer/data/selectors.js";
import {getActiveOffer, getHoveredCard} from "../../reducer/app/selectors.js";
import {OfferListClassNames, OfferCardClassNames} from "../../const.js";

const MAX_OFFER_AMOUNT = 3;

class OfferDetailsScreen extends PureComponent {
  _loadReviews() {
    const {offer, loadReviews} = this.props;
    loadReviews(offer.id);
  }

  _loadNearbyOffers() {
    const {offer, loadNearbyOffers} = this.props;
    loadNearbyOffers(offer.id);
  }

  componentDidMount() {
    this._loadReviews();
    this._loadNearbyOffers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.offer.id !== this.props.offer.id) {
      this._loadReviews();
      this._loadNearbyOffers();
    }
  }

  render() {
    const {
      mapClassName,
      offer,
      offers,
      nearbyOffers,
      reviews,
      hoveredCard,
      onCardHover,
      onCardClick,
      onBookmarkClick,
    } = this.props;

    const starRating = offer.rating * 10;

    const slicedOffers = nearbyOffers.slice(0, MAX_OFFER_AMOUNT);

    return (
      <div className="page">

        <PageHeader/>


        <main className="page__main page__main--property">
          <section className="property">

            <div className="property__gallery-container container">
              <div className="property__gallery">

                {offer.images.map((image, i) => {
                  return (
                    <div
                      className="property__image-wrapper"
                      key={`${image}-${i}`}>
                      <img className="property__image" src={`${image}`} alt="Photo studio"/>
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
                    onClick={onBookmarkClick}
                  >
                    <svg
                      className="property__bookmark-icon"
                      width="31"
                      height="33"
                      style={{
                        stroke: (offer.isFavorite ? `#4481c3` : ``),
                        fill: (offer.isFavorite ? `#4481c3` : ``)
                      }}
                    >
                      <use xlinkHref="#icon-bookmark"/>
                    </svg>
                    <span className="visually-hidden">{offer.isFavorite ? `In bookmarks` : `To bookmarks`}</span>
                  </button>
                </div>

                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${starRating}%`}}/>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{offer.rating}</span>
                </div>

                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {offer.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {offer.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {offer.maxAdults} adults
                  </li>
                </ul>

                <div className="property__price">
                  <b className="property__price-value">&euro;{offer.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>

                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">

                    {offer.goods.map((appliance, i) => {
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
                      className={`property__avatar-wrapper ${offer.host.isPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                      <img
                        className="property__avatar user__avatar"
                        src={`${offer.host.avatarUrl}`}
                        width="74"
                        height="74"
                        alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">
                      {offer.host.name}
                    </span>
                  </div>
                  <div className="property__description">

                    <p className="property__text">{offer.description}</p>

                    {/*{offer.description.map((paragraph, i) => {*/}
                    {/*return (*/}
                    {/*<p*/}
                    {/*className="property__text"*/}
                    {/*key={`${paragraph}-${i}`}*/}
                    {/*>*/}
                    {/*{paragraph}*/}
                    {/*</p>*/}
                    {/*);*/}
                    {/*})}*/}

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
                      <input
                        className="form__rating-input visually-hidden"
                        name="rating"
                        value="5"
                        id="5-stars"
                        type="radio"/>
                      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"/>
                        </svg>
                      </label>

                      <input
                        className="form__rating-input visually-hidden"
                        name="rating"
                        value="4"
                        id="4-stars"
                        type="radio"/>
                      <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"/>
                        </svg>
                      </label>

                      <input
                        className="form__rating-input visually-hidden"
                        name="rating"
                        value="3"
                        id="3-stars"
                        type="radio"/>
                      <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"/>
                        </svg>
                      </label>

                      <input
                        className="form__rating-input visually-hidden"
                        name="rating"
                        value="2"
                        id="2-stars"
                        type="radio"/>
                      <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"/>
                        </svg>
                      </label>

                      <input
                        className="form__rating-input visually-hidden"
                        name="rating"
                        value="1"
                        id="1-star"
                        type="radio"/>
                      <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"/>
                        </svg>
                      </label>
                    </div>
                    <textarea
                      className="reviews__textarea form__textarea"
                      id="review"
                      name="review"
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
  offer: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    title: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    host: PropTypes.shape({
      name: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    title: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    host: PropTypes.shape({
      name: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  nearbyOffers: PropTypes.arrayOf(PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    title: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    host: PropTypes.shape({
      name: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  hoveredCard: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired,
  loadNearbyOffers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offer: getActiveOffer(state),
  offers: getOffers(state),
  hoveredCard: getHoveredCard(state),
  reviews: getReviews(state),
  nearbyOffers: getNearbyOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCardHover(card) {
    dispatch(AppActionCreator.setHoveredCard(card));
  },

  onCardClick(card) {
    dispatch(AppActionCreator.setActiveOffer(card));
  },

  onBookmarkClick() {
    dispatch(AppActionCreator.revertActiveOfferFavoriteFlag());
    dispatch(AppActionCreator.updateActiveOfferInOffers());
  },

  loadReviews(id) {
    dispatch(DataOperation.loadReviews(id));
  },

  loadNearbyOffers(id) {
    dispatch(DataOperation.loadNearbyOffers(id));
  },
});

export {OfferDetailsScreen};
export default connect(mapStateToProps, mapDispatchToProps)(OfferDetailsScreen);
