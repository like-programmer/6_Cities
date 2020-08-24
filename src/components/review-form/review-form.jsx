import React from "react";
import PropTypes from "prop-types";
import ReviewFormRating from "../review-form-rating/review-form-rating.jsx";
import {ReviewSettings} from "../../const.js";


const ReviewForm = (props) => {
  const {
    rating,
    message,
    onFormSubmit,
    onRatingChange,
    onMessageChange,
  } = props;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={onFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">

        {ReviewSettings.RATINGS.map((name, i) => (
          <ReviewFormRating
            key={`${name}-${i}`}
            name={name}
            value={ReviewSettings.RATINGS.length - i}
            isChecked={(ReviewSettings.RATINGS.length - i) === rating}
            onRatingChange={onRatingChange}
          />
        ))
        }

      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength={ReviewSettings.MIN_LENGTH}
        maxLength={ReviewSettings.MAX_LENGTH}
        value={message}
        onChange={onMessageChange}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b
          className="reviews__text-amount">{ReviewSettings.MIN_LENGTH} characters</b>.
        </p>

        <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  rating: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onMessageChange: PropTypes.func.isRequired,
};

export default ReviewForm;
