import { useToast } from '../../../../store/toastStore'

export default function StepAadhar({ formData, updateField, setCurrentStep }) {

  const toast = useToast();

  function handleSubmit(e) {
    e.preventDefault();

    // Validation checks
    if (!formData.aadhaarNumber) {
      toast.error('Please enter Aadhar number');
      return;
    }
    if (!formData.confirmAadhaarNumber) {
      toast.error('Please confirm Aadhar number');
      return;
    }
    if (formData.aadhaarNumber !== formData.confirmAadhaarNumber) {
      toast.error('Aadhar numbers do not match');
      return;
    }
    if (!formData.aadharFrontImage) {
      toast.error('Please upload Aadhar front image');
      return;
    }
    if (!formData.aadharBackImage) {
      toast.error('Please upload Aadhar back image');
      return;
    }

    // All good! Go to next step
    setCurrentStep(3);
  }

  return <div className="dashboard_right">
    <div className="kyc_verification_s">
      <h1>KYC Verification</h1>
      <p>Complete your KYC in just 3 steps</p>
      <div className="step_form_fill_top">
        <ul className="step_list">
          <li className="active">step 1 <span /></li>
          <li className="active">step 2 <span /></li>
          <li>step 3 <span /></li>
        </ul>
      </div>
      <div className="kyc_form">
        <div className="top_form_h">
          <h6>Aadhar Card</h6>
          <p>Trade requires a valid government issued ID</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <div className="form_box">
                <label>Aadhar Card Number</label>
                <input
                  type="text"
                  placeholder="Enter Aadhar number"
                  value={formData.aadhaarNumber}
                  onChange={(e) => updateField('aadhaarNumber', e.target.value)}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form_box">
                <label>Confirm Aadhar Card Number</label>
                <input
                  type="text"
                  placeholder="Confirm Aadhar number"
                  value={formData.confirmAadhaarNumber}
                  onChange={(e) => updateField('confirmAadhaarNumber', e.target.value)}
                />
              </div>
            </div>

            {/* Front Image Upload */}
            <div className="col-sm-6">
              <div className="form_box">
                <label>Front Image</label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id="file-input"
                    name="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        updateField('aadharFrontImage', e.target.files[0]);
                      }
                    }}
                  />
                  {formData.aadharFrontImage ? (
                    <div className="file-upload-label">
                      <img
                        src={URL.createObjectURL(formData.aadharFrontImage)}
                        alt="Aadhar Front Preview"
                        style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }}
                      />
                      <small>{formData.aadharFrontImage.name}</small>
                    </div>
                  ) : (
                    <div className="file-upload-label">
                      {/* <i className="fas fa-upload"></i> */}
                      <strong>Choose A File</strong>
                      <small>Drag Or Choose Your File To Upload</small>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Back Image Upload */}
            <div className="col-sm-6">
              <div className="form_box">
                <label>Back Image</label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id="file-input"
                    name="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        updateField('aadharBackImage', e.target.files[0]);
                      }
                    }}
                  />
                  {formData.aadharBackImage ? (
                    <div className="file-upload-label">
                      <img
                        src={URL.createObjectURL(formData.aadharBackImage)}
                        alt="Aadhar Back Preview"
                        style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }}
                      />
                      <small>{formData.aadharBackImage.name}</small>
                    </div>
                  ) : (
                    <div className="file-upload-label">
                      {/* <i className="fas fa-upload"></i> */}
                      <strong>Choose A File</strong>
                      <small>Drag Or Choose Your File To Upload</small>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-sm-12">
              <button type="submit" className="btn">Continue to the next step</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
}