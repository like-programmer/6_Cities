import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();

    this.state = {
      cityLocation: [52.38333, 4.9],
    };
  }

  _initMap(container) {
    const city = this.state.cityLocation;
    const zoom = 12;
    const map = leaflet.map(container, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    return map;
  }

  _addLayer(map) {
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      })
      .addTo(map);
  }

  componentDidMount() {
    const container = this._mapRef.current;
    const map = this._initMap(container);

    this._addLayer(map);
  }

  render() {
    return (
      <section
        id="map"
        className="cities__map map"
        style={{height: `100%`}}
        ref={this._mapRef}
      >
      </section>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default Map;
