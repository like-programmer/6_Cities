import React from "react";
import PropTypes from "prop-types";

const CitiesListItem = (props) => {
  const {name, isActive, onActiveCityChange} = props;

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive ? `tabs__item--active` : ``}`} href="#"
        onClick={(evt) => {
          evt.preventDefault();
          onActiveCityChange(name);
        }}
      >
        <span>{name}</span>
      </a>
    </li>
  );
};

CitiesListItem.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onActiveCityChange: PropTypes.func.isRequired,
};

export default CitiesListItem;
