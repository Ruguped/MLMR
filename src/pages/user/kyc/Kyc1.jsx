import { useState, useMemo } from 'react';
import { submitKyc } from '../../../libs/authApi';
import { useToast } from '../../../store/toastStore';

export default function Kyc() {
  const toast = useToast();

  // ==================== STATE ====================
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1 - PAN
    panNumber: '',
    confirmPanNumber: '',
    panCardImage: null,

    // Step 2 - Aadhar
    aadharNumber: '',
    confirmAadharNumber: '',
    aadharFrontImage: null,
    aadharBackImage: null,
  });

  // Store preview URLs to avoid memory leaks from repeated createObjectURL calls
  const [previewUrls, setPreviewUrls] = useState({
    panCardImage: null,
    aadharFrontImage: null,
    aadharBackImage: null,
  });

  // ==================== HELPERS ====================
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field, e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke old URL to prevent memory leak
      if (previewUrls[field]) {
        URL.revokeObjectURL(previewUrls[field]);
      }
      // Create new preview URL
      const newUrl = URL.createObjectURL(file);
      setPreviewUrls(prev => ({ ...prev, [field]: newUrl }));
      updateField(field, file);
    }
  };

  // ==================== VALIDATION ====================
  const validateStep1 = () => {
    if (!formData.panNumber.trim()) {
      toast.error('Please enter PAN number');
      return false;
    }
    if (formData.panNumber !== formData.confirmPanNumber) {
      toast.error('PAN numbers do not match');
      return false;
    }
    if (!formData.panCardImage) {
      toast.error('Please upload PAN card image');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.aadharNumber.trim()) {
      toast.error('Please enter Aadhar number');
      return false;
    }
    if (formData.aadharNumber !== formData.confirmAadharNumber) {
      toast.error('Aadhar numbers do not match');
      return false;
    }
    if (!formData.aadharFrontImage) {
      toast.error('Please upload Aadhar front image');
      return false;
    }
    if (!formData.aadharBackImage) {
      toast.error('Please upload Aadhar back image');
      return false;
    }
    return true;
  };

  // ==================== NAVIGATION ====================
  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // ==================== SUBMIT ====================
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('panNumber', formData.panNumber);
      payload.append('aadharNumber', formData.aadharNumber);
      payload.append('panCardImage', formData.panCardImage);
      payload.append('aadharFrontImage', formData.aadharFrontImage);
      payload.append('aadharBackImage', formData.aadharBackImage);

      const res = await submitKyc(payload);

      if (res.data?.success) {
        toast.success('KYC submitted successfully!');
        // TODO: Navigate or update user status
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'KYC submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==================== RENDER ====================
  return (
    <div className="dashboard_right">
      <div className="kyc_verification_s">
        <h1>KYC Verification</h1>
        <p>Complete your KYC in just 3 steps</p>

        {/* Step Progress Indicator */}
        <div className="step_form_fill_top">
          <ul className="step_list">
            <li className={currentStep >= 1 ? 'active' : ''}>step 1 <span /></li>
            <li className={currentStep >= 2 ? 'active' : ''}>step 2 <span /></li>
            <li className={currentStep >= 3 ? 'active' : ''}>step 3 <span /></li>
          </ul>
        </div>

        <div className="kyc_form">

          {/* ==================== STEP 1: PAN CARD ==================== */}
          {currentStep === 1 && (
            <>
              <div className="top_form_h">
                <h6>Pan Card</h6>
                <p>Trade requires a valid government issued ID</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form_box">
                      <label>PAN Card Number</label>
                      <input
                        type="text"
                        value={formData.panNumber}
                        onChange={(e) => updateField('panNumber', e.target.value.toUpperCase())}
                        placeholder="ABCDE1234F"
                        maxLength={10}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form_box">
                      <label>Confirm PAN Card Number</label>
                      <input
                        type="text"
                        value={formData.confirmPanNumber}
                        onChange={(e) => updateField('confirmPanNumber', e.target.value.toUpperCase())}
                        placeholder="ABCDE1234F"
                        maxLength={10}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form_box">
                      <label>PAN Card Image</label>
                      <div className="file-upload-container">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange('panCardImage', e)}
                        />
                        <div className="file-upload-label">
                          {formData.panCardImage ? (
                            <strong>✅ {formData.panCardImage.name}</strong>
                          ) : (
                            <>
                              <i className="fas fa-upload" />
                              <strong>Choose A File</strong>
                              <small>Drag Or Choose Your File To Upload</small>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <button type="submit" className="btn">Continue to the next step</button>
                  </div>
                </div>
              </form>
            </>
          )}

          {/* ==================== STEP 2: AADHAR CARD ==================== */}
          {currentStep === 2 && (
            <>
              <div className="top_form_h">
                <h6>Aadhar Card</h6>
                <p>Trade requires a valid government issued ID</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form_box">
                      <label>Aadhar Card Number</label>
                      <input
                        type="text"
                        value={formData.aadharNumber}
                        onChange={(e) => updateField('aadharNumber', e.target.value.replace(/\D/g, ''))}
                        placeholder="1234 5678 9012"
                        maxLength={12}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form_box">
                      <label>Confirm Aadhar Card Number</label>
                      <input
                        type="text"
                        value={formData.confirmAadharNumber}
                        onChange={(e) => updateField('confirmAadharNumber', e.target.value.replace(/\D/g, ''))}
                        placeholder="1234 5678 9012"
                        maxLength={12}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form_box">
                      <label>Front Image</label>
                      <div className="file-upload-container">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange('aadharFrontImage', e)}
                        />
                        <div className="file-upload-label">
                          {formData.aadharFrontImage ? (
                            <strong>✅ {formData.aadharFrontImage.name}</strong>
                          ) : (
                            <>
                              <i className="fas fa-upload" />
                              <strong>Choose A File</strong>
                              <small>Drag Or Choose Your File To Upload</small>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form_box">
                      <label>Back Image</label>
                      <div className="file-upload-container">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange('aadharBackImage', e)}
                        />
                        <div className="file-upload-label">
                          {formData.aadharBackImage ? (
                            <strong>✅ {formData.aadharBackImage.name}</strong>
                          ) : (
                            <>
                              <i className="fas fa-upload" />
                              <strong>Choose A File</strong>
                              <small>Drag Or Choose Your File To Upload</small>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <button type="button" className="btn btn-secondary me-2" onClick={prevStep}>Back</button>
                    <button type="submit" className="btn">Continue to the next step</button>
                  </div>
                </div>
              </form>
            </>
          )}

          {/* ==================== STEP 3: PREVIEW & SUBMIT ==================== */}
          {currentStep === 3 && (
            <>
              <div className="top_form_h">
                <h6>Review Your Documents</h6>
                <p>Please verify all uploaded images before submitting</p>
              </div>
              <div className="row">
                {/* PAN Card Preview */}
                <div className="col-sm-6 col-md-3 mb-3">
                  <div className="preview_card">
                    <label>PAN Card</label>
                    {previewUrls.panCardImage && (
                      <img
                        src={previewUrls.panCardImage}
                        alt="PAN Card"
                        className="img-fluid preview_image"
                      />
                    )}
                    <small>{formData.panNumber}</small>
                  </div>
                </div>

                {/* Aadhar Front Preview */}
                <div className="col-sm-6 col-md-3 mb-3">
                  <div className="preview_card">
                    <label>Aadhar Front</label>
                    {previewUrls.aadharFrontImage && (
                      <img
                        src={previewUrls.aadharFrontImage}
                        alt="Aadhar Front"
                        className="img-fluid preview_image"
                      />
                    )}
                  </div>
                </div>

                {/* Aadhar Back Preview */}
                <div className="col-sm-6 col-md-3 mb-3">
                  <div className="preview_card">
                    <label>Aadhar Back</label>
                    {previewUrls.aadharBackImage && (
                      <img
                        src={previewUrls.aadharBackImage}
                        alt="Aadhar Back"
                        className="img-fluid preview_image"
                      />
                    )}
                    <small>{formData.aadharNumber}</small>
                  </div>
                </div>

                <div className="col-sm-12 mt-3">
                  <button type="button" className="btn btn-secondary me-2" onClick={prevStep}>Back</button>
                  <button
                    type="button"
                    className="btn"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : 'Complete KYC'}
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}