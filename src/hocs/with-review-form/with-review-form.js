import React, {PureComponent} from 'react';

const withReviewRating = (Component) => {
  class WithReviewRating extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {};
    }

    render() {
      return (
        <Component
          {...this.props}
        />
      );
    }
  }

  return WithReviewRating;
};

export default withReviewRating;
