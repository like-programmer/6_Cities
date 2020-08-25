import React from "react";
import PropTypes from "prop-types";
import PageHeader from "../page-header/page-header.jsx";
import PageFooter from "../page-footer/page-footer.jsx";

const NoFavorites = () => {

  return (
    <div className="page page--gray page--main">

      <PageHeader/>

      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan yor future
                trips.</p>
            </div>
          </section>
        </div>
      </main>

      <PageFooter/>

    </div>
  );
};

NoFavorites.propTypes = {};

export default NoFavorites;
