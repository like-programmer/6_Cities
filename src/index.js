import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import App from "./components/app/app.jsx";
import reducer from "./reducer/reducer.js";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducer/user/user.js";
import {createAPI} from "./api.js";
import withLoader from "./hocs/with-loader/with-loader.js";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

const WrappedApp = withLoader(App);

store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <WrappedApp/>
    </Provider>,
    document.querySelector(`#root`)
);
