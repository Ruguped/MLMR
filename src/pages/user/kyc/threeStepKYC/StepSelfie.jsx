import { useToast } from '../../../../store/toastStore'
import { useState } from 'react'
import { submitKyc } from '../../../../libs/authApi'
import useUserStore from '../../../../store/userStore';

export default function StepSelfie({ formData, updateField, setCurrentStep }) {

  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {refreshUser} = useUserStore();

  async function handleSubmit(e) {
    e.preventDefault();

    // Validation check
    if (!formData.selfieImage) {
      toast.error('Please upload your selfie image');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const payload = new FormData();
      payload.append('panNumber', formData.panNumber);
      payload.append('aadhaarNumber', formData.aadhaarNumber);
      payload.append('panCardImage', formData.panCardImage);
      payload.append('aadharFrontImage', formData.aadharFrontImage);
      payload.append('aadharBackImage', formData.aadharBackImage);
      payload.append('selfieImage', formData.selfieImage);

      const res = await submitKyc(payload);

      if (res.data.success) {
        toast.success('KYC submitted successfully!');
        await refreshUser();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'KYC submission failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  return <div className="dashboard_right">
    <div className="kyc_verification_s">
      <h1>KYC Verification</h1>
      <p>Complete your KYC in just 3 steps</p>
      <div className="step_form_fill_top">
        <ul className="step_list">
          <li className="active">step 1 <span /></li>
          <li className="active">step 2 <span /></li>
          <li className="active">step 3 <span /></li>
        </ul>
      </div>
      <div className="kyc_form">
        <div className="top_form_h">
          <h6>Upload Your Selfie</h6>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-12">
              <div className="form_box">
                <label>Selfie Upload</label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id="file-input"
                    name="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        updateField('selfieImage', e.target.files[0]);
                      }
                    }}
                  />
                  {formData.selfieImage ? (
                    <div className="file-upload-label">
                      <img
                        src={URL.createObjectURL(formData.selfieImage)}
                        alt="Selfie Preview"
                        style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }}
                      />
                      <small>{formData.selfieImage.name}</small>
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
              <button
                type="submit"
                className="btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Complete'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
}