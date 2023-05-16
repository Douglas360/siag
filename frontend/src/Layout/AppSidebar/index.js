import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Nav from '../AppNav/VerticalNavWrapper';
import HeaderLogo from '../AppLogo';
import { setEnableMobileMenu } from '../../reducers/ThemeOptions';
import { useAuth } from '../../context/AuthContext/useAuth';

const AppSidebar = ({
  backgroundColor,
  enableBackgroundImage,
  enableSidebarShadow,
  backgroundImage,
  backgroundImageOpacity,
  enableMobileMenu,
  setEnableMobileMenu,
}) => {
  const toggleMobileSidebar = () => {
    setEnableMobileMenu(!enableMobileMenu);
  };

  const { user } = useAuth();

  return (
    <Fragment>
      <div className="sidebar-mobile-overlay" onClick={toggleMobileSidebar} />
      <TransitionGroup>
        <CSSTransition
          component="div"
          className={cx('app-sidebar', backgroundColor, { 'sidebar-shadow': enableSidebarShadow })}
          appear={true}
          timeout={1500}
          enter={false}
          exit={false}
        >
          <div>
            <HeaderLogo />
            <PerfectScrollbar>
              <div className="app-sidebar__inner">
                <Nav
                  userProfile={user}

                />
              </div>
            </PerfectScrollbar>
            <div
              className={cx('app-sidebar-bg', backgroundImageOpacity)}
              style={{
                backgroundImage: enableBackgroundImage ? `url(${backgroundImage})` : null,
              }}
            ></div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  enableBackgroundImage: state.ThemeOptions.enableBackgroundImage,
  enableSidebarShadow: state.ThemeOptions.enableSidebarShadow,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  backgroundColor: state.ThemeOptions.backgroundColor,
  backgroundImage: state.ThemeOptions.backgroundImage,
  backgroundImageOpacity: state.ThemeOptions.backgroundImageOpacity,
});

const mapDispatchToProps = (dispatch) => ({
  setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);
