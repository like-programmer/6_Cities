import React from "react";
import PropTypes from "prop-types";
import MainScreen from "../main-screen/main-screen.jsx";

const onRentCardHover = () => {
};

const App = (props) => {
  const {offers} = props;

  return (
    <MainScreen
      offers={offers}
      onRentCardHover={onRentCardHover}
    />
  );
};

App.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default App;
