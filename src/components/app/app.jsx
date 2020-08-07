import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import MainScreen from "../main-screen/main-screen.jsx";
import OfferDetailsScreen from "../offer-details-screen/offer-details-screen.jsx";
import {MapClassNames} from "../../const.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._offerCardClickHandler = this._offerCardClickHandler.bind(this);

    this.state = {
      offer: undefined,
    };
  }

  _offerCardClickHandler(card) {
    this.setState({
      offer: card,
    });
  }

  _renderMainScreen() {
    const {offers, reviews} = this.props;
    const {offer} = this.state;

    if (offer === undefined) {
      return (
        <MainScreen
          mapClassName={MapClassNames.CITY}
          offers={offers}
          onCardClick={this._offerCardClickHandler}
        />
      );
    } else {
      return (
        <OfferDetailsScreen
          mapClassName={MapClassNames.PROPERTY}
          offerID={offer.id}
          offers={offers}
          reviews={reviews}
          onCardClick={this._offerCardClickHandler}
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
              onCardClick={this._offerCardClickHandler}
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

const mapStateToProps = (state) => ({
  offers: state.offers,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
