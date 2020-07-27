import React from "react";
import PropTypes from "prop-types";
import leaflet from 'leaflet';

const Map = (props) => {
  const {offers} = props;

  const city = [52.38333, 4.9];
  const offerCords = [52.3709553943508, 4.89309666406198];

  const icon = leaflet.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [30, 30]
  });

  const zoom = 12;
  const map = leaflet.map(`map`, {
    center: city,
    zoom,
    zoomControl: false,
    marker: true
  });
  map.setView(city, zoom);

  leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
  })
    .marker(offerCords, {icon})
    .addTo(map);


  return (<div/>);
};

Map.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default Map;
