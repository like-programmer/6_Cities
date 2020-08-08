import React from "react";
import PropTypes from "prop-types";
import CitiesListItem from "../cities-list-item/cities-list-item.jsx";
import {City} from "../../const.js";

const getCityNamesArray = () => {
  const namesArray = [];

  for (let city in City) {
    namesArray.push(City[city].name);
  }

  return namesArray.slice(0, 6);
};

const CitiesList = (props) => {
  const {
    activeCity = City[0].name,
    onActiveCityChange,
  } = props;

  const cityNamesArray = getCityNamesArray();

  return (
    <ul className="locations__list tabs__list">

      {cityNamesArray.map((cityName, i) => {
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
  activeCity: PropTypes.string,
  onActiveCityChange: PropTypes.func.isRequired,
};

export default CitiesList;
