import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation as DataOperation} from "../../reducer/data/data.js";

const withReviewForm = (Component) => {
  class WithReviewForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        message: ``,
      };

      this._formSubmitHandler = this._formSubmitHandler.bind(this);
      this._ratingChangeHandler = this._ratingChangeHandler.bind(this);
      this._messageChangeHandler = this._messageChangeHandler.bind(this);
      this._onSuccess = this._onSuccess.bind(this);
      this._onError = this._onError.bind(this);
    }

    _formSubmitHandler(evt) {
      const {offerId, uploadReview} = this.props;

      evt.preventDefault();

      uploadReview(
          offerId,
          {
            comment: this.state.message,
            rating: this.state.rating,
          },
          this._onSuccess,
          this._onError
      );
    }

    _ratingChangeHandler(evt) {
      this.setState({
        rating: parseInt(evt.target.value, 10),
      });
    }

    _messageChangeHandler(evt) {
      this.setState({
        message: evt.target.value,
      });
    }

    _onSuccess() {
      this.setState({
        message: ``,
        rating: 0,
      });
    }

    _onError() {
    }

    render() {
      return (
        <Component
          {...this.props}
          rating={this.state.rating}
          message={this.state.message}
          onFormSubmit={this._formSubmitHandler}
          onRatingChange={this._ratingChangeHandler}
          onMessageChange={this._messageChangeHandler}
        />
      );
    }
  }

  WithReviewForm.propTypes = {
    offerId: PropTypes.number.isRequired,
    uploadReview: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = (dispatch) => ({
    uploadReview(id, message, onSuccess, onError) {
      dispatch(DataOperation.uploadReview(id, message, onSuccess, onError));
    },
  });

  return connect(null, mapDispatchToProps)(WithReviewForm);
};

export {withReviewForm};
export default withReviewForm;
