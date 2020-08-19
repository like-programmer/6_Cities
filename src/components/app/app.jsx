import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MainScreen from "../main-screen/main-screen.jsx";
import OfferDetailsScreen from "../offer-details-screen/offer-details-screen.jsx";
import {MapClassNames} from "../../const.js";
import {connect} from "react-redux";
import reviews from "../../mocks/reviews";

class App extends PureComponent {
  _renderMainScreen() {
    const {activeOffer} = this.props;

    if (activeOffer === undefined) {
      return (
        <MainScreen
          mapClassName={MapClassNames.CITY}
        />
      );
    } else {
      return (
        <OfferDetailsScreen
          mapClassName={MapClassNames.PROPERTY}
          offer={activeOffer}
          reviews={reviews}
        />
      );
    }
  }

  render() {
    const {activeOffer} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainScreen()}
          </Route>

          <Route exact path="/details">
            <OfferDetailsScreen
              mapClassName={MapClassNames.PROPERTY}
              offer={activeOffer}
              reviews={reviews}
            />;
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  activeOffer: PropTypes.object,
};

const mapStateToProps = (state) => ({
  activeOffer: state.activeOffer,
  reviews: state.reviews,
});

export {App};
export default connect(mapStateToProps)(App);
