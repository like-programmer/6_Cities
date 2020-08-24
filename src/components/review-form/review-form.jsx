import React from "react";
import ReviewFormRating from "../review-form-rating/review-form-rating.jsx";
import {ReviewSettings} from "../../const.js";


const ReviewForm = () => {
  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">

        {ReviewSettings.RATINGS.map((name, i) => (
          <ReviewFormRating
            key={`${name}-${i}`}
            name={name}
            value={i + 1}
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

export default ReviewForm;
