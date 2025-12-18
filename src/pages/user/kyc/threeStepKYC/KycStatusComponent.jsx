import React, { useState } from "react";

export default function KycStatusComponent({kycStatus}) {

    const statusColor = kycStatus === 'pending' ? '#007bff' : kycStatus === 'verified' ? '#28a745' : '#dc3545';


    const icon = kycStatus === 'pending' ? 'fa-solid fa-circle' : kycStatus === 'verified' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-xmark';

    return (
        <>
        <div className="dashboard_right">
      <div className="kyc_verification_s">
        <h1>KYC Verification</h1>   

      <div className="kyc_updated_f">
        <ul>
           <li>Documents (PAN & Aadhar card) <button className="btn" style={{ backgroundColor: statusColor, color: 'white' }} ><i className={icon}></i> {kycStatus.toUpperCase()}</button></li> 
           <li>Picture <button className="btn" style={{ backgroundColor: statusColor, color: 'white' }}><i className={icon}></i> {kycStatus.toUpperCase()}</button></li> 
        </ul>
      </div>  

    
      </div>
    </div>
        </>
    );
}
