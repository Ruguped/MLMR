export default function Security() {
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
  <div className="profile_form security_form">
    <h2>Security</h2>
    <form>
      <div className="col-input_bl">
        <div className="control_input">
          <lable>Current Password</lable>
          <div className="input_filed">
            <input type="password" placeholder />
            <div className="view_icon">
              <img src="/images/view_icon.svg" alt="view" />
            </div>
          </div>
        </div>
        <div className="control_input">
          <lable>New Password</lable>
          <div className="input_filed">
            <input type="password" placeholder />
            <div className="view_icon">
              <img src="/images/view_icon.svg" alt="view" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-input_bl">
        <div className="control_input">
          <lable>Confirm Password</lable>
          <input type="password" placeholder />
        </div>
      </div>
      <div className="control_input">
        <input className="btn" type="button" defaultValue="Submit" />
      </div>
    </form>
  </div>
</div>

}