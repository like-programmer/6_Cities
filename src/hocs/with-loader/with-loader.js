import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Operation as DataOperation} from "../../reducer/data/data.js";


export default function withLoader(Component) {
  class WithLoader extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isOffersLoading: true,
      };
    }

    _loadData() {
      const {loadOffers} = this.props;

      loadOffers(() => {
        this.setState({
          isOffersLoading: false
        });
      });
    }

    render() {
      this._loadData();
      const {isOffersLoading} = this.state;

      return (
        (!isOffersLoading)
          ? <Component
            {...this.props}
          />
          : null
      );
    }
  }

  WithLoader.propTypes = {
    loadOffers: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = (dispatch) => ({
    loadOffers: (onSuccess) => {
      return dispatch(DataOperation.loadOffers(onSuccess));
    },
  });

  return connect(null, mapDispatchToProps)(WithLoader);

}
