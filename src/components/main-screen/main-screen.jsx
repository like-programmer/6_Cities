import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import CitiesList from "../cities-list/cities-list.jsx";
import Sorting from "../sorting/sorting.jsx";
import OfferList from "../offer-list/offer-list.jsx";
import Map from "../map/map.jsx";
import {OfferListClassNames, OfferCardClassNames} from "../../const.js";
import {getCityCoordinates} from "../../utils.js";

const MainScreen = (props) => {
  const {
    mapClassName,
    offers,
    activeCity,
    onCardClick,
    onActiveCityChange,
    onSortTypeChange,
  } = props;

  const cityCoordinates = getCityCoordinates(activeCity);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41}/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
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
                offers={offers}
                onCardClick={onCardClick}
              />

            </section>

            <div className="cities__right-section">

              <Map
                className={mapClassName}
                offers={offers}
                cityLocation={cityCoordinates}
              />

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

MainScreen.propTypes = {
  mapClassName: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  activeCity: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onActiveCityChange: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeCity: state.city,
  offers: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  onActiveCityChange(cityName) {
    dispatch(ActionCreator.changeCity(cityName));
    dispatch(ActionCreator.getOffers(cityName));
  },

  onSortTypeChange(sortType) {
    dispatch(ActionCreator.changeSortType(sortType));
  },
});

export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
