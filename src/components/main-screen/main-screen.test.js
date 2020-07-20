import React from "react";
import renderer from "react-test-renderer";
import MainScreen from "./main-screen.jsx";

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

it(`Should MainScreen render correctly`, () => {
  const tree = renderer
    .create(<MainScreen
      offers={offers}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
