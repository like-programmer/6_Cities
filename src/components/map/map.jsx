import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
    this._map = null;
    this._markers = [];
  }

  _addLayer(map) {
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);
  }

  _addMarker(pinCoords, map, isHovered) {

    const icon = leaflet.icon({
      iconUrl: isHovered ? `img/pin-active.svg` : `img/pin.svg`,
      iconSize: [30, 40]
    });

    this._markers.push(
        leaflet
        .marker(pinCoords, {icon})
        .addTo(map)
    );
  }


  _addMarkers() {
    const {offers, hoveredCard} = this.props;
    const isEmpty = Object.values(hoveredCard).length === 0;

    this._markers.forEach((marker) => {
      this._map.removeLayer(marker);
    });

    offers.forEach((offer) => {
      const coordinates = [offer.location.latitude, offer.location.longitude];

      if (!isEmpty && offer.id === hoveredCard.id) {
        this._addMarker(coordinates, this._map, true);
      } else {
        this._addMarker(coordinates, this._map, false);
      }
    });
  }

  _initMap() {
    const {offers, hoveredCard} = this.props;
    const isEmpty = Object.values(hoveredCard).length === 0;

    const city = isEmpty ? offers[0].city : hoveredCard.city;

    const container = this._mapRef.current;

    const zoom = city.location.zoom;
    const cityLocation = [city.location.latitude, city.location.longitude];

    this._map = leaflet.map(container, {
      center: cityLocation,
      zoom,
      zoomControl: false,
      marker: true
    });

    this._map.setView(cityLocation, zoom);

    this._addLayer(this._map);

    // this._addMarkers();
  }

  componentDidMount() {
    this._initMap();
    this._addMarkers();
  }

  componentDidUpdate(prevProps) {

    // if (this.props.offers[0].city.name !== prevProps.offers[0].city.name) {
    this._map.remove();
    this._initMap();
    // }

    this._addMarkers();
  }

  componentWillUnmount() {
    this._map.remove();
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
  hoveredCard: PropTypes.object.isRequired,
};

export default Map;
