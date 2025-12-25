import { useState, useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { ThemeContext } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const themeContext = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  if (!themeContext) return null;

  const { isDarkMode, toggleTheme } = themeContext;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Employee List', path: '/list' },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <PeopleIcon className="navbar-icon" />
            <span className="navbar-title">Employee Management</span>
          </Link>

          <button
            className="hamburger-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <div className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-right">
            <div className="navbar-theme-toggle">
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                className="theme-button"
                aria-label="Toggle dark mode"
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {isDarkMode ? (
                  <Brightness7Icon className="theme-icon" />
                ) : (
                  <Brightness4Icon className="theme-icon" />
                )}
              </IconButton>
            </div>

            <div className="profile-dropdown">
              <button
                className="profile-button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                aria-label="User profile"
              >
                <AccountCircleIcon className="profile-icon" />
                <span className="profile-name">Admin</span>
              </button>

              {profileMenuOpen && (
                <div className="profile-menu">
                  <div className="profile-menu-header">
                    <AccountCircleIcon className="profile-menu-icon" />
                    <div className="profile-info">
                      <p className="profile-username">Admin User</p>
                      <p className="profile-email">admin@company.com</p>
                    </div>
                  </div>

                  <div className="profile-menu-divider"></div>

                  <button className="profile-menu-item">
                    <AccountCircleIcon className="menu-item-icon" />
                    View Profile
                  </button>

                  <button className="profile-menu-item">
                    <PeopleIcon className="menu-item-icon" />
                    Settings
                  </button>

                  <div className="profile-menu-divider"></div>

                  <button className="profile-menu-item logout">
                    <LogoutIcon className="menu-item-icon" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* <div className="breadcrumb-container">
        <div className="breadcrumb-inner">
          <Breadcrumb />
        </div>
      </div> */}
    </>
  );
};

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const breadcrumbs = [{ label: 'Home', path: '/' }];

    if (path === '/' || path === '') return breadcrumbs;

    if (path.includes('/list')) {
      breadcrumbs.push({ label: 'Employee List', path: '/list' });
    }

    if (path.includes('/create')) {
      breadcrumbs.push({ label: 'Employee List', path: '/list' });
      breadcrumbs.push({ label: 'Create Employee', path: '/create', isActive: true });
    }

    if (path.includes('/update')) {
      breadcrumbs.push({ label: 'Employee List', path: '/list' });
      breadcrumbs.push({ label: 'Update Employee', path, isActive: true });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="breadcrumb">
      {breadcrumbs.map((crumb, index) => (
        <div key={index} className="breadcrumb-item">
          {index > 0 && <span className="breadcrumb-separator">/</span>}
          {crumb.isActive ? (
            <span className="breadcrumb-current">{crumb.label}</span>
          ) : (
            <button
              className="breadcrumb-link"
              onClick={() => navigate(crumb.path)}
              style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
            >
              {crumb.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Navbar;
