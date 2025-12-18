import "./AddAccountPopUp.css";

export default function AddAccountPopUp({ setShowAddAccountPopUp }) {
  
  function handleClose() {
    setShowAddAccountPopUp(false);
  }

  return (
    <div className="popup-overlay" onClick={handleClose}>
      
      <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="popup-close-btn" onClick={handleClose}>×</button>
        
        <h2>Add Bank Account</h2>
        
        {/* Form - you'll design this part */}
        <form className="popup-form">
          <div className="popup-input-group">
            <label>Bank Name</label>
            <input type="text" placeholder="Enter bank name" />
          </div>
          
          <div className="popup-input-group">
            <label>Account Holder Name</label>
            <input type="text" placeholder="Enter account holder name" />
          </div>
          
          <div className="popup-input-group">
            <label>Account Number</label>
            <input type="text" placeholder="Enter account number" />
          </div>
          
          <div className="popup-input-group">
            <label>IFSC Code</label>
            <input type="text" placeholder="Enter IFSC code" />
          </div>
          
          <button type="submit" className="popup-submit-btn">Add Account</button>
        </form>
        
      </div>
      
    </div>
  );
}