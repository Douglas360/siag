import React, { Fragment } from 'react';
import {
  DropdownToggle,
  DropdownMenu,
  Nav,
  Button,
  NavItem,
  NavLink,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
} from 'reactstrap';
import { toast, Bounce } from 'react-toastify';
import { faCalendarAlt, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-toastify/dist/ReactToastify.css';
import avatar1 from '../../../assets/utils/images/avatars/3.jpg';
import { useAuth } from '../../../context/AuthContext/useAuth';
import { Divider } from '@mui/material';

const UserBox = () => {
  const { user, signOut } = useAuth();

  const notify2 = () =>
    toast("You don't have any new items in your calendar for today! Go out and play!", {
      transition: Bounce,
      closeButton: true,
      autoClose: 5000,
      position: 'bottom-center',
      type: 'success',
    });

  return (
    <Fragment>
      <div className="header-btn-lg pe-0">
        <div className="widget-content p-0">
          <div className="widget-content-wrapper">
            <div className="widget-content-left">
              <UncontrolledButtonDropdown>
                <DropdownToggle color="link" className="p-0">
                  <img width={35} height={35} className="rounded-circle w-10 bg-cover h-10 mt-2" src={user?.avatar} alt="" />
                  <FontAwesomeIcon className="ms-2 opacity-8" icon={faAngleDown} />
                </DropdownToggle>
                <DropdownMenu end className="rm-pointers dropdown-menu-lg">
                  <Nav vertical>
                    <NavItem className="nav-item-header">Activity</NavItem>
                    <NavItem>
                      <NavLink href="#">
                        Chat
                        <div className="ms-auto badge bg-pill bg-info">8</div>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#">Recover Password</NavLink>
                    </NavItem>
                    <NavItem className="nav-item-header">My Account</NavItem>
                    <NavItem>
                      <NavLink href="#">
                        Settings
                        <div className="ms-auto badge bg-success">New</div>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#">
                        Messages
                        <div className="ms-auto badge bg-warning">512</div>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#">Logs</NavLink>
                    </NavItem>
                    <Divider />
                  
                    <NavItem>
                      <NavLink href="#" onClick={signOut}>
                        Sair                                                          
                      </NavLink>
                    </NavItem>

                  </Nav>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
            <div className="widget-content-left  ms-3 header-user-info">
              <div className="widget-heading">{user?.name}</div>
              <div className="widget-subheading">{user?.cargo}</div>
            </div>

            <div className="widget-content-right header-user-info ms-3">
              <Button
                className="btn-shadow p-1"
                size="sm"
                onClick={notify2}
                color="info"
                id="Tooltip-1"
              >
                <FontAwesomeIcon className="me-2 ms-2" icon={faCalendarAlt} />
              </Button>
              <UncontrolledTooltip placement="bottom" target={'Tooltip-1'}>
                Click for Toastify Notifications!
              </UncontrolledTooltip>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserBox;
