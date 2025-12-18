import React from 'react';


export default function Profile() {
  return <div className="dashboard_right">
  <div className="d-flex profiled">
    <div className="profile_section">
      <h1>Profile</h1>
      <div className="top_header_dash">
        <div className="user_profile">
          <div className="user_img">
            <img src="/images/user_profile_icon.svg" alt="user" />
            <div className="camera_icon">
              {/* <img src="/images/camera_icon.svg" alt="camera"> */}
            </div>
          </div>
          <div className="user_profile_cnt">
            <h3>User Name</h3>
            <span>XYZ@gmail.com</span>
            <div className="prize_level_s">
              <img src="/images/trophy_vector.svg" alt="trophy" /> Level 1
            </div>
          </div>
        </div>
        <div className="profile_id">
          <button className="btn"><i className="fa-solid fa-pencil" /> Edit Profile </button>
        </div>
      </div>
      <ul className="rank_level_cate">
        <li>
          <span>Plan</span>
          <h5>Basic</h5>
        </li>
        <li>
          <span>ROI</span>
          <h5>1000</h5>
        </li>
        <li>
          <span>Referrals</span>
          <h5>1</h5>
        </li>
      </ul>
      <div className="reach_level_progress">
        <div className="progress-container">
          <div className="progress-bar" />
          <div className="progress-text">7 / 30</div>
          <img className="staricon2" src="/images/star_ranking_icon.svg" alt="star" />
        </div>
        <h6>To Reach Level 2</h6>
      </div>
      <div className="achievements_s">
        <h4>Achievements</h4>
        <div className="row">
          <div className="col-sm-12">
            <div className="achivement_block">
              <img src="/images/amount_vector.svg" alt="amount" />
              <div className="archivement_cnt">
                <h3>$1120</h3>
                <p>Total ROI Return Amount</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="achivement_block">
              <img src="/images/winning_ratio_vector.svg" alt="Winning" />
              <div className="archivement_cnt">
                <h3>41%</h3>
                <p>ROI Ratio</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="achivement_block">
              <img src="/images/won_vector.svg" alt="amount" />
              <div className="archivement_cnt">
                <h3>$1120</h3>
                <p>Total comission earned</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="features_block">
      <h4>Top Performers</h4>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>User List</th>
              <th>Paid to you</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="user_profile">
                  <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                  </div>
                  <div className="user_profile_cnt">
                    <h3>pallavsoni64@gmail.com</h3>
                    <p>Not Yet Uploaded</p>
                  </div>
                </div>
              </td>
              <td className="green">$100.50</td>
            </tr>
            <tr>
              <td>
                <div className="user_profile">
                  <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                  </div>
                  <div className="user_profile_cnt">
                    <h3>pallavsoni64@gmail.com</h3>
                    <p>Not Yet Uploaded</p>
                  </div>
                </div>
              </td>
              <td className="green">$100.50</td>
            </tr>
            <tr>
              <td>
                <div className="user_profile">
                  <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                  </div>
                  <div className="user_profile_cnt">
                    <h3>pallavsoni64@gmail.com</h3>
                    <p>Not Yet Uploaded</p>
                  </div>
                </div>
              </td>
              <td className="green">$100.50</td>
            </tr>
            <tr>
              <td>
                <div className="user_profile">
                  <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                  </div>
                  <div className="user_profile_cnt">
                    <h3>pallavsoni64@gmail.com</h3>
                    <p>Not Yet Uploaded</p>
                  </div>
                </div>
              </td>
              <td className="green">$100.50</td>
            </tr>
            <tr>
              <td>
                <div className="user_profile">
                  <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                  </div>
                  <div className="user_profile_cnt">
                    <h3>pallavsoni64@gmail.com</h3>
                    <p>Not Yet Uploaded</p>
                  </div>
                </div>
              </td>
              <td className="green">$100.50</td>
            </tr>
            <tr>
              <td>
                <div className="user_profile">
                  <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                  </div>
                  <div className="user_profile_cnt">
                    <h3>pallavsoni64@gmail.com</h3>
                    <p>Not Yet Uploaded</p>
                  </div>
                </div>
              </td>
              <td className="green">$100.50</td>
            </tr>
            <tr>
              <td>
                <div className="user_profile">
                  <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                  </div>
                  <div className="user_profile_cnt">
                    <h3>pallavsoni64@gmail.com</h3>
                    <p>Not Yet Uploaded</p>
                  </div>
                </div>
              </td>
              <td className="green right">$100.50</td>
            </tr>
            <tr>
              <td>
                <div className="user_profile">
                  <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                  </div>
                  <div className="user_profile_cnt">
                    <h3>pallavsoni64@gmail.com</h3>
                    <p>Not Yet Uploaded</p>
                  </div>
                </div>
              </td>
              <td className="green">$100.50</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
}