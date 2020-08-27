import React from "react";
import PropTypes from "prop-types";
import PageHeader from "../page-header/page-header.jsx";
import NoFavorites from "../no-favorites/no-favorites.jsx";
import FavoritesList from "../favorites-list/favorites-list.jsx";
import PageFooter from "../page-footer/page-footer.jsx";

import offers from "../../mocks/offers";

const favoriteOffers = offers;

const FavoritesScreen = () => {

  return (
    <div className="page page--gray page--main">

      <PageHeader/>

      <main
        className={`page__main page__main--favorites ${favoriteOffers.length === 0 ? `page__main--favorites-empty` : ``}`}>
        <div className="page__favorites-container container">

          {favoriteOffers.length === 0 ?
            <NoFavorites/>
            :
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>

              <FavoritesList
                offers={favoriteOffers}
              />

            </section>
          }

        </div>
      </main>

      <PageFooter/>

    </div>
  );
};

FavoritesScreen.propTypes = {};

export default FavoritesScreen;
