import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data.js";
import PageHeader from "../page-header/page-header.jsx";
import ReviewList from "../review-list/review-list.jsx";
import ReviewForm from "../review-form/review-form.jsx";
import OfferList from "../offer-list/offer-list.jsx";
import Map from "../map/map.jsx";
import {getReviews, getNearbyOffers} from "../../reducer/data/selectors.js";
import {getActiveOffer, getHoveredCard, getCity} from "../../reducer/app/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {OfferListClassNames, OfferType} from "../../const.js";
import withReviewForm from "../../hocs/with-review-form/with-review-form.js";

const ReviewFormWrapped = withReviewForm(ReviewForm);

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

  _updateOffers() {
    const {offer, updateActiveOfferInOffers} = this.props;

    updateActiveOfferInOffers(offer);
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

    if (prevProps.offer.isFavorite !== this.props.offer.isFavorite) {
      this._updateOffers();
    }
  }

  render() {
    const {
      mapClassName,
      offer,
      nearbyOffers,
      reviews,
      activeCity,
      hoveredCard,
      authorizationStatus,
      onCardHover,
      onCardClick,
      onBookmarkClick,
    } = this.props;

    const activeCityCopy = Object.assign({}, activeCity);

    const capitalizedHousingType = offer.type.slice(0, 1).toUpperCase() + offer.type.slice(1);

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
                    {capitalizedHousingType}
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

                  </div>
                </div>

                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span
                    className="reviews__amount">{reviews.length}</span></h2>

                  <ReviewList
                    reviews={reviews}
                  />

                  {authorizationStatus === AuthorizationStatus.AUTH ?
                    <ReviewFormWrapped
                      offerId={offer.id}
                    />
                    : ``}

                </section>

              </div>
            </div>

            <Map
              className={mapClassName}
              offers={slicedOffers}
              activeCity={activeCityCopy}
              hoveredCard={hoveredCard}
            />

          </section>

          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>

              <OfferList
                className={OfferListClassNames.NEARBY}
                offerType={OfferType.NEARBY}
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
  activeCity: PropTypes.object,
  authorizationStatus: PropTypes.oneOf([AuthorizationStatus.AUTH, AuthorizationStatus.NO_AUTH]).isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired,
  loadNearbyOffers: PropTypes.func.isRequired,
  updateActiveOfferInOffers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offer: getActiveOffer(state),
  hoveredCard: getHoveredCard(state),
  reviews: getReviews(state),
  activeCity: getCity(state),
  nearbyOffers: getNearbyOffers(state),
  authorizationStatus: getAuthorizationStatus(state),
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
    // dispatch(DataActionCreator.updateActiveOfferInOffers(offer));
  },

  loadReviews(id) {
    dispatch(DataOperation.loadReviews(id));
  },

  loadNearbyOffers(id) {
    dispatch(DataOperation.loadNearbyOffers(id));
  },

  updateActiveOfferInOffers(offer) {
    dispatch(DataActionCreator.updateActiveOfferInOffers(offer));
  },
});

export {OfferDetailsScreen};
export default connect(mapStateToProps, mapDispatchToProps)(OfferDetailsScreen);
