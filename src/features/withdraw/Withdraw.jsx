import React, { useState, useEffect } from "react";
import { withdrawOtp } from "../../libs/authApi.js";
import { useToast } from "../../store/toastStore.js";
import AddAccountPopUp from "./AddAccountPopUp";
import useUserStore from "../../store/userStore.js";


export default function Withdraw() {
  const toast = useToast();
  const [showAddAccountPopUp, setShowAddAccountPopUp] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState(null);

  const [resendCountdown, setResendCountdown] = useState(0);



  const [formData, setFormData] = useState({
  amount: "",
  otp: "",
  method: "online bank transfer"  //abhi toh default hai
});

  




  //=====countdown timer for otp resend=====//
  useEffect(() => {
    if (resendCountdown <= 0) return;

    const timer = setTimeout(() => {
      setResendCountdown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCountdown]);


  async function handleSendOtp() {
    //simple gurad laga dia
    if (resendCountdown > 0) return;
    try {

      setResendCountdown(60);

      toast.success("OTP sent successfully!");
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error("Error sending OTP");
    }
  }


  // const {user} = useUserStore();
  //const {withdrwalAccounts} = user
 //async function handleSubmit(e){
// e.preventDefault();
// if (!formData.amount || !formData.otp || !selectedAccount) {
 // toast.error("Please fill all fields");
 // return;
// }  const payload = {
//    ...formData,
//   ...selectedAccount}
//phir api ka logic try catch then toast success or error
//
// }


  return (
    <div className="dashboard_right">

      <div className="top_header_dash">
        <div className="user_profile">
          <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" height="54px" width="54px"
            className="round_img" /></div>
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

      {/*===============================WithdrawBlock==============================*/}


      {showAddAccountPopUp && <AddAccountPopUp setShowAddAccountPopUp={setShowAddAccountPopUp} />}
      <div className="deposit_block_das withdraw_inquery_s">
        <h2>Withdraw</h2>
        <div className="qur_code_inquery">

          <form onSubmit={handleSubmit}>
            <div className="info_input">
              <div className="d-flex">
                <input name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" />
                <span>Max</span>
              </div>
            </div>
            <div className="info_input">
              <div className="d-flex">
                <input name="otp" value={formData.otp} onChange={handleChange} placeholder="OTP" />
                <span onClick={handleSendOtp} style={{ cursor: resendCountdown > 0 ? 'not-allowed' : 'pointer' }}>{`${resendCountdown > 0 ? `(${resendCountdown}s)` : 'Get OTP'}`}</span>
              </div>
            </div>
            <div className="info_input">
              <select>
                <option>online bank transfer</option>
              </select>
            </div>
            <div className="info_input">
              {/*Simple logic yaha to change selectedaccount okay*/}
              <select value={selectedAccount?.accountNumber || ""}
                onChange={(e) => {
                  const account = withdrawalAccounts.find(acc => acc.accountNumber === e.target.value);
                  setSelectedAccount(account || null);
                }}>
                <option value="" disabled>Select a bank account</option>
                {/*withdrawalAccounts.map((account, index) => (
                    <option key={index} value={account.accountNumber}>
                      {account.bankName} ({account.accountNumber})
                    </option>
                  ))*/}
              </select>
              <span onClick={() => setShowAddAccountPopUp(prev => !prev)}>+ Add New Account</span>
            </div>

            <div className="bankdel">
              <label className="mb-2">bank details</label>

              <legend>Bank name <span>{selectedAccount?.bankName || "---------"}</span></legend>
              <legend>Account Name <span>{selectedAccount?.accountHolderName || "---------"}</span></legend>
              <legend>Account Number <span>{selectedAccount?.accountNumber || "---------"}</span></legend>
              <legend>IFSC Code <span>{selectedAccount?.ifscCode || "---------"}</span></legend>
            </div>

            <button className="btn">Submit</button>

          </form>

        </div>

      </div>


    </div>
  )
}