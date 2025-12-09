import { LoginPanel } from '../features/auth/LoginPanel';
import { SignUpPannel } from '../features/auth/SignUpPannel';
import { OtpPanel } from '../features/auth/OtpPanel';
import React from "react";
import { useSignUpStore } from '../store/signUpData.js';

export function LoginSignUpPanel() {
  const { signUpData, setSignUpData } = useSignUpStore();

  return (
    <div className="modal fade loginlightbox" id="loginModal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="row g-0">
            {/* Left Section */}
            <div className="col-md-6 text-center">
              <div className="login_vector">
                <img src="images/forex_login_vector.png" alt="Login" />
              </div>
            </div>

            {/* Right Section */}
            <div className="col-md-6 border_lft">
              <div className="login_right">
                <div className="d-flex justify-content-center pt-4">
                  <ul className="nav nav-pills nav-login-tabs" id="loginSignupTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="login-tab" data-bs-toggle="pill" data-bs-target="#login" type="button">Login</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="signup-tab" data-bs-toggle="pill" data-bs-target="#signup" type="button">Sign Up</button>
                    </li>
                  </ul>
                  <button type="button" className="btn-close" data-bs-dismiss="modal"
                    onClick={() => setSignUpData(null)}
                    aria-label="Close" />
                </div>

                <div className="methods_h">
                  <h5>SHOW ALL METHODS</h5>
                </div>

                <div className="email_mobile_form">
                  <div className="tab-content" id="loginSignupTabsContent">

                    {/* ================= LOGIN TAB ================= */}
                    {(signUpData?.source === 'login') ?
                      <OtpPanel panelId={signUpData.source} /> :
                      <LoginPanel />}

                    {/* ================= SIGNUP TAB ================= */}
                    {(signUpData?.source === 'signup') ?
                      <OtpPanel panelId={signUpData.source} /> :
                      <SignUpPannel />}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}