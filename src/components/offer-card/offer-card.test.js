import React from "react";
import renderer from "react-test-renderer";
import OfferCard from "./offer-card.jsx";

const card = {
  picture: `apartment-02.jpg`,
  price: 90,
  rating: `20%`,
  title: `Beautiful place`,
  type: `Private room`,
  isBookmarked: true,
  isPremium: false,
};

it(`Should OfferCard render correctly`, () => {
  const tree = renderer
    .create(<OfferCard
      card={card}
      key={`${card.title}-${1}`}
      onCardHover={() => {
      }}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
