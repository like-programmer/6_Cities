import React from "react";
import renderer from "react-test-renderer";
import MainScreen from "./main-screen.jsx";

it(`Should MainScreen render correctly`, () => {
  const tree = renderer
    .create(<MainScreen
      rentTitles={[`Wood and stone place`, `Canal View Prinsengracht`]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
