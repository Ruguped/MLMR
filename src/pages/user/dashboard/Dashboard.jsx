import React, { useState, useEffect } from 'react'
import useUserStore from '../../../store/userStore.js'
import {Link} from 'react-router-dom'



export default function Dashboard() {
  const { user } = useUserStore();
  const {
  _id,
  username,
  phone,
  email,
  role,
  isVerified,
  currentPlan,
  verificationStatus,
  sponsorId,
  sponsorUsername,
  referredByAdmin,
  investmentAmount,
  totalInvested,
  dailyROI,
  maxReturnPercentage,
  totalEarnings,
  lastROICalculated,
  directReferrals,
  totalReferrals,
  kycStatus,
  kycRejectionReason,
  kycSubmittedAt,
  totalCommission,
  depositWallet,
  investmentWallet,
  returnsWallet,
  isActive,
  isBanned,
  referralsByPlanL1,
  referralsByPlanL2ToL7,
  network,
  transactions,
  referralCode,
  createdAt,
  updatedAt,
  __v,
  kycDocuments: {
    panCard,
    aadhaarFront,
    aadhaarBack,
    selfie
  }
} = user;


console.log( 'there are referralsby plan L1', referralsByPlanL1, 'referralsByPlanL2ToL7', referralsByPlanL2ToL7, 'this is totalReferrals', totalReferrals);


  return (
    <div className="dashboard_right">
      <div className="top_header_dash">
        <div className="user_profile">
          <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" height="54px" width="54px" className="round_img" /></div>
          <div className="user_profile_cnt">
            <h3>{username}</h3>
            <ul className="user_social">
              <li><a href="#"><img src="/images/user_social.svg" alt="social" /></a></li>
              <li><a href="#"><img src="/images/user_social2.svg" alt="social" /></a></li>
            </ul>
          </div>
        </div>
        <div className="profile_id_s">
          <div className="profile_id">
            <span>UID :</span>
            <div>{_id}<img src="/images/uid_icon.svg" className="m-1" alt="icon" /></div>
          </div>
          <div className="profile_id">
            <span>Referral ID :</span>
            <div>{referralCode}<img src="/images/uid_icon.svg" className="m-1" alt="icon" /></div>
          </div>
          <div className="profile_id kycstatus">
            <span>KYC Status</span><a className="text-success" href="#">{kycStatus.toUpperCase()}</a>
          </div>
        </div>
      </div>
      <div className="estimated_balance">
        <div className="div_tag">
          <div className="balance_chart_left">
            <div className="d-flex justify-content-between">
              <h4>Plan</h4> <i className="fa-solid fa-angle-right" />
            </div>
            <div className="select_price">
              <div className="dashboardsummary_bottom">
                <h4>{currentPlan}<span className="price">
                  {currentPlan === 'Basic' ? '$50- $1k' : currentPlan === 'Silver' ? '$200- $2k' :
                   currentPlan === 'Gold' ? '$1k- $5k' : currentPlan === 'Platinum' ? '$2k- $10k' : currentPlan === 'Diamond' ? '$4k- $30k' : currentPlan === 'VIP' ? '$6k- $50k' : 'INACTIVE'}
                  </span></h4><a className="btn" href="#">View Plan</a>
              </div>
            </div>
          </div>
        </div>
        <div className="div_tag">
          <div className="balance_chart_left">
            <div className="d-flex justify-content-between">
              <h4>Income</h4> <i className="fa-solid fa-angle-right" />
            </div>
            <div className="select_price">
              <ul className="wallet_price_list">
                <li>
                  <h3>{totalEarnings} </h3>
                </li>
                <li><span>≈&nbsp;$&nbsp;{Math.round(totalEarnings)}</span></li>
              </ul>
              <div className="dashboardsummary_bottom">
                <h4>USD/$</h4><a className="btn" href="/trade/ETH_USDT">View More</a>
              </div>
            </div>
          </div>
        </div>
        <div className="div_tag">
          <div className="balance_chart_left">
            <div className="d-flex justify-content-between">
              <h4>Referrals</h4><i className="fa-solid fa-angle-right" />
            </div>
            <div className="select_price">
              <ul className="wallet_price_list">
                <li>
                  <h3 className="text-danger">{totalCommission}&nbsp;USD</h3>
                </li>
              </ul>
              <div className="dashboardsummary_bottom">
                <h4>USD/$</h4><a className="btn" href="/trade/BTC_USDT">View More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard_listing_section">
        <div className="listing_left_outer">
          <div className="crypto_deposit">
            <h4>Stat by depositing some crypto</h4>
            <ul>
              <li>
                <div className="estimate_cnt">
                  <h5> Estimated Portfolio</h5>
                  <h4>{investmentWallet}&nbsp;USDT {/*<span>0.00000000&nbsp;BNB</span>*/} <i className="ri-eye-line mx-1" /></h4>
                </div>
                <div className="estimated_portfolio"><Link to="/user/deposit">
                  <button className="deposit_btn" data-bs-toggle="modal" data-bs-target="#nextPopup">Deposit</button></Link>
                  <button className="deposit_btn withdraw">Withdraw</button>
                </div>
              </li>
            </ul>
          </div>
          <div className="growth_summary">
            <div className="d-flex team_tp">
              <h4>Team growth</h4>
              <span>Last Week</span>
            </div>
            <div className="summary_data">
              <img src="/images/data_summary.svg" />
            </div>
          </div>
          <div className="growth_summary">
            <div className="d-flex team_tp">
              <h4>Team growth</h4>
              <span>Year Chart</span>
            </div>
            <div className="summary_data">
              <img src="/images/data_summary2.svg" />
            </div>
          </div>
        </div>
        <div className="dashboard_right_side">
          <div className="new_features_s">
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
            <div className="recommendations_block">
              <h4>Recommendations</h4>
              <ul>
                <li>
                  <div className="cv_trade_img"><img src="/images/team_img.png" alt="recommendations" /></div>
                  <div className="cnt_slider_f">
                    <h6>Complete Identity Verification</h6>
                    <p>Lorem Ipsum&nbsp;is simply dummy text of theprinting andtypesetting industry. </p>
                    <button className="btn">KYC Verify</button>
                  </div>
                </li>
                <li>
                  <div className="cv_trade_img"><img src="/images/team_img.png" alt="recommendations" /></div>
                  <div className="cnt_slider_f">
                    <h6>Complete Identity Verification</h6>
                    <p>Lorem Ipsum&nbsp;is simply dummy text of theprinting andtypesetting industry. </p>
                    <button className="btn">KYC Verify</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}