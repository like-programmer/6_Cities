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
import {getCity, getSortType, getHoveredCard} from "../../reducer/app/selectors.js";
import {OfferListClassNames, OfferCardClassNames} from "../../const.js";
import {getSortedOffers, getCityList, getFilteredByCityOffers} from "../../utils.js";

class MainScreen extends PureComponent {
  componentDidUpdate() {
    const {activeCity, offers, setActiveCity} = this.props;
     if (!activeCity) {
       setActiveCity(offers[0].city);
     }
  }

  render() {
    const {
      offers,
      mapClassName,
      // sortedOffers,
      // cityList,
      sortType,
      activeCity,
      hoveredCard,
      onActiveCityChange,
      onSortTypeChange,
      onCardHover,
      onCardClick,
    } = this.props;

    const activeCityCopy = Object.assign({}, activeCity);

    const cityList = getCityList(offers).slice(0, 6);
    const filteredOffers = getFilteredByCityOffers(offers, activeCityCopy);
    const sortedOffers = getSortedOffers(filteredOffers, sortType);

    return (
      <div className="page page--gray page--main">

        <PageHeader/>

        <main className={`page__main page__main--index`}>
          <h1 className="visually-hidden">Cities</h1>

          <div className="tabs">
            <section className="locations container">

              <CitiesList
                cities={cityList}
                activeCity={activeCityCopy}
                onActiveCityChange={onActiveCityChange}
              />

            </section>
          </div>

          <div className="cities">

            {sortedOffers.length === 0 ? <NoOffers city={activeCityCopy}/> :
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{sortedOffers.length} places to stay in {activeCityCopy.name}</b>

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
                    activeCIty={activeCityCopy}
                    hoveredCard={hoveredCard}
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
  mapClassName: PropTypes.string.isRequired,
  sortType: PropTypes.string,
  activeCity: PropTypes.object,
  hoveredCard: PropTypes.object.isRequired,
  onActiveCityChange: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  setActiveCity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
  sortType: getSortType(state),
  activeCity: getCity(state),
  hoveredCard: getHoveredCard(state),
});

const mapDispatchToProps = (dispatch) => ({
  onActiveCityChange(city) {
    dispatch(AppActionCreator.changeCity(city));
  },

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
