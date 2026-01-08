import SideProfile from "../../../components/layout/SideProfile"

export default function Security() {
 return <div className="dashboard_right">
  <SideProfile />
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