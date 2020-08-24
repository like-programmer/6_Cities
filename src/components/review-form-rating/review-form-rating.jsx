import React, {Fragment} from "react";
import PropTypes from "prop-types";


const ReviewFormRating = (props) => {
  const {
    name,
    value,
    isChecked,
    onRatingChange,
  } = props;

  return (
    <Fragment>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={`${value}-stars`}
        type="radio"
        checked={isChecked}
        onChange={onRatingChange}
      />
      <label
        htmlFor={`${value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={name}>
        <svg
          className="form__star-image"
          width="37"
          height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>
    </Fragment>
  );
};

ReviewFormRating.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onRatingChange: PropTypes.func.isRequired,
};

export default ReviewFormRating;
