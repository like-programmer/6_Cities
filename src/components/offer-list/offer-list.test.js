import React from "react";
import renderer from "react-test-renderer";
import OfferList from "./offer-list.jsx";

const offers = [
  {
    picture: `apartment-02.jpg`,
    price: 90,
    rating: `20%`,
    title: `Beautiful place`,
    type: `Private room`,
    isBookmarked: true,
    isPremium: false,
  }
];

it(`Should OfferList render correctly`, () => {
  const tree = renderer
    .create(<OfferList
      offers={offers}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
