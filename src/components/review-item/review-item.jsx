import React from "react";
import PropTypes from "prop-types";

const ReviewItem = (props) => {
  const {review} = props;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={`img/${review.avatar}`} width="54" height="54"
            alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">{review.userName}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${review.rating}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.text}</p>
        <time className="reviews__time" dateTime={review.date}>April 2019</time>
      </div>
    </li>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReviewItem;
