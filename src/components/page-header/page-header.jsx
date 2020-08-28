import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus, getUserData} from "../../reducer/user/selectors.js";

const PageHeader = (props) => {
  const {
    userData,
    authorizationStatus,
  } = props;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              to={AppRoute.ROOT}
              className="header__logo-link header__logo-link--active"
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41}/>
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">

                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{`${userData.email}`}</span>
                  </a>
                  :
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </a>
                }

              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

PageHeader.propTypes = {
  userData: PropTypes.object,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userData: getUserData(state),
  authorizationStatus: getAuthorizationStatus(state),
});

export {PageHeader};
export default connect(mapStateToProps)(PageHeader);
