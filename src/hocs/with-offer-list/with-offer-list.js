import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withOfferList = (Component) => {
  class WithOfferList extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeCard: {},
      };
    }

    render() {
      return <Component
        {...this.props}
        onCardHover={(card) => {
          this.setState({
            activeCard: card,
          });
        }}
      />;
    }
  }

  WithOfferList.propTypes = {};

  return WithOfferList;
};

export default withOfferList;
