import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import MainScreen from "../main-screen/main-screen.jsx";
import AuthScreen from "../auth-screen/auth-screen.jsx";
import FavoritesScreen from "../favorites-screen/favorites-screen.jsx";
import OfferDetailsScreen from "../offer-details-screen/offer-details-screen.jsx";
import history from "../../history.js";
import {AppRoute} from "../../const.js";
import {getOffers} from "../../reducer/data/selectors.js";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";


class App extends PureComponent {
  render() {
    const {offers, setActiveCity} = this.props;
    setActiveCity(offers[0].city);

    return (
      <BrowserRouter history={history}>
        <Switch>
          <Route
            exact
            path={AppRoute.ROOT}
            component={MainScreen}
          />
          <Route
            exact
            path={AppRoute.LOGIN}
            component={AuthScreen}
          />
          <Route
            exact path={AppRoute.FAVORITES}
            component={FavoritesScreen}
          />
          <Route
            exact path={`${AppRoute.PROPERTY}/:id`}
            component={OfferDetailsScreen}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.array,
  setActiveCity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActiveCity(city) {
    dispatch(AppActionCreator.changeCity(city));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
