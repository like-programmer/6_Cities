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
    const {className, offerCardClassName, offers, onCardClick} = this.props;

    return <div className={`${className} places__list`}>

      {offers.map((offer, i) => {
        return <OfferCard
          className={offerCardClassName}
          card={offer}
          key={`${offer.title}-${i}`}
          onCardHover={(card) => this.setState({
            activeCard: card,
          })}
          onCardClick={onCardClick}
        />;
      })}

    </div>;
  }
}

OfferList.propTypes = {
  className: PropTypes.string.isRequired,
  offerCardClassName: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default OfferList;
