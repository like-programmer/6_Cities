import React from "react";
import PropTypes from "prop-types";
import MainScreen from "../main-screen/main-screen.jsx";

const App = (props) => {
  const {rentTitles} = props;

  return (
    <MainScreen
      rentTitles={rentTitles} />
  );
};

App.propTypes = {
  rentTitles: PropTypes.array.isRequired,
};

export default App;
