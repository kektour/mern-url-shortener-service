import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const auth = useContext(AuthContext);
  const history = useHistory();
  function logoutHandler(e) {
    e.preventDefault();
    auth.logout();
    history.push('/');
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Url shortener</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Log out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
