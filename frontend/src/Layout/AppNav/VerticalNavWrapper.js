import React, { Fragment } from 'react';
import MetisMenu from 'react-metismenu';
import {
  MainNav,
  ServiceNav,
  LogisticsNav,
  ChartsNav,
  AdministrativeNav,
  PedagogicalNav,
  HumanResourceNav,
  PatrimonialNav,
  ConstructionNav,
  RegistrationNav,
  SettingsNav
} from './NavItems';
import { Divider } from '@mui/material';

function Nav() {


  return (
    <Fragment>
      <h5 className="app-sidebar__heading">PRINCIPAL</h5>      

      <MetisMenu content={MainNav} activeLinkFromLocation={true} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />

      <MetisMenu content={RegistrationNav} activeLinkFromLocation={true} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />

      <MetisMenu content={AdministrativeNav} activeLinkFromLocation={true} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />

      {/*<h5 className="app-sidebar__heading">Menu</h5>*/}
      <MetisMenu content={PedagogicalNav} activeLinkFromLocation={true} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />

      {/*<h5 className="app-sidebar__heading">UI Components</h5>*/}
      <MetisMenu content={HumanResourceNav} activeLinkFromLocation={true} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />

      <MetisMenu content={PatrimonialNav} activeLinkFromLocation={true} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />

      <MetisMenu content={ConstructionNav} activeLinkFromLocation={true} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />

      {/* <h5 className="app-sidebar__heading">Widgets</h5>*/}
      <MetisMenu content={LogisticsNav} activeLinkFromLocation={true} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />

      {/*<h5 className="app-sidebar__heading">Forms</h5>*/}
      <MetisMenu content={ServiceNav} activeLinkFromLocation={true} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />

      {/*<h5 className="app-sidebar__heading">Charts</h5>*/}
      <MetisMenu content={ChartsNav} activeLinkFromLocation={true} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />

      
      <Divider />
      <MetisMenu content={SettingsNav} activeLinkFromLocation={true} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />

    </Fragment>
  );
}

export default Nav;
