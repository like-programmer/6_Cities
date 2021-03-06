import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";
import PageHeader from "../page-header/page-header.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Sorting from "../sorting/sorting.jsx";
import OfferList from "../offer-list/offer-list.jsx";
import Map from "../map/map.jsx";
import NoOffers from "../no-offers/no-offers.jsx";
import {getOffers} from "../../reducer/data/selectors.js";
import {getCity, getSortType} from "../../reducer/app/selectors.js";
import {MapClassNames, OfferListClassNames, OfferType} from "../../const.js";
import {getSortedOffers, getCityList, getFilteredByCityOffers} from "../../utils.js";

class MainScreen extends PureComponent {
  render() {
    const {
      offers,
      sortType,
      activeCity,
      setActiveCity,
      onSortTypeChange,
      onCardHover,
      onCardClick,
    } = this.props;

    const cityList = getCityList(offers).slice(0, 6);
    const filteredOffers = getFilteredByCityOffers(offers, activeCity);
    const sortedOffers = getSortedOffers(filteredOffers, sortType);

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
                onActiveCityChange={setActiveCity}
              />

            </section>
          </div>

          <div className="cities">

            {sortedOffers.length === 0 ?
              <NoOffers city={activeCity}/>
              :
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{sortedOffers.length} places to stay in {activeCity.name}</b>

                  <Sorting
                    onTypeChange={onSortTypeChange}
                  />

                  <OfferList
                    className={OfferListClassNames.MAIN_PAGE}
                    offerType={OfferType.CITIES}
                    offers={sortedOffers}
                    onCardHover={onCardHover}
                    onCardClick={onCardClick}
                  />

                </section>

                <div className="cities__right-section">

                  <Map
                    className={MapClassNames.CITY}
                    offers={sortedOffers}
                  />

                </div>
              </div>
            }

          </div>

        </main>

      </div>
    );
  }
}

MainScreen.propTypes = {
  offers: PropTypes.array,
  sortType: PropTypes.string,
  activeCity: PropTypes.object,
  onSortTypeChange: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  setActiveCity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
  sortType: getSortType(state),
  activeCity: getCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSortTypeChange(sortType) {
    dispatch(AppActionCreator.changeSortType(sortType));
  },

  onCardHover(card) {
    dispatch(AppActionCreator.setHoveredCard(card));
  },

  onCardClick(card) {
    dispatch(AppActionCreator.setActiveOffer(card));
  },

  setActiveCity(city) {
    dispatch(AppActionCreator.changeCity(city));
  },
});

export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
