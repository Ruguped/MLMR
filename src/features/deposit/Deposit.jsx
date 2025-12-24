import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useUserStore from '../../store/userStore'
import { deposit } from '../../libs/authApi'
import { useToast } from '../../store/toastStore'



export default function Deposit() {

  const toast = useToast();
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    transactionHash: '',
    confirmTransactionHash: '', 
    walletAddress: '',
    proofImage : null,
    network : ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);
    const payload = new FormData();
    payload.append('amount', formData.amount);
    payload.append('transactionHash', formData.transactionHash);
    payload.append('confirmTransactionHash', formData.confirmTransactionHash);
    payload.append('walletAddress', formData.walletAddress);
    payload.append('network', formData.network);
    payload.append('currency', 'USDT');
    payload.append('depositProofImage', formData.proofImage);
    try {
      const res = await deposit(payload);
      if (res?.data?.success) {
        toast.success("Deposit successful");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
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

        {/*============================ deposit block============================== */}
        <div className="deposit_block_das">
          <h2>Deposit</h2>
          <div className="qur_code_inquery">
            <h3>QR Code</h3>

            <form onSubmit={handleSubmit}>
              <div className="qrcode_vector">
                <img src="/images/qrcode_screen.svg" />
              </div>
              <div className="copycode">
                0x35F90CA8594aAFeaaa117f90 <button type="button"><i className="fa-regular fa-clone"></i></button>
              </div>
              <div className="info_input">
                <select onChange={handleChange} name="network" id="">
                  <option value="" disabled>Select Chain</option>
                  <option value="BEP20">BEP20</option>
                  <option value="ERC20">ERC20</option>
                  <option value="TRC20">TRC20</option>
                </select>
              </div>
              <div className="info_input">
                <input type="text" placeholder="Amount" onChange={handleChange} name="amount" value={formData.amount} />
              </div>
              <div className="info_input">
                <input type="text" placeholder="Your Wallet Address" onChange={handleChange} name="walletAddress" value={formData.walletAddress} />
              </div>
              <div className="info_input">
                <input type="password" placeholder="Transaction Hash" onChange={handleChange} name="transactionHash" value={formData.transactionHash} />
              </div>
              <div className="info_input">
                <input type="text" placeholder="Confirm Transaction Hash" onChange={handleChange} name="confirmTransactionHash" value={formData.confirmTransactionHash} />
              </div>
              <div className="info_input">
                <input type="file" placeholder="File upload" onChange={(e) => setFormData({ ...formData, proofImage: e.target.files[0] })} name="proofImage" />
              </div>
              <button className="btn" type="submit" disabled={isSubmitting}>Submit</button>

            </form>

          </div>

        </div>


      </div>
    </>
  )
}