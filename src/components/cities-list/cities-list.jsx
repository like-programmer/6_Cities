import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import CitiesListItem from "../cities-list-item/cities-list-item.jsx";

const getuniqueArray = (array) => {
  return Array.from(new Set(array));
};

const CitiesList = (props) => {
  const {
    offers,
    activeCity = offers[0].city.name,
    onActiveCityChange,
  } = props;

  const cityNamesList = getuniqueArray(offers.map((offer) => offer.city.name)).slice(0, 6);

  return (
    <ul className="locations__list tabs__list">

      {cityNamesList.map((cityName, i) => {
        return <CitiesListItem
          key={`${i}-${cityName}`}
          name={cityName}
          isActive={cityName === activeCity}
          onActiveCityChange={onActiveCityChange}
        />;
      })}

    </ul>
  );
};

CitiesList.propTypes = {
  offers: PropTypes.array.isRequired,
  activeCity: PropTypes.string,
  onActiveCityChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeCity: state.city,
});

const mapDispatchToProps = (dispatch) => ({
  onActiveCityChange(cityName) {
    dispatch(ActionCreator.changeCity(cityName));
  },
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
