import React from "react";
import PropTypes from "prop-types";
import ReviewItem from "../review-item/review-item.jsx";

const ReviewList = (props) => {
  const {reviews} = props;

  return (
    <ul className="reviews__list">

      {reviews.map((review, i) => {
        return (
          <ReviewItem
            key={`${review.comment}-${i}`}
            review={review}
          />
        );
      })}
    </ul>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default ReviewList;
