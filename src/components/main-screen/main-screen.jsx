import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator as WebsiteActionCreator} from "../../reducer/website/website.js";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data.js";
import PageHeader from "../page-header/page-header.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Sorting from "../sorting/sorting.jsx";
import OfferList from "../offer-list/offer-list.jsx";
import Map from "../map/map.jsx";
import NoOffers from "../no-offers/no-offers.jsx";
import {getOffers} from "../../reducer/data/selectors.js";
import {getCityName, getSortType, getHoveredCard} from "../../reducer/website/selectors.js";
import {OfferListClassNames, OfferCardClassNames} from "../../const.js";
import {getCityCoordinates, getSortedOffers} from "../../utils.js";

const MainScreen = (props) => {
  const {
    mapClassName,
    offers,
    activeCity,
    sortType,
    hoveredCard,
    onActiveCityChange,
    onSortTypeChange,
    onCardHover,
    onCardClick,
  } = props;
  console.log(offers);

  const cityCoordinates = getCityCoordinates(activeCity);

  const sortedOffers = getSortedOffers(offers, sortType);

  return (
    <div className="page page--gray page--main">

      <PageHeader/>

      <main className={`page__main page__main--index ${offers.length === 0 ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">

            <CitiesList
              activeCity={activeCity}
              onActiveCityChange={onActiveCityChange}
            />

          </section>
        </div>

        <div className="cities">

          {offers.length === 0 ? <NoOffers cityName={activeCity}/> :
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in Amsterdam</b>

                <Sorting
                  onTypeChange={onSortTypeChange}
                />

                <OfferList
                  className={OfferListClassNames.MAIN_PAGE}
                  offerCardClassName={OfferCardClassNames.MAIN_PAGE}
                  offers={sortedOffers}
                  onCardHover={onCardHover}
                  onCardClick={onCardClick}
                />

              </section>

              <div className="cities__right-section">

                <Map
                  className={mapClassName}
                  offers={offers}
                  cityLocation={cityCoordinates}
                  hoveredCard={hoveredCard}
                />

              </div>
            </div>
          }

        </div>
      </main>
    </div>
  );
};

MainScreen.propTypes = {
  mapClassName: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  activeCity: PropTypes.string.isRequired,
  sortType: PropTypes.string.isRequired,
  hoveredCard: PropTypes.object.isRequired,
  onActiveCityChange: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeCity: getCityName(state),
  offers: getOffers(state),
  sortType: getSortType(state),
  hoveredCard: getHoveredCard(state),
});

const mapDispatchToProps = (dispatch) => ({
  onActiveCityChange(cityName) {
    dispatch(WebsiteActionCreator.changeCity(cityName));
    dispatch(DataActionCreator.getOffersInCity(cityName));
  },

  onSortTypeChange(sortType) {
    dispatch(WebsiteActionCreator.changeSortType(sortType));
  },

  onCardHover(card) {
    dispatch(WebsiteActionCreator.setHoveredCard(card));
  },

  onCardClick(card) {
    dispatch(WebsiteActionCreator.setActiveOffer(card));
  },
});

export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
