import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MainScreen from "../main-screen/main-screen.jsx";
import OfferDetailsScreen from "../offer-details-screen/offer-details-screen.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offers} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {/*{this._renderMainScreen()}*/}
            <MainScreen
              offers={offers}
              onCardClick={(offer) => {
                console.log(offer);
              }}
            />;
          </Route>

          <Route exact path="/details">
            <OfferDetailsScreen
              offer={offers[0]}
            />;
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default App;
