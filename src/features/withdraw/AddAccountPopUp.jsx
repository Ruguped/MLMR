import "./AddAccountPopUp.css";
import { useState } from "react";

export default function AddAccountPopUp({ setShowAddAccountPopUp }) {

  const [formData, setFormData] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
  });
  

  function handleClose() {
    setShowAddAccountPopUp(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {   
      console.log("Form submitted",formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="popup-overlay" onClick={handleClose}>
      
      <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="popup-close-btn" onClick={handleClose}>×</button>
        
        <h2>Add Bank Account</h2>
        
        {/* Form - you'll design this part */}
        <form className="popup-form" onSubmit={handleSubmit}>
          <div className="popup-input-group">
            <label>Bank Name</label>
            <input type="text" placeholder="Enter bank name" name="bankName" value={formData.bankName} onChange={handleChange} />
          </div>
          
          <div className="popup-input-group">
            <label>Account Holder Name</label>
            <input type="text" placeholder="Enter account holder name" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} />
          </div>
          
          <div className="popup-input-group">
            <label>Account Number</label>
            <input type="text" placeholder="Enter account number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
          </div>
          
          <div className="popup-input-group">
            <label>IFSC Code</label>
            <input type="text" placeholder="Enter IFSC code" name="ifscCode" value={formData.ifscCode} onChange={handleChange} />
          </div>
          
          <button type="submit" className="popup-submit-btn">Add Account</button>
        </form>
        
      </div>
      
    </div>
  );
}