import { LoginSignUpPanel } from '../LoginSignUpPanel.jsx';
import useAuthStore from '../../store/authStore.js';
import { Link, useNavigate } from 'react-router-dom';



export function Header({ }) {
  const { isLoggedIn, logout } = useAuthStore()

  const handleLogout = () => {
    logout();
    useNavigate('/');
  }
  return <header>
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-2 col-lg-2 headerlogo">
          <div className="logo"><Link to="/"><img src="images/dametrade_logo.png" alt="dametrade_logo" /></Link></div>
        </div>
        <div className="col-sm-12 col-md-10 col-lg-10">
          <div className="header_right_bl">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <i className="fa-solid fa-bars" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="tradingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Trading
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="tradingDropdown">
                        <li><a className="dropdown-item" href="#">Forex Trading</a></li>
                        <li><a className="dropdown-item" href="#">Commodities</a></li>
                        <li><a className="dropdown-item" href="#">Indices</a></li>
                        <li><a className="dropdown-item" href="#">Stocks</a></li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Platforms</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Tool &amp; Resources</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Account Types</a>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="offersDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Offers
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="offersDropdown">
                        <li><a className="dropdown-item" href="#">Welcome Bonus</a></li>
                        <li><a className="dropdown-item" href="#">Referral Program</a></li>
                        <li><a className="dropdown-item" href="#">Loyalty Rewards</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="login_sign">
              <div className="language_option">
                <select>
                  <option>EN</option>
                  <option>HI</option>
                </select>
              </div>
              {/* check kara login hai --- hai toh button hata diya */}
              {isLoggedIn ?
                <>
                  <Link to='/user'><button className='signbtn'>Profile</button></Link>
                  <button className="signbtn" onClick={handleLogout}>Logout</button>
                </> :
                <>
                  <button data-bs-toggle="modal" data-bs-target="#loginModal">Login
                  </button>
                  <button className="signbtn">Start Trading</button>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>



    {!isLoggedIn && <LoginSignUpPanel />}







  </header>;
}
