import React, { useState, useEffect } from 'react'
import useUserStore from '../../../store/userStore.js'
import {Link} from 'react-router-dom'
import SideProfile from '../../../components/layout/SideProfile'


export default function Dashboard() {
  const { user } = useUserStore();
  const {
  _id,
  username,
  phone,
  email,
  role,
  isVerified,
  highestPlan,
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
  //income wala ROI khud ka plan ke hisab se calculate karna hai
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
      <SideProfile />
      <div className="estimated_balance">
        <div className="div_tag">
          <div className="balance_chart_left">
            <div className="d-flex justify-content-between">
              <h4>Plan</h4> <i className="fa-solid fa-angle-right" />
            </div>
            <div className="select_price">
              <div className="dashboardsummary_bottom">
                <h4>{highestPlan}<span className="price">
                  {highestPlan === 'Basic' ? '$50- $1k' : highestPlan === 'Silver' ? '$200- $2k' :
                   highestPlan === 'Gold' ? '$1k- $5k' : highestPlan === 'Platinum' ? '$2k- $10k' : highestPlan === 'Diamond' ? '$4k- $30k' : highestPlan === 'VIP' ? '$6k- $50k' : 'INACTIVE'}
                  </span></h4><Link className="btn" to="/user/plans" state={{ from: 'dashboard' }}>View Plan</Link>
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