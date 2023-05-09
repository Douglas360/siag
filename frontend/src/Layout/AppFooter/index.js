import React, { Fragment } from 'react';
import { useAuth } from '../../context/AuthContext/useAuth';

const AppFooter = () => {
  const { user } = useAuth();

  return (
    <Fragment>
      <div className="app-footer">
        <div className="app-footer__inner">
          <div className="app-footer-left">
            <ul className="nav">
              <li className="nav-item">
                <a href="/" className="nav-link">
                  {user.empresa.nome}
                </a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link">
                    CNPJ: {user.empresa.cnpj}                

                </a>
              </li>
            </ul>
          </div>
          <div className="app-footer-right">
            <ul className="nav">
              <li className="nav-item">
                <a href="/" className="nav-link">
                  Footer Link 3
                </a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link">
                  <div className="badge bg-success me-1 ms-0">
                    <small>NEW</small>
                  </div>
                  Footer Link 4
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AppFooter;
