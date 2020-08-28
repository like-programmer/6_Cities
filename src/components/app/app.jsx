import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import MainScreen from "../main-screen/main-screen.jsx";
import OfferDetailsScreen from "../offer-details-screen/offer-details-screen.jsx";
import AuthScreen from "../auth-screen/auth-screen.jsx";
import FavoritesScreen from "../favorites-screen/favorites-screen.jsx";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {AppRoute} from "../../const.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getActiveOffer} from "../../reducer/app/selectors.js";
import {getOffers} from "../../reducer/data/selectors.js";


class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
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
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.array,
  activeOffer: PropTypes.object,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
  activeOffer: getActiveOffer(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
