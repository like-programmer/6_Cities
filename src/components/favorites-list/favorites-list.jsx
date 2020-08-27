import React from "react";
import PropTypes from "prop-types";
import FavoritesItem from "../favorites-item/favorites-item.jsx";
import {getFilteredByCityOffers, getCityList} from "../../utils.js";

const FavoritesList = (props) => {
  const {offerType, offers} = props;

  const cityList = getCityList(offers);

  return (
    <ul className="favorites__list">

      {cityList.map((city, i) => {
        const filteredByCityOffers = getFilteredByCityOffers(offers, city);

        return <FavoritesItem
          key={`${city.name}-${i}`}
          offerType={offerType}
          cityName={city.name}
          offers={filteredByCityOffers}
        />;
      })}

    </ul>
  );
};

FavoritesList.propTypes = {
  offerType: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
};

export default FavoritesList;
