import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import PageHeader from "../page-header/page-header.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Sorting from "../sorting/sorting.jsx";
import OfferList from "../offer-list/offer-list.jsx";
import Map from "../map/map.jsx";
import NoOffers from "../no-offers/no-offers.jsx";
import {OfferListClassNames, OfferCardClassNames} from "../../const.js";
import {getSortedOffers, getCityList, getFilteredByCityOffers} from "../../utils.js";

const MainScreen = (props) => {
  const {
    mapClassName,
    sortedOffers,
    cityList,
    activeCity,
    hoveredCard,
    onActiveCityChange,
    onSortTypeChange,
    onCardHover,
    onCardClick,
  } = props;

  return (
    <div className="page page--gray page--main">

      <PageHeader/>

      <main className={`page__main page__main--index ${sortedOffers.length === 0 ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">

            <CitiesList
              cities={cityList}
              activeCity={activeCity}
              onActiveCityChange={onActiveCityChange}
            />

          </section>
        </div>

        <div className="cities">

          {sortedOffers.length === 0 ? <NoOffers cityName={activeCity}/> :
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{sortedOffers.length} places to stay in {activeCity.name}</b>

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
                  offers={sortedOffers}
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
  sortedOffers: PropTypes.array.isRequired,
  activeCity: PropTypes.object.isRequired,
  cityList: PropTypes.array.isRequired,
  hoveredCard: PropTypes.object.isRequired,
  onActiveCityChange: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const offers = state.offers;
  const sortType = state.sortType;
  const cityList = getCityList(offers).slice(0, 6);
  const activeCity = state.city ? state.city : cityList[0];
  const hoveredCard = state.hoveredCard;

  const filteredOffers = getFilteredByCityOffers(offers, activeCity);
  const sortedOffers = getSortedOffers(filteredOffers, sortType);


  return {
    sortedOffers,
    activeCity,
    cityList,
    hoveredCard,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onActiveCityChange(city) {
    dispatch(ActionCreator.changeCity(city));
  },

  onSortTypeChange(sortType) {
    dispatch(ActionCreator.changeSortType(sortType));
  },

  onCardHover(card) {
    dispatch(ActionCreator.setHoveredCard(card));
  },

  onCardClick(card) {
    dispatch(ActionCreator.setActiveOffer(card));
  },
});

export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
