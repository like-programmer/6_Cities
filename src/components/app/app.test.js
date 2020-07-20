import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const offers = [
  {
    picture: `room.jpg`,
    price: 140,
    rating: `60%`,
    title: `Wood and stone place`,
    type: `Private room`,
    isBookmarked: false,
    isPremium: false,
  },
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      offers={offers}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
