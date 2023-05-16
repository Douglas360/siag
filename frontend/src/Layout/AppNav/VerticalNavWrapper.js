import React, { Fragment } from 'react';
import MetisMenu from 'react-metismenu';
import { Divider } from '@mui/material';
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

function filterNavItems(navItems, userPermissions) {
  return navItems.map((item) => ({
    ...item,
    content: item.content.filter((submenu) =>
      userPermissions.includes(submenu.label)
    ),
  }));
}

function filterNavItem(navItem, userPermissions) {
  const { items } = navItem;
  const filteredItems = filterNavItems(items, userPermissions);
  return {
    ...navItem,
    items: filteredItems
  };
}

function Nav({ userProfile }) {
  const { perfil_acesso } = userProfile;

  const userPermissions = perfil_acesso
    .flatMap((perfil) => perfil.subroles.map((subrole) => subrole.name));

  const navItems = [
    { items: RegistrationNav },
    { items: AdministrativeNav },   
    { items: PedagogicalNav },
    { items: HumanResourceNav },
    { items: PatrimonialNav },
    { items: ConstructionNav },
    { items: ServiceNav },
    { items: LogisticsNav },
    { items: ChartsNav },
    { items: SettingsNav, showDivider: true },
  ];

  return (
    <Fragment>
      <h5 className="app-sidebar__heading">PRINCIPAL</h5>
      <MetisMenu content={MainNav} activeLinkFromLocation={true} className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />

      {navItems.map(({ items, showDivider }) => {
        const filteredItems = filterNavItem({ items, showDivider }, userPermissions);
        if (filteredItems.items[0].content.length > 0) {
          return (
            <Fragment key={items[0].id}>
              {showDivider && <Divider />}
              <MetisMenu
                content={filteredItems.items}
                activeLinkFromLocation={true}
                className="vertical-nav-menu"
                iconNamePrefix=""
                classNameStateIcon="pe-7s-angle-down"
              />
            </Fragment>
          );
        }
        return null;
      })}
    </Fragment>
  );
}

export default Nav;
