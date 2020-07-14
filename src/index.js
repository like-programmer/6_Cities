import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const rentTitles = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`];

ReactDOM.render(
    <App
      rentTitles={rentTitles}/>,
    document.querySelector(`#root`)
);
