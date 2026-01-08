import React, { useState, useEffect } from "react";
import { useToast } from "../../store/toastStore.js";
import useUserStore from "../../store/userStore.js";
import SideProfile from "../../components/layout/SideProfile.jsx";
import api from "../../libs/api.js";

export default function Withdraw() {
  const toast = useToast();
  const { user } = useUserStore();
  const { returnsWallet = 0 } = user || {};

  // Flow state: 'form' or 'otp'
  const [step, setStep] = useState("form");
  const [requestId, setRequestId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    amount: "",
    network: "tron",
    walletAddress: "",
    confirmWalletAddress: "",
    withdrawalType: "returns",
  });

  // OTP state
  const [otp, setOtp] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Handle form input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  // Set max amount
  function handleMaxAmount() {
    setFormData(prev => ({ ...prev, amount: returnsWallet.toString() }));
  }

  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setTimeout(() => {
      setResendCountdown(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  // ==================== STEP 1: Create Withdrawal Request ====================
  async function handleSubmit(e) {
    e.preventDefault();

    // Validation
    if (!formData.amount || !formData.walletAddress || !formData.confirmWalletAddress) {
      toast.error("Please fill all fields");
      return;
    }

    if (formData.walletAddress !== formData.confirmWalletAddress) {
      toast.error("Wallet addresses do not match");
      return;
    }

    if (parseFloat(formData.amount) > returnsWallet) {
      toast.error(`Insufficient balance. Available: ${returnsWallet}`);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await api.post("/api/wallet/withdraw/request", {
        amount: parseFloat(formData.amount),
        network: formData.network,
        walletAddress: formData.walletAddress,
        confirmWalletAddress: formData.confirmWalletAddress,
        withdrawalType: formData.withdrawalType,
      });

      if (response.data.success) {
        setRequestId(response.data.requestId);
        setStep("otp");
        setResendCountdown(60);
        toast.success(response.data.message);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to create withdrawal request";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  }

  // ==================== STEP 2: Verify OTP ====================
  async function handleVerifyOtp(e) {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsVerifying(true);
      const response = await api.post("/api/wallet/withdraw/verify-otp", {
        requestId,
        otp,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset everything
        setStep("form");
        setRequestId(null);
        setOtp("");
        setFormData({
          amount: "",
          network: "tron",
          walletAddress: "",
          confirmWalletAddress: "",
          withdrawalType: "returns",
        });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "OTP verification failed";
      const attemptsRemaining = error.response?.data?.attemptsRemaining;
      if (attemptsRemaining !== undefined) {
        toast.error(`${errorMsg}. Attempts remaining: ${attemptsRemaining}`);
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setIsVerifying(false);
    }
  }

  // ==================== Resend OTP ====================
  async function handleResendOtp() {
    if (resendCountdown > 0 || isResending) return;

    try {
      setIsResending(true);
      const response = await api.post("/api/wallet/withdraw/resend-otp", {
        requestId,
      });

      if (response.data.success) {
        setResendCountdown(60);
        toast.success(response.data.message);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to resend OTP";
      toast.error(errorMsg);
    } finally {
      setIsResending(false);
    }
  }

  // ==================== Cancel and go back ====================
  function handleCancel() {
    setStep("form");
    setRequestId(null);
    setOtp("");
    setResendCountdown(0);
  }

  return (
    <div className="dashboard_right">
      <SideProfile />

      {/*===============================WithdrawBlock==============================*/}
      <div className="deposit_block_das withdraw_inquery_s">
        <h2>Withdraw</h2>
        <div className="qur_code_inquery">

          {/* ==================== STEP 1: Withdrawal Form ==================== */}
          {step === "form" && (
            <form onSubmit={handleSubmit}>

              {/* Available Balance */}
              <div className="info_input">
                <label>Available Balance: <strong>{returnsWallet} USDT</strong></label>
              </div>

              {/* Amount */}
              <div className="info_input">
                <div className="d-flex">
                  <input
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    max={returnsWallet}
                  />
                  <span onClick={handleMaxAmount} style={{ cursor: "pointer" }}>Max</span>
                </div>
              </div>

              {/* Network Select */}
              <div className="info_input">
                <select name="network" value={formData.network} onChange={handleChange}>
                  <option value="" disabled>Network</option>
                  <option value="ethereum">Ethereum (ERC20)</option>
                  <option value="bsc">BSC (BEP20)</option>
                  <option value="tron">Tron (TRC20)</option>
                  <option value="polygon">Polygon</option>
                  <option value="solana">Solana</option>
                </select>
              </div>

              {/* Wallet Address */}
              <div className="info_input">
                <input
                  name="walletAddress"
                  type="text"
                  value={formData.walletAddress}
                  onChange={handleChange}
                  placeholder="Wallet Address"
                />
              </div>

              {/* Confirm Wallet Address */}
              <div className="info_input">
                <input
                  name="confirmWalletAddress"
                  type="text"
                  value={formData.confirmWalletAddress}
                  onChange={handleChange}
                  placeholder="Confirm Wallet Address"
                />
              </div>

              <button className="btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Continue"}
              </button>

            </form>
          )}

          {/* ==================== STEP 2: OTP Verification ==================== */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp}>

              <div className="info_input">
                <p>OTP has been sent to your registered email/phone.</p>
                <p><small>Request expires in 10 minutes.</small></p>
              </div>

              {/* OTP Input */}
              <div className="info_input">
                <div className="d-flex">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                  <span
                    onClick={handleResendOtp}
                    style={{
                      cursor: resendCountdown > 0 ? "not-allowed" : "pointer",
                      opacity: resendCountdown > 0 ? 0.6 : 1,
                    }}
                  >
                    {isResending ? "Sending..." : resendCountdown > 0 ? `Resend (${resendCountdown}s)` : "Resend OTP"}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div className="bankdel">
                <label className="mb-2">Withdrawal Summary</label>
                <legend>Amount <span>{formData.amount} USDT</span></legend>
                <legend>Network <span>{formData.network.toUpperCase()}</span></legend>
                <legend>Wallet <span>{formData.walletAddress.slice(0, 10)}...{formData.walletAddress.slice(-6)}</span></legend>
              </div>

              <div className="d-flex gap-2">
                <button type="button" className="btn withdraw" onClick={handleCancel} disabled={isVerifying}>
                  Cancel
                </button>
                <button className="btn" type="submit" disabled={isVerifying}>
                  {isVerifying ? "Verifying..." : "Verify & Submit"}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}