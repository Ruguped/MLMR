import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import useAuthStore from '../../store/authStore.js';
import { loginApi } from "../../libs/authApi.js";
import { useSignUpStore } from '../../store/signUpData.js';
import { closeAllBootstrapModals } from "../../utils/closeAllBootstrapModals.js";
import { useToast } from '../../store/toastStore.js';


// --- 1. DEFINE SCHEMAS ---
const passwordRules = z.string().min(1, "Password is required"); // Login usually just needs presence, strict length check is optional but good.

const mobileLoginSchema = z.object({
  phone: z.string().length(10, "Mobile number must be exactly 10 digits").regex(/^\d+$/, "Only numbers allowed"),
  password: passwordRules,
});

const emailLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: passwordRules,
});

export function LoginPanel() {
  const loginStore = useAuthStore();
  const navigate = useNavigate();
  const { setSignUpData } = useSignUpStore();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for password visibility toggles
  const [passVisibility, setPassVisibility] = useState({
    mobilePass: false,
    emailPass: false,
  });

  // Toggle function
  const toggleVisibility = (fieldKey) => {
    setPassVisibility((prev) => ({
      ...prev,
      [fieldKey]: !prev[fieldKey],
    }));
  };

  // --- 2. SETUP FORMS ---
  const {
    register: registerMobile,
    handleSubmit: handleMobileSubmit,
    formState: { errors: mobileErrors }
  } = useForm({
    resolver: zodResolver(mobileLoginSchema),
    mode: "onTouched"
  });

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors }
  } = useForm({
    resolver: zodResolver(emailLoginSchema),
    mode: "onTouched"
  });

  // --- 3. HANDLE LOGIN ---
  async function handleLogin(payload) {
    setIsSubmitting(true);

    try {
      console.log("Login payload:", payload);
      const res = await loginApi(payload);
      console.log("Login response:", res);

      // Success with token
      if (res?.data?.success === true && res?.data?.token) {
        toast.success("Login successful! Redirecting...");
        loginStore.login(res.data.token);
        closeAllBootstrapModals();
        navigate('/user');
        return;
      }

      // Requires OTP verification
      if (res?.data?.requiresVerification === true) {
        toast.info("Please verify your account with OTP.");
        setSignUpData({
          userId: res.data.userId,
          email: payload.email || null,
          phone: payload.phone || null,
          source: 'login'
        });
        return;
      }

      // Other failure
      toast.error(res?.data?.message || "Login failed. Please check your credentials.");

    } catch (error) {
      // Only 400-level business errors reach here (network/500 handled by interceptor)
      const message = error.response?.data?.error || "Something went wrong.";
      toast.error(message);

    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="tab-pane fade show active" id="login">
      <ul className="nav emailtabs sub-tabs mb-3" id="loginMethodTabs" role="tablist">
        <li className="nav-item"><button className="nav-link active" data-bs-toggle="tab" data-bs-target="#mobile-login">Mobile</button></li>
        <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#email-login">Email</button></li>
      </ul>

      <div className="tab-content">
        {
          /* --- Mobile Login --- */
        }
        <div className="tab-pane fade show active" id="mobile-login">
          <form onSubmit={handleMobileSubmit(handleLogin)}>
            <div className="form_input">
              <input
                {...registerMobile("phone")}
                type="text"
                className={`form-control mb-3 ${mobileErrors.phone ? "is-invalid" : ""}`}
                placeholder="Enter Mobile Number"
              />
              {mobileErrors.phone && <span className="text-danger small">{mobileErrors.phone.message}</span>}
            </div>

            <div className="form_input">
              <input
                {...registerMobile("password")}
                type={passVisibility.mobilePass ? "text" : "password"}
                className={`form-control mb-2 ${mobileErrors.password ? "is-invalid" : ""}`}
                placeholder="Enter Password"
              />
              <div
                className="hide_vector"
                onClick={() => toggleVisibility('mobilePass')}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={passVisibility.mobilePass ? "images/show_vector.svg" : "images/hide_vector.svg"}
                  alt="toggle password visibility"
                />
              </div>
              {mobileErrors.password && <span className="text-danger small">{mobileErrors.password.message}</span>}
            </div>

            <div className="text-end mb-3 forgetpassword"><a href="#" className="text-warning small">Forget Password ?</a></div>
            <button type="submit" className="btn btn-login w-100" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : 'Login'}
            </button>
          </form>
        </div>

        {
          /* --- Email Login --- */
        }
        <div className="tab-pane fade" id="email-login">
          <form onSubmit={handleEmailSubmit(handleLogin)}>
            <div className="form_input">
              <input
                {...registerEmail("email")}
                type="email"
                className={`form-control mb-3 ${emailErrors.email ? "is-invalid" : ""}`}
                placeholder="Enter Email"
              />
              {emailErrors.email && <span className="text-danger small">{emailErrors.email.message}</span>}
            </div>

            <div className="form_input">
              <input
                {...registerEmail("password")}
                type={passVisibility.emailPass ? "text" : "password"}
                className={`form-control mb-2 ${emailErrors.password ? "is-invalid" : ""}`}
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

            <div className="text-end mb-3 forgetpassword"><a href="#" className="text-warning small">Forget Password ?</a></div>
            <button type="submit" className="btn btn-login w-100" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}