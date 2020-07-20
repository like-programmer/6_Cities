import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MainScreen from "../main-screen/main-screen.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offers} = this.props;

    return <MainScreen
      offers={offers}
    />;
  }
}

App.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default App;
