import React from 'react'
import useUserStore from '../../store/userStore'
import { useToastStore } from '../../store/toastStore';
import { Link } from 'react-router-dom';


export default function SideProfile() {
  const { user } = useUserStore();
  const { _id, username, referralCode, kycStatus } = user;
  const { success } = useToastStore();

  const kycTextStyle = {
    color: kycStatus === 'not_submitted' ? 'blue' : kycStatus === 'verified' ? 'green' : kycStatus === 'rejected' ? 'red' : 'blue'
  }
  return (
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
          <div>{_id}<img onClick={() => {
            navigator.clipboard.writeText(_id);
            success('Copied to Clipboard')
          }} src="/images/uid_icon.svg" className="m-1" alt="icon" /></div>
        </div>
        <div className="profile_id">
          <span>Referral ID :</span>
          <div>{referralCode}<img onClick={() => {
            navigator.clipboard.writeText(referralCode);
            success('Copied to Clipboard')
          }} src="/images/uid_icon.svg" className="m-1" alt="icon" /></div> 
        </div>
        <div className="profile_id kycstatus">
          <span>KYC Status</span><Link to='/user/kyc' className="text-success" style={{color: {kycTextStyle}}} >{kycStatus.toUpperCase()}</Link>
        </div>
      </div>
    </div>)
}