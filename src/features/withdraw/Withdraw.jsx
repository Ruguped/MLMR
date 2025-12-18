


export default function Withdraw() {
    return (
        <div className="dashboard_right">

      <div className="top_header_dash">
        <div className="user_profile">
          <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" height="54px" width="54px"
              className="round_img"/></div>
          <div className="user_profile_cnt">
            <h3>pallavsoni64@gmail.com</h3>
            <ul className="user_social">
              <li><a href="#"><img src="/images/user_social.svg" alt="social"/></a></li>
              <li><a href="#"><img src="/images/user_social2.svg" alt="social"/></a></li>
            </ul>
          </div>
        </div>
        <div className="profile_id_s">
          <div className="profile_id">
            <span>UID :</span>16439869<img src="/images/uid_icon.svg" className="m-1" alt="icon"/>
          </div>
          <div className="profile_id">
            <span>Referral ID :</span>GATB253265<img src="/images/uid_icon.svg" className="m-1" alt="icon"/>
          </div>
          <div className="profile_id kycstatus">
            <span>KYC Status</span><a className="text-success" href="#">KYC Verified</a>
          </div>

        </div>
      </div>


      <div className="deposit_block_das withdraw_inquery_s">
        <h2>Withdraw</h2>
        <div className="qur_code_inquery">

          <form>
            <div className="info_input">
              <div className="d-flex">
              <input type="text" placeholder="Amount"/>
              <span>Max</span>
              </div>
            </div>
            <div className="info_input">
              <div className="d-flex">
              <input type="text" placeholder="OTP"/>
              <span>Get OTP</span>
              </div>
            </div>
            <div className="info_input">
              <select>
                <option>online bank transfer</option>
              </select>
            </div>
            <div className="info_input">
              <select>
                <option>Yes Bank (1234560)</option>
              </select>
            </div>

            <div className="bankdel">
              <label className="mb-2">bank details</label>

              <legend>Bank name <span>---------</span></legend>
              <legend>Account Name <span>---------</span></legend>
              <legend>Account Number <span>---------</span></legend>
              <legend>IFSC Code <span>---------</span></legend>
            </div>

            <button className="btn">Submit</button>

          </form>

        </div>

      </div>


    </div>
    )
}