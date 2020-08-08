import React from "react";
import PropTypes from "prop-types";
import {SortType} from "../../const.js";

const Sorting = (props) => {
  const {} = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <select className="places__sorting-type" id="places-sorting" defaultValue="popular">
        {Object.values(SortType).map((type, i) => {
          return (
            <option className="places__option" value="popular"
              key={`${i}-${type.value}`}
            >
              {type.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};

Sorting.propTypes = {};

export default Sorting;
