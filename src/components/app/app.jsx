import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MainScreen from "../main-screen/main-screen.jsx";
import AuthScreen from "../auth-screen/auth-screen.jsx";
import FavoritesScreen from "../favorites-screen/favorites-screen.jsx";
import history from "../../history.js";
import {AppRoute} from "../../const.js";


class App extends PureComponent {
  render() {
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
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {};

export default App;
