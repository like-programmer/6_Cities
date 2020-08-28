import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PageHeader from "../page-header/page-header.jsx";
import NoFavorites from "../no-favorites/no-favorites.jsx";
import FavoritesList from "../favorites-list/favorites-list.jsx";
import PageFooter from "../page-footer/page-footer.jsx";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {getFavoriteOffers} from "../../reducer/data/selectors.js";
import {OfferType} from "../../const.js";

class FavoritesScreen extends PureComponent {
  componentDidMount() {
    const {loadFavoriteOffers} = this.props;
    loadFavoriteOffers();
  }

  render() {
    const {favoriteOffers} = this.props;

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
                  offerType={OfferType.FAVORITES}
                  offers={favoriteOffers}
                />

              </section>
            }

          </div>
        </main>

        <PageFooter/>

      </div>
    );
  }
}

FavoritesScreen.propTypes = {
  loadFavoriteOffers: PropTypes.func.isRequired,
  favoriteOffers: PropTypes.array.isRequired,
  // userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  favoriteOffers: getFavoriteOffers(state),
  // userName: getUserName(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteOffers: () => {
    dispatch(DataOperation.loadFavoriteOffers());
  }
});

export {FavoritesScreen};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
