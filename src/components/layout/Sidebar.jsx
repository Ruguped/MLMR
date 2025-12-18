import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
export function Sidebar({
  isSidebarOpen,
  isSidebarActive,
  handleCloseSidebar
}) {
  const location = useLocation()

  return <div className={`flex-shrink-0 leftside_menu${isSidebarOpen ? ' open' : ''}${isSidebarActive ? ' active' : ''}`} id="content">
    <div className="mobile_view" id="toggleBtn_two" onClick={handleCloseSidebar}><i className="fa-solid fa-xmark" /></div>
    <ul className="list-unstyled ps-0 navi_sidebar">
      <li className={location.pathname === '/user' ? 'active' : ''}>
        <Link
          to="/user"
        >
          <div className="cnt_menu_l">
            <img src="/images/dashboard_icon.svg" alt="Dashboard" />
            <h5>Dashboard</h5>
          </div>
        </Link>
      </li>
      <li className={location.pathname === '/user/plans' ? 'active' : ''}><Link to='/user/plans'>
        <div className="cnt_menu_l">
          <img src="/images/plans_icon.svg" alt="Plans" />
          <h5>Plans</h5>
        </div>
      </Link></li>
      <li className={location.pathname === '/user/wallet' ? 'active' : ''}><Link to='/user/wallet'>
        <button className="btn btn-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
          <div className="cnt_menu_l">
            <img src="/images/wallet_icon.svg" alt="Wallet" />
            <h5>Wallet</h5>
          </div>
          <span className="arrowmenu"><i className="fa-solid fa-chevron-down" /></span>
        </button>
        <div className="collapse" id="orders-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" className="rounded">Settings</a></li>
            <li><a href="#" className="rounded">Verification</a></li>
            <li><a href="#" className="rounded">Currency Preference</a></li>
          </ul>
        </div>
      </Link>
      </li>
      <li className={location.pathname === '/user/profile' ? 'active' : ''}><Link to='/user/profile'>
        <div className="cnt_menu_l">
          <img src="/images/profile_icon.svg" alt="Profile" />
          <h5>Profile</h5>
        </div>
      </Link></li>
      <li className={location.pathname === '/user/security' ? 'active' : ''}>
        <Link to="/user/security">
          <div className="cnt_menu_l">
            <img src="/images/security_icon.svg" alt="Security" />
            <h5>Security</h5>
          </div>
        </Link>
      </li>
      <li className={location.pathname === '/user/referrals' ? 'active' : ''}><Link to='/user/referrals'>
        <button className="btn btn-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
          <div className="cnt_menu_l">
            <img src="/images/security_icon.svg" alt="Referrals" />
            <h5>Referrals</h5>
          </div>
          <span className="arrowmenu"><i className="fa-solid fa-chevron-down" /></span>
        </button>
        <div className="collapse" id="account-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" className="rounded">Profile</a></li>
            <li><a href="#" className="rounded">Settings</a></li>
          </ul>
        </div></Link>
      </li>
      <li className={location.pathname === '/user/kyc' ? 'active' : ''}><Link to='/user/kyc'>
        <div className="cnt_menu_l">
          <img src="/images/kyc_icon.svg" alt="KYC" />
          <h5>KYC</h5>
        </div>
      </Link></li>
      <li className={location.pathname === '/user/support' ? 'active' : ''}><Link to='/user/support'>
        <button className="btn btn-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
          <div className="cnt_menu_l">
            <img src="/images/support_icon.svg" alt="Support" />
            <h5>Support</h5>
          </div>
          <span className="arrowmenu"><i className="fa-solid fa-chevron-down" /></span>
        </button>
        <div className="collapse" id="account-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" className="rounded">Settings</a></li>
          </ul>
        </div></Link>
      </li>
      <li className={location.pathname === '/user/logout' ? 'active' : ''}><Link to='/user/logout'>
        <div className="cnt_menu_l">
          <img src="/images/logout_icon.svg" alt="Logout" />
          <h5>Logout</h5>
        </div>
      </Link></li>
    </ul>
  </div>;
}
