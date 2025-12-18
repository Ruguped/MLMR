import StepPanCard from "./threeStepKYC/StepPanCard";
import StepAadhar from "./threeStepKYC/StepAadhar";
import StepSelfie from "./threeStepKYC/StepSelfie"; 
import { useState } from "react";
import  useUserStore  from "../../../store/userStore";
import KycStatusComponent from "./threeStepKYC/KycStatusComponent";
export default function Kyc() {

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
  // Step 1 - PAN
  panNumber: '',
  confirmPanNumber: '',
  panCardImage: null,
  
  // Step 2 - Aadhar
  aadhaarNumber: '',
  confirmAadhaarNumber: '',
  aadharFrontImage: null,
  aadharBackImage: null,

  //Sefli image -lololo
  selfieImage: null,
  
});

const { user } = useUserStore();
const { kycStatus,kycRejectionReason,kycSubmittedAt } = user;
//this just for submission state enum: ['not_submitted', //'pending', 'verified', 'rejected'],
//default: 'not_submitted'

function updateField(name, value) {
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
}



    return (
        <>
      
            {kycStatus === 'not_submitted' ? (
                <>
                    {currentStep === 1 && <StepPanCard updateField={updateField} formData={formData} setCurrentStep={setCurrentStep}/>}
                    {currentStep === 2 && <StepAadhar updateField={updateField} formData={formData} setCurrentStep={setCurrentStep}/>}
                    {currentStep === 3 && <StepSelfie updateField={updateField} formData={formData} setCurrentStep={setCurrentStep}/>}
                </>
            ) : (
                <KycStatusComponent kycStatus={kycStatus}/>
            )}
   
            
        </>
    );
}
