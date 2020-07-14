import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MainScreen from "./main-screen";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should card title be pressed`, () => {
  const rentCardClickHandler = jest.fn();

  const mainScreen = shallow(
      <MainScreen
        rentTitles={[`Wood and stone place`, `Canal View Prinsengracht`]}
        rentCardClickHandler={rentCardClickHandler}
      />
  );

  const cardTitle = mainScreen.find(`.place-card__name a`);

  cardTitle.props().onClick();

  expect(rentCardClickHandler.mock.calls.length).toBe(2);
});
