import React, { useState, useEffect } from "react";
import { verifyOtpApi, resendOtpApi } from "../../libs/authApi.js";
import useAuthStore from '../../store/authStore.js';
import { useSignUpStore } from '../../store/signUpData.js';
import { useNavigate } from "react-router-dom";
import { closeAllBootstrapModals } from "../../utils/closeAllBootstrapModals.js";
import { useToast } from '../../store/toastStore.js';

export function OtpPanel({ panelId }) {
  const { signUpData, setSignUpData } = useSignUpStore();
  const loginStore = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();

  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const [resendCountdown, setResendCountdown] = useState(0);

  // Countdown timer effect
  useEffect(() => {
    if (resendCountdown <= 0) return;

    const timer = setTimeout(() => {
      setResendCountdown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCountdown]);

  async function handleOtpVerify(e) {
    const otp = e.get('otp');

    if (!otp) {
      toast.error("Please enter OTP.");
      return;
    }

    if (!signUpData?.userId) {
      toast.error("Session expired. Please sign up again.");
      return;
    }

    setIsVerifying(true);

    try {
      const payload = { otp, userId: signUpData.userId };
      const res = await verifyOtpApi(payload);

      if (res?.data?.success === true) {
        toast.success("OTP Verified! Redirecting...");
        setSignUpData(null);
        loginStore.login(res.data.token);
        closeAllBootstrapModals();
        navigate('/user');
      } else {
        toast.error(res?.data?.error || "Verification failed.");
      }
    } catch (error) {
      const message = error.response?.data?.error || "Verification failed.";
      toast.error(message);
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleResendOtp() {
    if (!signUpData?.userId) {
      toast.error("Session expired. Please sign up again.");
      return;
    }

    setIsResending(true);

    try {
      const res = await resendOtpApi({ userId: signUpData.userId });

      if (res?.data?.success) {
        toast.success("OTP sent successfully!");
        setResendCountdown(30); // Start 30 second countdown
      } else {
        toast.error(res?.data?.error || "Failed to resend OTP.");
      }
    } catch (error) {
      const message = error.response?.data?.error || "Failed to resend OTP.";
      toast.error(message);
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="tab-pane fade show active" id={panelId} role="tabpanel">
      <div className="otp-panel">
        <p className="text-white bold">
          We sent an OTP to <strong>{signUpData?.email || signUpData?.phone}</strong>.
        </p>
        <p className="text-white">Please Verify OTP to Login.</p>

        <form action={handleOtpVerify}>
          <div className="form_input">
            <input name="otp" type="text" className="form-control mb-3" placeholder="Enter OTP" />
          </div>

          <button
            type="button"
            onClick={handleResendOtp}
            className="btn btn-login w-50"
            disabled={isResending || isVerifying || resendCountdown > 0}
          >
            {isResending ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Sending...
              </>
            ) : resendCountdown > 0 ? (
              `Resend in ${resendCountdown}s`
            ) : 'Resend OTP'}
          </button>

          <button
            type="submit"
            className="btn btn-login w-50"
            disabled={isVerifying || isResending}
          >
            {isVerifying ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Verifying...
              </>
            ) : 'Verify'}
          </button>
        </form>

        <div className="text-center mt-2">
          <button className="btn btn-link small" onClick={() => setSignUpData(null)}>
            Back to {panelId === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}
