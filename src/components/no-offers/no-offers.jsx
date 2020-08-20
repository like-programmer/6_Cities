import React from "react";
import PropTypes from "prop-types";

const NoOffers = (props) => {
  const {city} = props;

  return (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property availbale at the moment
            in {city.name}</p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </div>
  );
};

NoOffers.propTypes = {
  city: PropTypes.object,
};

export default NoOffers;
