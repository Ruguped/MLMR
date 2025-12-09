import { Faq } from '../components/Faq';
import React from "react";


export default function Landing() {
  return (
    <>
      <section className="hero_section">
        <div className="banner_top_lft_vector">
          <img src="images/banner_top_lft_vector.svg" alt="topvector" />
        </div>
        <div className="container">
          <div className="banner_section">
            <div className="rounded_vector">
              <img src="images/right_vector_effect.svg" />
            </div>
            <div className="banner_cnt">
              <h1>Build Your Team. Grow Your Income. Achieve Financial Freedom.</h1>
              <p>Join India’s fastest-growing MLM community and unlock unlimited earning opportunities.</p>
              <button className="btn">Start Your Journey Today</button>
              <ul>
                <li>
                  Support
                  <span>2016</span>
                </li>
                <li>
                  Users
                  <span>210K</span>
                </li>
                <li>
                  Max Roi
                  <span>600</span>
                </li>
              </ul>
            </div>
            <div className="banner_img">
              <div className="top_vector">
                <img src="images/a_vector.svg" />
              </div>
              <img src="images/banner_img.svg" alt="banner" />
            </div>
          </div>
        </div>
        <div className="vector_bottom">
          <img src="images/banner_bottom_vector.svg" alt="bottomlft" />
        </div>
      </section>


      <section className="why_choose_s">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="row">
            <div className="col-sm-4">
              <div className="whyblock">
                <div className="line_animation">
                  <img src="images/line_vector.svg" />
                </div>
                <div className="instant_vector">
                  <img src="images/tracking_vector.svg" alt="transparent" />
                </div>
                <div className="whychoose_cnt">
                  <div className="left_animation">
                    <img src="images/radius_effect.svg" />
                  </div>
                  <div className="cnt">
                    <h3>100% Transparent</h3>
                    <p>Real-time income tracking with complete clarity.</p>
                  </div>
                  <button>Learn More <i className="fa-solid fa-arrow-right" /></button>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="whyblock">
                <div className="whychoose_cnt">
                  <div className="cnt">
                    <h3>Instant Payouts</h3>
                    <p>Fast &amp; secure withdrawals directly to your wallet.</p>
                  </div>
                  <button>Learn More <i className="fa-solid fa-arrow-right" /></button>
                  <div className="dotted_effect">
                    <img src="images/dotted_vector.svg" />
                  </div>
                </div>
                <div className="instant_vector">
                  <img src="images/payout_vector.svg" alt="Instant Payouts" />
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="whyblock">
                <div className="top_animation">
                  <img src="images/radius_effect.svg" />
                </div>
                <div className="instant_vector">
                  <img src="images/smart_dash_vector.svg" alt="Smart Dashboard" />
                  <div className="dotted_effect_2">
                    <img src="images/dotted_vector.svg" />
                  </div>
                </div>
                <div className="whychoose_cnt">
                  <div className="cnt">
                    <h3>Smart Dashboard</h3>
                    <p>Beginner-friendly, modern, and easy to navigate.</p>
                  </div>
                  <button>Learn More <i className="fa-solid fa-arrow-right" /></button>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="whyblock flex_row">
                <div className="instant_vector">
                  <img src="images/community_vector.svg" alt="Strong Community Support" />
                </div>
                <div className="whychoose_cnt">
                  <div className="cnt">
                    <h3>Strong Community Support</h3>
                    <p>Top leaders available 24/7 to guide you.</p>
                  </div>
                  <button>Learn More <i className="fa-solid fa-arrow-right" /></button>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="whyblock flex_row">
                <div className="instant_vector">
                  <img src="images/security_vector.svg" alt="Advanced Security System" />
                </div>
                <div className="whychoose_cnt">
                  <div className="cnt">
                    <h3>Advanced Security System</h3>
                    <p>Your data &amp; earnings are protected with multi-layer security.</p>
                  </div>
                  <button>Learn More <i className="fa-solid fa-arrow-right" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="how_work">
        <div className="container">
          <div className="dotted_vector">
            <img src="images/work_dotted.svg" />
          </div>
          <div className="row">
            <div className="col-sm-5">
              <div className="work_cnt">
                <div className="work_vector">
                  <img src="images/how_work_hd_vector.svg" />
                </div>
                <h2>How It Works</h2>
                <p>We build readymade websites, mobile applications, and elaborate online business services.</p>
              </div>
            </div>
            <div className="col-sm-7">
              <div className="work_cate_list">
                <ul>
                  <li>
                    <div className="account_icon">
                      <img src="images/user_account.svg" />
                    </div>
                    <h3>Register Your Account</h3>
                    <p>Protocols apart from aengage models, pricing billing</p>
                  </li>
                  <li>
                    <div className="account_icon">
                      <img src="images/join_icon.svg" />
                    </div>
                    <h3>Join the Plan of Your Choice</h3>
                    <p>Protocols apart from aengage models, pricing billing</p>
                  </li>
                  <li>
                    <div className="account_icon">
                      <img src="images/network_icon.svg" />
                    </div>
                    <h3>Refer &amp; Build Your Network</h3>
                    <p>Communication protocols apart from engagement models</p>
                  </li>
                  <li>
                    <div className="account_icon">
                      <img src="images/income_icon.svg" />
                    </div>
                    <h3>Earn Direct + Level Income</h3>
                    <p>Protocols apart from aengage models, pricing billing</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="opportunities_bl">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="opportunities_cnt">
                <h2>Income Opportunities</h2>
                <p>Experience fun with LudoKing — play skill-based games, challenge friends, and earn CVT Rewards!</p>
                <ul>
                  <li><img src="images/opportunities_list_icon.svg" /> Direct Referral Income</li>
                  <li><img src="images/opportunities_list_icon.svg" />Level Income</li>
                  <li><img src="images/opportunities_list_icon.svg" />Team Bonus Rewards</li>
                  <li><img src="images/opportunities_list_icon.svg" />Leadership Bonus</li>
                  <li><img src="images/opportunities_list_icon.svg" />Monthly Achievement Rewards</li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="opportunities_vector">
                <img src="images/opportunities_vector.png" alt="Income Opportunities" />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="packages_section">
        <div className="container">
          <h2>Our Earning Packages</h2>
          <div className="row">
            <div className="col-sm-4">
              <div className="packages_block">
                <div className="star_icon">
                  <img src="images/star_icon.png" />
                </div>
                <div className="top_package_cnt">
                  <div className="top_hd">
                    <div className="star">
                      <img src="images/basic_star.png" />
                    </div>
                    <h3>Basic</h3>
                    <span>Entry Level</span>
                  </div>
                  <div className="price">
                    $50 - $1K
                  </div>
                  <ul>
                    <li><i className="fa-solid fa-check" /> 1% Daily ROI</li>
                    <li><i className="fa-solid fa-check" /> UP to 150% Return</li>
                    <li><i className="fa-solid fa-check" /> No Direct Requirement</li>
                  </ul>
                </div>
                <button className="planbtn">Select Plan</button>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="packages_block silver_block">
                <div className="star_icon">
                  <img src="images/star_icon.png" />
                </div>
                <div className="top_package_cnt">
                  <div className="top_hd">
                    <div className="star">
                      <img src="images/silver_star.png" />
                    </div>
                    <h3>Silver</h3>
                    <span>Popular Choice</span>
                  </div>
                  <div className="price">
                    $200 - $2K
                  </div>
                  <ul>
                    <li><i className="fa-solid fa-check" /> 1% Daily ROI</li>
                    <li><i className="fa-solid fa-check" /> UP to 150% Return</li>
                    <li><i className="fa-solid fa-check" /> No Direct Requirement</li>
                  </ul>
                </div>
                <button className="planbtn">Select Plan</button>
                <div className="star_effect">
                  <img src="images/star_icon2.png" />
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="packages_block platinum_block">
                <div className="top_package_cnt">
                  <div className="top_hd">
                    <div className="star">
                      <img src="images/platinum_star.png" />
                    </div>
                    <h3>Platinum</h3>
                    <span>Professional</span>
                  </div>
                  <div className="price">
                    $2K - $10K
                  </div>
                  <ul>
                    <li><i className="fa-solid fa-check" /> 1% Daily ROI</li>
                    <li><i className="fa-solid fa-check" /> UP to 150% Return</li>
                    <li><i className="fa-solid fa-check" /> No Direct Requirement</li>
                  </ul>
                </div>
                <button className="planbtn">Select Plan</button>
                <div className="star_effect">
                  <img src="images/star_icon.png" />
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="packages_block gold_block">
                <div className="star_icon">
                  <img src="images/star_icon.png" />
                </div>
                <div className="top_package_cnt">
                  <div className="top_hd">
                    <div className="star">
                      <img src="images/gold_star.png" />
                    </div>
                    <h3>Gold</h3>
                    <span>Entry Level</span>
                  </div>
                  <div className="price">
                    $1 - $5K
                  </div>
                  <ul>
                    <li><i className="fa-solid fa-check" /> 1% Daily ROI</li>
                    <li><i className="fa-solid fa-check" /> UP to 150% Return</li>
                    <li><i className="fa-solid fa-check" /> No Direct Requirement</li>
                  </ul>
                </div>
                <button className="planbtn">Select Plan</button>
                <div className="star_effect">
                  <img src="images/star_icon2.png" />
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="packages_block diamond_block">
                <div className="top_package_cnt">
                  <div className="top_hd">
                    <div className="star">
                      <img src="images/diamond_star.png" />
                    </div>
                    <h3>Diamond</h3>
                    <span>Entry Level</span>
                  </div>
                  <div className="price">
                    $4 - $30K
                  </div>
                  <ul>
                    <li><i className="fa-solid fa-check" /> 1% Daily ROI</li>
                    <li><i className="fa-solid fa-check" /> UP to 150% Return</li>
                    <li><i className="fa-solid fa-check" /> No Direct Requirement</li>
                  </ul>
                </div>
                <button className="planbtn">Select Plan</button>
                <div className="star_effect">
                  <img src="images/star_icon.png" />
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="packages_block vip_block">
                <div className="star_icon">
                  <img src="images/star_icon.png" />
                </div>
                <div className="top_package_cnt">
                  <div className="top_hd">
                    <div className="star">
                      <img src="images/vip_star.png" />
                    </div>
                    <h3>VIP</h3>
                    <span>Popular Choice</span>
                  </div>
                  <div className="price">
                    $6K - $50K
                  </div>
                  <ul>
                    <li><i className="fa-solid fa-check" /> 1% Daily ROI</li>
                    <li><i className="fa-solid fa-check" /> UP to 150% Return</li>
                    <li><i className="fa-solid fa-check" /> No Direct Requirement</li>
                  </ul>
                </div>
                <button className="planbtn">Select Plan</button>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="structure_level_s">
        <div className="container">
          <h2>Level Income Structure</h2>
          <p>Our platform offers a powerful Level Income Structure that helps you earn from every member who joins through
            your network.</p>
          <div className="level_list">
            <div className="borderline_effect">
              <img src="images/border_line_vector.svg" />
            </div>
            <ul>
              <li>
                <div className="structure_icon">
                  <img src="images/level_vector.png" />
                </div>
                <div className="cnt_level">
                  <h5><span>Level 1</span> 10%</h5>
                </div>
              </li>
              <li>
                <div className="structure_icon">
                  <img src="images/level_vector2.png" />
                </div>
                <div className="cnt_level">
                  <h5><span>Level 2</span> 5%</h5>
                </div>
              </li>
              <li>
                <div className="structure_icon">
                  <img src="images/level_vector3.png" />
                </div>
                <div className="cnt_level">
                  <h5><span>Level 3</span> 4%</h5>
                </div>
              </li>
              <li>
                <div className="structure_icon">
                  <img src="images/level_vector4.png" />
                </div>
                <div className="cnt_level">
                  <h5><span>Level 4</span> 3%</h5>
                </div>
              </li>
              <li>
                <div className="structure_icon">
                  <img src="images/level_vector5.png" />
                </div>
                <div className="cnt_level">
                  <h5><span>Level 65</span> 1%</h5>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>



      <Faq />


    </>)
}
