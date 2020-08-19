import React from "react";
import PropTypes from "prop-types";

const CitiesListItem = (props) => {
  const {
    city,
    isActive,
    onActiveCityChange
  } = props;

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive ? `tabs__item--active` : ``}`} href="#"
        onClick={(evt) => {
          evt.preventDefault();
          onActiveCityChange(city);
        }}
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
};

CitiesListItem.propTypes = {
  city: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  onActiveCityChange: PropTypes.func.isRequired,
};

export default CitiesListItem;
