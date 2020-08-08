import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
    this.map = null;
  }

  _addLayer(map) {
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      })
      .addTo(map);
  }

  _addMarker(pinCoords, map) {
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 40]
    });

    leaflet
      .marker(pinCoords, {icon})
      .addTo(map);
  }

  _initMap() {
    const {offers, cityLocation} = this.props;

    const container = this._mapRef.current;

    const zoom = 12;

    this.map = leaflet.map(container, {
      center: cityLocation,
      zoom,
      zoomControl: false,
      marker: true
    });

    this.map.setView(cityLocation, zoom);

    this._addLayer(this.map);

    offers.forEach((offer) => this._addMarker(offer.coordinates, this.map));
  }

  componentDidMount() {
    this._initMap();
  }

  componentDidUpdate() {
    this.map.remove();
    this._initMap();
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const {className} = this.props;

    return (
      <section
        id={`${className}-map`}
        className={`${className}__map map`}
        ref={this._mapRef}
      >
      </section>
    );
  }
}

Map.propTypes = {
  className: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  cityLocation: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default Map;
