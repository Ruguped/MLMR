import React from 'react';

export default function Referrals() {
  return <div className="dashboard_right">
  <div className="top_header_dash">
    <div className="user_profile">
      <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" height="54px" width="54px" className="round_img" /></div>
      <div className="user_profile_cnt">
        <h3>pallavsoni64@gmail.com</h3>
        <ul className="user_social">
          <li><a href="#"><img src="/images/user_social.svg" alt="social" /></a></li>
          <li><a href="#"><img src="/images/user_social2.svg" alt="social" /></a></li>
        </ul>
      </div>
    </div>
    <div className="profile_id_s">
      <div className="profile_id">
        <span>UID :</span>16439869<img src="/images/uid_icon.svg" className="m-1" alt="icon" />
      </div>
      <div className="profile_id">
        <span>Referral ID :</span>GATB253265<img src="/images/uid_icon.svg" className="m-1" alt="icon" />
      </div>
      <div className="profile_id kycstatus">
        <span>KYC Status</span><a className="text-success" href="#">KYC Verified</a>
      </div>
    </div>
  </div>
  <div className="wallect_s">
    <h2><img src="/images/wallet_vector.svg" />Referral</h2>
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Plan</th>
            <th>Reference</th>
            <th>Comminsion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="pagination">
      <button className="page-btn active">1</button>
      <button className="page-btn">2</button>
      <button className="page-btn">3</button>
      <button className="page-btn arrow">›</button>
    </div>
  </div>
  <div className="referral_reward_block">
    <div className="reward_cnt">
      <h2>Total Referral Reward: 6 USDT</h2>
      <h3>Earn 3 USDT for every friend you
        invite!</h3>
      <p>Invite a friend to Exchanges and get 3 USDT once they
        complete their KYC and first trade.</p>
      <div className="referralcode">
        <label>Referral</label>
        <div className="info_input">
          <div className="d-flex">
            <input type="text" placeholder="LUCK656594" />
            <span>Copy</span>
          </div>
        </div>
      </div>
      <ul className="socialmedia">
        <li><a href="#"><i className="fa-brands fa-instagram" /></a></li>
        <li><a href="#"><i className="fa-brands fa-x-twitter" /></a></li>
        <li><a href="#"><i className="fa-brands fa-facebook-f" /></a></li>
        <li><a href="#"><i className="fa-brands fa-youtube" /></a></li>
        <li><a href="#"><i className="fa-brands fa-telegram" /></a></li>
      </ul>
    </div>
    <div className="referral_offer_vector">
      <img src="/images/referral_offer_vector.svg" />
    </div>
  </div>
  <div className="referral_stats">
    <h5>Referral Stats</h5>
    <ul>
      <li>12 <span>Total Referrals(L1-L7)</span></li>
      <li>85 <span>Direct Referrals(L1)</span></li>
      <li>12,12345.2 <span>Total Commission</span></li>
    </ul>
    <a className="analyticsbtn" href="#">Detailed Analytics</a>
  </div>
  <div className="commision_rate">
    <h6>Commission Rates</h6>
    <ul>
      <li>L1: 10%</li>
      <li>L2: 5%</li>
      <li>L3: 3%</li>
      <li>L4-7: 1%</li>
    </ul>
  </div>
</div>
}