import React from "react";
import PropTypes from "prop-types";
import CitiesListItem from "../cities-list-item/cities-list-item.jsx";

const CitiesList = (props) => {
  const {
    cities,
    activeCity,
    onActiveCityChange,
  } = props;

  return (
    <ul className="locations__list tabs__list">

      {cities.map((city, i) => {
        return <CitiesListItem
          key={`${i}-${city.name}`}
          city={city}
          isActive={city.name === activeCity.name}
          onActiveCityChange={onActiveCityChange}
        />;
      })}

    </ul>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.array.isRequired,
  activeCity: PropTypes.object,
  onActiveCityChange: PropTypes.func.isRequired,
};

export default CitiesList;
