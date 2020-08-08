import React from "react";
import PropTypes from "prop-types";
import CitiesListItem from "../cities-list-item/cities-list-item.jsx";
import {City} from "../../const.js";

const CitiesList = (props) => {
  const {
    activeCity = City[0].name,
    onActiveCityChange,
  } = props;

  return (
    <ul className="locations__list tabs__list">

      {Object.values(City).map((city, i) => {
        return <CitiesListItem
          key={`${i}-${city.name}`}
          name={city.name}
          isActive={city.name === activeCity}
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
