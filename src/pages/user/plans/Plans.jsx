import React, { useState, useEffect } from 'react';

export default function Plans() {
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

  <div className="plan_section">
    <h2>Plans</h2>
    <div className="row">

      <div className="col-sm-4">
        <div className="packages_block">
          <div className="star_icon">
            <img src="/images/star_icon.png" />
          </div>
          <div className="top_package_cnt">
            <div className="top_hd">
              <div className="star">
                <img src="/images/basic_star2.png" />
              </div>
              <h3>Basic</h3>
              <span>Entry Level</span>
            </div>
            <div className="price">$50 - $1K</div>
            <ul>
              <li>1% Daily ROI</li>
              <li>UP to 150% Return</li>
              <li>No Direct Requirement</li>
            </ul>
          </div>
          <button className="planbtn">Select Plan</button>
        </div>
      </div>

      <div className="col-sm-4">
        <div className="packages_block silver_block">
          <div className="star_icon">
            <img src="/images/star_icon.png" />
          </div>
          <div className="top_package_cnt">
            <div className="top_hd">
              <div className="star">
                <img src="/images/silver_star2.png" />
              </div>
              <h3>Silver</h3>
              <span>Popular Choice</span>
            </div>
            <div className="price">$200 - $2K</div>
            <ul>
              <li>1% Daily ROI</li>
              <li>UP to 150% Return</li>
              <li>No Direct Requirement</li>
            </ul>
          </div>
          <button className="planbtn">Select Plan</button>
          <div className="star_effect">
            <img src="/images/star_icon2.png" />
          </div>
        </div>
      </div>

      <div className="col-sm-4">
        <div className="packages_block platinum_block">
          <div className="top_package_cnt">
            <div className="top_hd">
              <div className="star">
                <img src="/images/platinum_star2.png" />
              </div>
              <h3>Platinum</h3>
              <span>Professional</span>
            </div>
            <div className="price">$2K - $10K</div>
            <ul>
              <li>1% Daily ROI</li>
              <li>UP to 150% Return</li>
              <li>No Direct Requirement</li>
            </ul>
          </div>
          <button className="planbtn">Select Plan</button>
          <div className="star_effect">
            <img src="/images/star_icon.png" />
          </div>
        </div>
      </div>

      <div className="col-sm-4">
        <div className="packages_block gold_block">
          <div className="star_icon">
            <img src="/images/star_icon.png" />
          </div>
          <div className="top_package_cnt">
            <div className="top_hd">
              <div className="star">
                <img src="/images/gold_star2.png" />
              </div>
              <h3>Gold</h3>
              <span>Entry Level</span>
            </div>
            <div className="price">$1 - $5K</div>
            <ul>
              <li>1% Daily ROI</li>
              <li>UP to 150% Return</li>
              <li>No Direct Requirement</li>
            </ul>
          </div>
          <button className="planbtn">Select Plan</button>
          <div className="star_effect">
            <img src="/images/star_icon2.png" />
          </div>
        </div>
      </div>

      <div className="col-sm-4">
        <div className="packages_block diamond_block">
          <div className="top_package_cnt">
            <div className="top_hd">
              <div className="star">
                <img src="/images/diamond_star2.png" />
              </div>
              <h3>Diamond</h3>
              <span>Entry Level</span>
            </div>
            <div className="price">$4 - $30K</div>
            <ul>
              <li>1% Daily ROI</li>
              <li>UP to 150% Return</li>
              <li>No Direct Requirement</li>
            </ul>
          </div>
          <button className="planbtn">Select Plan</button>
          <div className="star_effect">
            <img src="/images/star_icon.png" />
          </div>
        </div>
      </div>

      <div className="col-sm-4">
        <div className="packages_block vip_block">
          <div className="star_icon">
            <img src="/images/star_icon.png" />
          </div>
          <div className="top_package_cnt">
            <div className="top_hd">
              <div className="star">
                <img src="/images/vip_star2.png" />
              </div>
              <h3>VIP</h3>
              <span>Popular Choice</span>
            </div>
            <div className="price">$6K - $50K</div>
            <ul>
              <li>1% Daily ROI</li>
              <li>UP to 150% Return</li>
              <li>No Direct Requirement</li>
            </ul>
          </div>
          <button className="planbtn">Select Plan</button>
        </div>
      </div>

    </div>
  </div>
</div>
}
