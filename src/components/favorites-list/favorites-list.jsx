import React from "react";
import PropTypes from "prop-types";
import FavoritesItem from "../favorites-item/favorites-item.jsx";

const FavoritesList = (props) => {
  const {offers} = props;

  return (
    <ul className="favorites__list">

      <FavoritesItem
      offer={offers[0]}
      />

    </ul>
    );
};

FavoritesList.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default FavoritesList;
