import React, { useState, useEffect } from 'react';
import BuyPlans from './buyPlans/BuyPlans';
import MyPlans from './buyPlans/MyPlans';

export default function Plans() {


  const [toggle, setToggle] = useState(0)

               







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
      <h2>
        <button onClick={() => setToggle(0)} style={toggle === 0 ?  {}: {border: "none"}}>Plans</button>
        
        <button onClick={() => setToggle(1)} style={toggle === 1 ? {} : {border: "none"}}>My Plans</button></h2>
      {toggle === 0 ? <BuyPlans /> : <MyPlans />}
    </div>
  </div>
}