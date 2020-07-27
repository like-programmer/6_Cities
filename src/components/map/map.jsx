import React from "react";
import PropTypes from "prop-types";

const Map = (props) => {
  const {offers} = props;

  console.log(offers);

  return (<div/>);
};

Map.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default Map;
