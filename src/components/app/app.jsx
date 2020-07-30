import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MainScreen from "../main-screen/main-screen.jsx";
import OfferDetailsScreen from "../offer-details-screen/offer-details-screen.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      offer: undefined,
    };
  }

  _renderMainScreen() {
    const {offers, reviews} = this.props;
    const {offer} = this.state;

    if (offer === undefined) {
      return (
        <MainScreen
          offers={offers}
          onCardClick={(card) => {
            this.setState({
              offer: card,
            });
          }}
        />
      );
    } else {
      return (
        <OfferDetailsScreen
          offer={offer}
          reviews={reviews}
        />
      );
    }
  }

  render() {
    const {offers, reviews} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainScreen()}
          </Route>

          <Route exact path="/details">
            <OfferDetailsScreen
              offer={offers[0]}
              reviews={reviews}
            />;
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
};

export default App;
