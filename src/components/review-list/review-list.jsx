import React from "react";
import PropTypes from "prop-types";
import ReviewItem from "../review-item/review-item.jsx";

const ReviewList = (props) => {
  return (
    <ul className="reviews__list">
      <ReviewItem/>
    </ul>
  );
};

ReviewList.propTypes = {};

export default ReviewList;
