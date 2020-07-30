import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MainScreen from "../main-screen/main-screen.jsx";
import OfferDetailsScreen from "../offer-details-screen/offer-details-screen.jsx";
import {MapClassNames} from "../../const.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      offerID: -1,
    };
  }

  _renderMainScreen() {
    const {offers, reviews} = this.props;
    const {offerID} = this.state;

    if (offerID === -1) {
      return (
        <MainScreen
          mapClassName={MapClassNames.CITY}
          offers={offers}
          onCardClick={(id) => {
            this.setState({
              offerID: id,
            });
          }}
        />
      );
    } else {
      return (
        <OfferDetailsScreen
          mapClassName={MapClassNames.PROPERTY}
          offerID={offerID}
          offers={offers}
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
              mapClassName={MapClassNames.PROPERTY}
              offerID={1}
              offers={offers}
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
