import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import MainScreen from "../main-screen/main-screen.jsx";
import OfferDetailsScreen from "../offer-details-screen/offer-details-screen.jsx";
import AuthScreen from "../auth-screen/auth-screen.jsx";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {MapClassNames} from "../../const.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getActiveOffer} from "../../reducer/app/selectors.js";
import {getOffers} from "../../reducer/data/selectors.js";

class App extends PureComponent {
  _renderMainScreen() {
    const {
      // offers,
      activeOffer,
      authorizationStatus,
      login
    } = this.props;

    // console.log(offers);

    // if (authorizationStatus === AuthorizationStatus.AUTH) {
    if (activeOffer === null) {
      return (
        <MainScreen
          mapClassName={MapClassNames.CITY}
        />
      );
    } else {
      return (
        <OfferDetailsScreen
          mapClassName={MapClassNames.PROPERTY}
        />
      );
    }
    // } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
    //   return (
    //     <AuthScreen
    //       onSubmit={login}
    //     />
    //   );
    // }

    // return null;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainScreen()}
          </Route>

          <Route exact path="/dev-details">
            <OfferDetailsScreen
              mapClassName={MapClassNames.PROPERTY}
            />;
          </Route>

          <Route exact path="/dev-auth">
            <AuthScreen
              onSubmit={() => {
              }}
            />;
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  // offers: PropTypes.array,
  activeOffer: PropTypes.object,
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // offers: getOffers(state),
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
