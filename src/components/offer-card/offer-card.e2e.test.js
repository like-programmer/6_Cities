import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import OfferCard from "./offer-card.jsx";

configure({adapter: new Adapter()});

const card = {
  picture: `room.jpg`,
  price: 140,
  rating: `60%`,
  title: `Wood and stone place`,
  type: `Private room`,
  isBookmarked: false,
  isPremium: false,
};

it(`Simulate card hover`, () => {
  const onCardHover = jest.fn();

  const offerCard = shallow(<OfferCard
    card={card}
    key={`${card.title}-0`}
    onCardHover={onCardHover}
  />);

  offerCard.simulate(`mouseenter`, () => {
    onCardHover(card);
  });

  expect(onCardHover.mock.calls[0]).toMatchObject(card);
});
