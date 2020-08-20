import React from "react";
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

const MainScreen = (props) => {
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
  } = props;

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
  offers: PropTypes.array,
  mapClassName: PropTypes.string.isRequired,
  // sortedOffers: PropTypes.array.isRequired,
  sortType: PropTypes.string,
  activeCity: PropTypes.object,
  // cityList: PropTypes.array.isRequired,
  hoveredCard: PropTypes.object.isRequired,
  onActiveCityChange: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
  sortType: getSortType(state),
  activeCity: getCity(state),
  hoveredCard: getHoveredCard(state),
});

// const mapStateToProps = (state) => {
//   console.log(state);
  // const offers = getOffers(state);
  // const sortType = getSortType(state);
  // const cityList = getCityList(offers).slice(0, 6);
  // const stateCity = getCity(state);
  // const activeCity = stateCity ? stateCity : cityList[0];
  // console.log(offers);
  // console.log(stateCity ? stateCity : cityList[0]);
  // const hoveredCard = getHoveredCard(state);

  // const filteredOffers = getFilteredByCityOffers(offers, activeCity);
  // const sortedOffers = getSortedOffers(filteredOffers, sortType);


  // return {
    // offers,
    // sortedOffers,
    // activeCity,
    // cityList,
    // hoveredCard,
  // };
// };

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
});

export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
