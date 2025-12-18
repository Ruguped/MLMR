import { useToast } from '../../../../store/toastStore'

export default function StepPanCard({ formData, updateField, setCurrentStep }) {

  const toast = useToast();

  function handleSubmit(e) {
    e.preventDefault();

    // Validation checks
    if (!formData.panNumber) {
      toast.error('Please enter PAN number');
      return;
    }
    if (!formData.confirmPanNumber) {
      toast.error('Please confirm PAN number');
      return;
    }
    if (formData.panNumber !== formData.confirmPanNumber) {
      toast.error('PAN numbers do not match');
      return;
    }
    if (!formData.panCardImage) {
      toast.error('Please upload PAN card image');
      return;
    }

    // All good! Go to next step
    setCurrentStep(2);
  }

  return <div className="dashboard_right">
    <div className="kyc_verification_s">
      <h1>KYC Verification</h1>
      <p>Complete your KYC in just 3 steps</p>
      <div className="step_form_fill_top">
        <ul className="step_list">
          <li className="active">step 1 <span /></li>
          <li>step 2 <span /></li>
          <li>step 3 <span /></li>
        </ul>
      </div>
      <div className="kyc_form">
        <div className="top_form_h">
          <h6>Pan Card</h6>
          <p>Trade requires a valid government issued ID</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <div className="form_box">
                <label>PAN Card Number</label>
                <input
                  type="text"
                  placeholder="Enter PAN number"
                  value={formData.panNumber}
                  onChange={(e) => updateField('panNumber', e.target.value)}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form_box">
                <label>Confirm PAN Card number</label>
                <input
                  type="text"
                  placeholder="Confirm PAN number"
                  value={formData.confirmPanNumber}
                  onChange={(e) => updateField('confirmPanNumber', e.target.value)}
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form_box">
                <label>Picture Upload</label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id="file-input"
                    name="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        updateField('panCardImage', e.target.files[0]);
                      }
                    }}
                  />
                  {formData.panCardImage ? (
                    <div className="file-upload-label">
                      <img
                        src={URL.createObjectURL(formData.panCardImage)}
                        alt="PAN Preview"
                        style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }}
                      />
                      <small>{formData.panCardImage.name}</small>
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