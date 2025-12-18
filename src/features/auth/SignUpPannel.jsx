import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerApi } from "../../libs/authApi.js";
import { useSignUpStore } from '../../store/signUpData.js';


import { useToast } from '../../store/toastStore.js';





// --------- 1. DEFINE SCHEMAS ------------
const passwordRules = z.string().min(6, "Password must be at least 6 characters");
const confirmPasswordRules = z.string();
const usernameRules = z.string().min(3, "Username must be at least 3 characters");
const referralRules = z.string().optional();

const mobileSchema = z.object({
  phone: z.string().length(10, "Mobile number must be exactly 10 digits").regex(/^\d+$/, "Only numbers allowed"),
  username: usernameRules,
  password: passwordRules,
  confirmPassword: confirmPasswordRules,
  referralCode: referralRules
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: usernameRules,
  password: passwordRules,
  confirmPassword: confirmPasswordRules,
  referralCode: referralRules
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export function SignUpPannel() {

  const { setSignUpData } = useSignUpStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const toast = useToast();



  // State object for all 4 fields
  const [passVisibility, setPassVisibility] = useState({
    mobilePass: false,
    mobileConfirm: false,
    emailPass: false,
    emailConfirm: false,
  });

  // Generic toggle function
  const toggleVisibility = (fieldKey) => {
    setPassVisibility((prev) => ({
      ...prev,
      [fieldKey]: !prev[fieldKey],
    }));
  };

  // --- 2. SETUP FORMS ---
  const { register: registerMobile, handleSubmit: handleMobileSubmit, formState: { errors: mobileErrors } } = useForm({
    resolver: zodResolver(mobileSchema),
    mode: "onTouched"
  });
//from = {register,handleSubmit,formState:{errors}}
  const { register: registerEmail, handleSubmit: handleEmailSubmit, formState: { errors: emailErrors } } = useForm({
    resolver: zodResolver(emailSchema),
    mode: "onTouched"
  });

  async function signUp(payload) {
    setFormErrors({});
    setIsSubmitting(true);

    try {
      console.log("Signup payload:", payload);
      const res = await registerApi(payload);
      if (res?.data?.success) {
        toast.success("Account created! Please verify OTP.");
        setSignUpData({
          email: res.data.user.email,
          phone: res.data.user.phone,
          userId: res.data.user.id,
          source: 'signup'
        });
      }
    } catch (error) {
      // Only 400-level business errors reach here (network/500 handled by interceptor)
      const message = error.response?.data?.error || "Something went wrong.";
      toast.error(message);

    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="tab-pane fade" id="signup">
      <ul className="nav emailtabs sub-tabs mb-3" id="loginMethodTabs_2" role="tablist">
        <li className="nav-item"><button className="nav-link active" data-bs-toggle="tab" data-bs-target="#mobile-login_2">Mobile</button></li>
        <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#email-login_2">Email</button></li>
      </ul>

      <div className="tab-content">

        {/* --- MOBILE FORM --- */}
        <div className="tab-pane fade show active" id="mobile-login_2">
          <form onSubmit={handleMobileSubmit(signUp)}>

            <div className="form_input">
              <input {...registerMobile("phone")} type="text" className={`form-control mb-3 ${mobileErrors.phone ? "is-invalid" : ""}`} placeholder="Enter Mobile Number" />
              {mobileErrors.phone && <span className="text-danger small">{mobileErrors.phone.message}</span>}
            </div>

            <div className="form_input">
              <input {...registerMobile("username")} type="text" className="form-control mb-3" placeholder="Choose a username" />
              {mobileErrors.username && <span className="text-danger small">{mobileErrors.username.message}</span>}
            </div>

            {/* Mobile Password */}
            <div className="form_input">
              <input
                {...registerMobile("password")}
                type={passVisibility.mobilePass ? "text" : "password"}
                className="form-control mb-2"
                placeholder="Enter Password"
              />
              <div
                className="hide_vector"
                onClick={() => toggleVisibility('mobilePass')}
                style={{ cursor: 'pointer' }}
              >
                {/* LOGIC: If True (Visible) -> Show vector, Else -> Hide vector */}
                <img
                  src={passVisibility.mobilePass ? "images/show_vector.svg" : "images/hide_vector.svg"}
                  alt="toggle password visibility"
                />
              </div>
              {mobileErrors.password && <span className="text-danger small">{mobileErrors.password.message}</span>}
            </div>

            {/* Mobile Confirm Password */}
            <div className="form_input">
              <input
                {...registerMobile("confirmPassword")}
                type={passVisibility.mobileConfirm ? "text" : "password"}
                className="form-control mb-2"
                placeholder="Confirm Password"
              />
              <div
                className="hide_vector"
                onClick={() => toggleVisibility('mobileConfirm')}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={passVisibility.mobileConfirm ? "images/show_vector.svg" : "images/hide_vector.svg"}
                  alt="toggle password visibility"
                />
              </div>
              {mobileErrors.confirmPassword && <span className="text-danger small">{mobileErrors.confirmPassword.message}</span>}
            </div>

            <div className="form_input">
              <input {...registerMobile("referralCode")} type="text" className="form-control mb-2" placeholder="Enter Referral Code" />
            </div>

            <button type="submit" className="btn btn-login w-100" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing up...
                </>
              ) : 'Sign Up'}
            </button>
          </form>
        </div>


        {/* --- EMAIL FORM --- */}
        <div className="tab-pane fade" id="email-login_2">
          <form onSubmit={handleEmailSubmit(signUp)}>

            <div className="form_input">
              <input {...registerEmail("email")} type="email" className={`form-control mb-3 ${emailErrors.email ? "is-invalid" : ""}`} placeholder="Enter Email" />
              {emailErrors.email && <span className="text-danger small">{emailErrors.email.message}</span>}
            </div>

            <div className="form_input">
              <input {...registerEmail("username")} type="text" className="form-control mb-3" placeholder="Choose a username" />
              {emailErrors.username && <span className="text-danger small">{emailErrors.username.message}</span>}
            </div>

            {/* Email Password */}
            <div className="form_input">
              <input
                {...registerEmail("password")}
                type={passVisibility.emailPass ? "text" : "password"}
                className="form-control mb-2"
                placeholder="Enter Password"
              />
              <div
                className="hide_vector"
                onClick={() => toggleVisibility('emailPass')}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={passVisibility.emailPass ? "images/show_vector.svg" : "images/hide_vector.svg"}
                  alt="toggle password visibility"
                />
              </div>
              {emailErrors.password && <span className="text-danger small">{emailErrors.password.message}</span>}
            </div>

            {/* Email Confirm Password */}
            <div className="form_input">
              <input
                {...registerEmail("confirmPassword")}
                type={passVisibility.emailConfirm ? "text" : "password"}
                className="form-control mb-2"
                placeholder="Confirm Password"
              />
              <div
                className="hide_vector"
                onClick={() => toggleVisibility('emailConfirm')}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={passVisibility.emailConfirm ? "images/show_vector.svg" : "images/hide_vector.svg"}
                  alt="toggle password visibility"
                />
              </div>
              {emailErrors.confirmPassword && <span className="text-danger small">{emailErrors.confirmPassword.message}</span>}
            </div>

            <div className="form_input">
              <input {...registerEmail("referralCode")} type="text" className="form-control mb-2" placeholder="Enter Referral Code" />
            </div>

            <button type="submit" className="btn btn-login w-100" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing up...
                </>
              ) : 'Sign Up'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}