import React from "react";
export function Footer({}) {
  return <footer>
  <div className="container">
    <div className="footer_top_s">
      <div className="logo">
        <a href="#"><img src="/images/dametrade_logo.png" alt="logo" /></a>
      </div>
      <div className="footer_cnt_r">
        <p>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500.</p>
      </div>
    </div>
    <section className="footer_main">
      <div className="menu_s">
        <h3>Trading</h3>
        <ul>
          <li><a href="#">Global Trading</a></li>
          <li><a href="#">Real-Time Charts</a></li>
          <li><a href="#">Secure Platform</a></li>
          <li><a href="#">Smart Tools</a></li>
        </ul>
      </div>
      <div className="menu_s">
        <h3>Products</h3>
        <ul>
          <li><a href="#">Forex</a></li>
          <li><a href="#">Crypto</a></li>
          <li><a href="#">Stocks</a></li>
          <li><a href="#">Indices</a></li>
        </ul>
      </div>
      <div className="menu_s">
        <h3>Platforms</h3>
        <ul>
          <li><a href="#">WebTrader</a></li>
          <li><a href="#">Mobile App</a></li>
          <li><a href="#">MetaTrader 4</a></li>
          <li><a href="#">MetaTrader 5</a></li>
        </ul>
      </div>
      <div className="menu_s">
        <h3>Resources</h3>
        <ul>
          <li><a href="#">Market News</a></li>
          <li><a href="#">Trading Guides</a></li>
          <li><a href="#">Economic Calendar</a></li>
          <li><a href="#">Help Center</a></li>
        </ul>
      </div>
      <div className="menu_s">
        <h3>About</h3>
        <ul>
          <li><a href="#">Company</a></li>
          <li><a href="#">Mission</a></li>
          <li><a href="#">Team</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </section>
  </div>
  </footer>;
}
  