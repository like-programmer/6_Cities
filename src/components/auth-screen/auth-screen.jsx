import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import PageHeader from "../page-header/page-header.jsx";

class AuthScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._loginRef = createRef();
    this._passwordRef = createRef();

    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      login: this._loginRef.current.value,
      password: this._passwordRef.current.value,
    });
  }

  render() {
    return (
      <div className="page page--gray page--login">

        <PageHeader/>

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>

              <form
                className="login__form form"
                action="#"
                method="post"
                onSubmit={this.submitHandler}
              >

                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required=""
                    ref={this._loginRef}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required=""
                    ref={this._passwordRef}
                  />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>

            </section>

            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

AuthScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export {AuthScreen};
export default connect(null, mapDispatchToProps)(AuthScreen);
