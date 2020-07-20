import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

class OfferList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: {},
    };
  }

  render() {
    const {offers} = this.props;

    return <div className="cities__places-list places__list tabs__content">

      {offers.map((offer, i) => {
        return <OfferCard
          card={offer}
          key={`${offer.title}-${i}`}
          onCardHover={(card) => {
            this.setState({
              activeCard: card,
            });
          }}
        />;
      })}

    </div>;
  }
}

OfferList.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default OfferList;
