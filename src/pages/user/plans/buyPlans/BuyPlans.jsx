import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { buyPlan } from '../../../../libs/authApi'
import useMyPackageStore from '../../../../store/useMyPackageStore'
import useUserStore from '../../../../store/userStore'
import { useToastStore } from '../../../../store/toastStore'

// Plan configuration with min/max amounts and eligibility requirements
const PLAN_CONFIG = {
  Basic: { min: 50, max: 1000 },
  Silver: { min: 200, max: 2000 },
  Gold: { min: 1000, max: 5000 },
  Platinum: { min: 2000, max: 10000 },
  Diamond: { min: 4000, max: 30000 },
  VIP: { min: 6000, max: 50000 }
}

// Check eligibility for each plan
const checkEligibility = (planName, eligibility) => {
  if (!eligibility) return { eligible: false, reason: 'Loading eligibility data...' }

  const { directReferrals = 0, referralsByPlanL1 = {}, referralsByPlanL2ToL7 = {} } = eligibility

  switch (planName) {
    case 'Basic':
      return { eligible: true, reason: '' }

    case 'Silver':
      if (directReferrals < 5) {
        return { eligible: false, reason: `Need 5 direct referrals (you have ${directReferrals})` }
      }
      return { eligible: true, reason: '' }

    case 'Gold':
      if (directReferrals < 10) {
        return { eligible: false, reason: `Need 10 direct referrals (you have ${directReferrals})` }
      }
      if ((referralsByPlanL1?.Silver || 0) < 2) {
        return { eligible: false, reason: `Need 2 Silver L1 referrals (you have ${referralsByPlanL1?.Silver || 0})` }
      }
      if ((referralsByPlanL2ToL7?.Basic || 0) < 10 || (referralsByPlanL2ToL7?.Silver || 0) < 4) {
        return { eligible: false, reason: `Need L2-L7: 10 Basic + 4 Silver` }
      }
      return { eligible: true, reason: '' }

    case 'Platinum':
      if (directReferrals < 25) {
        return { eligible: false, reason: `Need 25 direct referrals (you have ${directReferrals})` }
      }
      if ((referralsByPlanL1?.Silver || 0) < 4 || (referralsByPlanL1?.Gold || 0) < 2) {
        return { eligible: false, reason: `Need L1: 4 Silver + 2 Gold` }
      }
      if ((referralsByPlanL2ToL7?.Basic || 0) < 30 || (referralsByPlanL2ToL7?.Silver || 0) < 10 || (referralsByPlanL2ToL7?.Gold || 0) < 5) {
        return { eligible: false, reason: `Need L2-L7: 30 Basic + 10 Silver + 5 Gold` }
      }
      return { eligible: true, reason: '' }

    case 'Diamond':
      if (directReferrals < 50) {
        return { eligible: false, reason: `Need 50 direct referrals (you have ${directReferrals})` }
      }
      if ((referralsByPlanL1?.Silver || 0) < 20 || (referralsByPlanL1?.Gold || 0) < 10 || (referralsByPlanL1?.Platinum || 0) < 2) {
        return { eligible: false, reason: `Need L1: 20 Silver + 10 Gold + 2 Platinum` }
      }
      if ((referralsByPlanL2ToL7?.Basic || 0) < 100 || (referralsByPlanL2ToL7?.Silver || 0) < 50 || (referralsByPlanL2ToL7?.Gold || 0) < 25 || (referralsByPlanL2ToL7?.Platinum || 0) < 10) {
        return { eligible: false, reason: `Need L2-L7: 100 Basic + 50 Silver + 25 Gold + 10 Platinum` }
      }
      return { eligible: true, reason: '' }

    case 'VIP':
      if (directReferrals < 100) {
        return { eligible: false, reason: `Need 100 direct referrals (you have ${directReferrals})` }
      }
      if ((referralsByPlanL1?.Silver || 0) < 50 || (referralsByPlanL1?.Gold || 0) < 40 || (referralsByPlanL1?.Platinum || 0) < 20 || (referralsByPlanL1?.Diamond || 0) < 10) {
        return { eligible: false, reason: `Need L1: 50 Silver + 40 Gold + 20 Platinum + 10 Diamond` }
      }
      if ((referralsByPlanL2ToL7?.Basic || 0) < 200 || (referralsByPlanL2ToL7?.Silver || 0) < 100 || (referralsByPlanL2ToL7?.Gold || 0) < 50 || (referralsByPlanL2ToL7?.Platinum || 0) < 20 || (referralsByPlanL2ToL7?.Diamond || 0) < 10) {
        return { eligible: false, reason: `Need L2-L7: 200 Basic + 100 Silver + 50 Gold + 20 Platinum + 10 Diamond` }
      }
      return { eligible: true, reason: '' }

    default:
      return { eligible: false, reason: 'Unknown plan' }
  }
}

export default function BuyPlans() {
  const queryClient = useQueryClient()
  const { user } = useUserStore()
  const { myPackage } = useMyPackageStore()
  const { success, error: showError, warning } = useToastStore()

  const [showModal, setShowModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [amount, setAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const eligibility = myPackage?.eligibility
  const availableBalance = (user?.depositWallet || 0) + (user?.returnsWallet || 0)

  const handleBuyClick = (planName) => {
    const check = checkEligibility(planName, eligibility)

    if (!check.eligible) {
      warning(check.reason)
      return
    }

    // Eligible - show modal
    setSelectedPlan(planName)
    setAmount(PLAN_CONFIG[planName].min.toString())
    setShowModal(true)
  }

  const handleSetMax = () => {
    const maxForPlan = PLAN_CONFIG[selectedPlan]?.max || 50000
    const maxAmount = Math.min(availableBalance, maxForPlan)
    setAmount(maxAmount.toString())
  }

  const handleSubmit = async () => {
    const numAmount = parseFloat(amount)
    const config = PLAN_CONFIG[selectedPlan]

    if (isNaN(numAmount) || numAmount < config.min) {
      showError(`Minimum amount is $${config.min}`)
      return
    }
    if (numAmount > config.max) {
      showError(`Maximum amount is $${config.max}`)
      return
    }
    if (numAmount > availableBalance) {
      showError(`Insufficient balance. Available: $${availableBalance}`)
      return
    }

    // Show confirmation
    setShowConfirm(true)
  }

  const handleConfirmPurchase = async () => {
    const numAmount = parseFloat(amount)

    setIsSubmitting(true)
    try {
      await buyPlan({ planName: selectedPlan, amount: numAmount })
      // Invalidate query to refresh myPackage data
      queryClient.invalidateQueries({ queryKey: ['my-packages'] })
      success(`Successfully purchased ${selectedPlan} plan!`)
      setShowModal(false)
      setShowConfirm(false)
      setSelectedPlan(null)
      setAmount('')
    } catch (err) {
      showError(err.response?.data?.error || 'Failed to purchase plan')
      setShowConfirm(false) // Go back to amount input on error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackToAmount = () => {
    setShowConfirm(false)
  }

  const closeModal = () => {
    setShowModal(false)
    setShowConfirm(false)
    setSelectedPlan(null)
    setAmount('')
  }

  return <>
    {/* Buy Plan Modal Overlay */}
    {showModal && (
      <div className="modal-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div className="modal-content" style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '24px',
          width: '90%',
          maxWidth: '400px',
          color: '#000'
        }}>
          {!showConfirm ? (
            /* Amount Input View */
            <>
              <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>
                Buy {selectedPlan} Plan
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                  Amount (Min: ${PLAN_CONFIG[selectedPlan]?.min} - Max: ${PLAN_CONFIG[selectedPlan]?.max})
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min={PLAN_CONFIG[selectedPlan]?.min}
                    max={PLAN_CONFIG[selectedPlan]?.max}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      fontSize: '16px'
                    }}
                    placeholder="Enter amount"
                  />
                  <button
                    onClick={handleSetMax}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#1053C1',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Max
                  </button>
                </div>
                <p style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>
                  Available: ${availableBalance.toLocaleString()}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={closeModal}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#28a745',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Buy Now
                </button>
              </div>
            </>
          ) : (
            /* Confirmation View */
            <>
              <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>
                Confirm Purchase
              </h3>

              <p style={{ textAlign: 'center', fontSize: '16px', marginBottom: '24px', color: '#333' }}>
                Are you sure you want to buy <strong>{selectedPlan}</strong> plan with <strong>${parseFloat(amount).toLocaleString()}</strong>?
              </p>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleBackToAmount}
                  disabled={isSubmitting}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid #dc3545',
                    background: '#fff',
                    color: '#dc3545',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  No
                </button>
                <button
                  onClick={handleConfirmPurchase}
                  disabled={isSubmitting}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#28a745',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  {isSubmitting ? 'Processing...' : 'Yes'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )}

    <div className="row">

      <div className="col-sm-4">
        <div className="packages_block">
          <div className="star_icon">
            <img src="/images/star_icon.png" />
          </div>
          <div className="top_package_cnt">
            <div className="top_hd">
              <div className="star">
                <img src="/images/basic_star2.png" />
              </div>
              <h3>Basic</h3>
              <span>Entry Level</span>
            </div>
            <div className="price">$50 - $1K</div>
            <ul>
              <li>1% Daily ROI</li>
              <li>UP to 150% Return</li>
              <li>No Direct Requirement</li>
            </ul>
          </div>
          <button className="planbtn" onClick={() => handleBuyClick('Basic')}>Buy Plan</button>
        </div>
      </div>

      <div className="col-sm-4">
        <div className="packages_block silver_block">
          <div className="star_icon">
            <img src="/images/star_icon.png" />
          </div>
          <div className="top_package_cnt">
            <div className="top_hd">
              <div className="star">
                <img src="/images/silver_star2.png" />
              </div>
              <h3>Silver</h3>
              <span>Popular Choice</span>
            </div>
            <div className="price">$200 - $2K</div>
            <ul>
              <li>1% Daily ROI</li>
              <li>UP to 175% Return</li>
              <li>Direct Referral - <strong>5</strong></li>

            </ul>
          </div>
          <button className="planbtn" onClick={() => handleBuyClick('Silver')}>Buy Plan</button>
          <div className="star_effect">
            <img src="/images/star_icon2.png" />
          </div>
        </div>
      </div>

      <div className="col-sm-4">
        <div className="packages_block gold_block">
          <div className="star_icon">
            <img src="/images/star_icon.png" />
          </div>
          <div className="top_package_cnt">
            <div className="top_hd">
              <div className="star">
                <img src="/images/gold_star2.png" />
              </div>
              <h3>Gold</h3>
              <span>Entry Level</span>
            </div>
            <div className="price">$1k - $5k</div>
            <ul>
              <li>1% Daily ROI</li>
              <li>UP to 200% Return</li>
              <li>Direct Referral - <strong>10</strong> </li>
              <li>Additional Direct Referral<br /><strong>2 Silver Plan Holders</strong></li>
              <li>L2 - L7 requirements<br /><strong>4 Silver + 10 Basic Plan Holders</strong></li>

            </ul>
          </div>
          <button className="planbtn" onClick={() => handleBuyClick('Gold')}>Buy Plan</button>
          <div className="star_effect">
            <img src="/images/star_icon2.png" />
          </div>
        </div>
      </div>

      <div className="col-sm-4">
        <div className="packages_block platinum_block">
          <div className="top_package_cnt">
            <div className="top_hd">
              <div className="star">
                <img src="/images/platinum_star2.png" />
              </div>
              <h3>Platinum</h3>
              <span>Professional</span>
            </div>
            <div className="price">$2K - $10K</div>
            <ul>
              <li>1% Daily ROI</li>
              <li>UP to 225% Return</li>
              <li>Direct Referral - <strong>25</strong></li>
              <li>Additional Direct Referral<br /><strong>4 Silver + 2 Gold</strong></li>
              <li>L2 - L7 requirements<br /><strong>30 Basic + 10 Silver + 5 Gold</strong></li>
            </ul>
          </div>
          <button className="planbtn" onClick={() => handleBuyClick('Platinum')}>Buy Plan</button>
          <div className="star_effect">
            <img src="/images/star_icon.png" />
          </div>
        </div>
      </div>

      <div className="col-sm-4">
        <div className="packages_block diamond_block">
          <div className="top_package_cnt">
            <div className="top_hd">
              <div className="star">
                <img src="/images/diamond_star2.png" />
              </div>
              <h3>Diamond</h3>
              <span>Elite</span>
            </div>
            <div className="price">$4K - $30K</div>
            <ul>
              <li>1% Daily ROI</li>
              <li>UP to 250% Return</li>
              <li>Direct Referral - <strong>50</strong></li>
              <li>Additional Direct Referral<br /><strong>20 Silver + 10 Gold + 2 Platinum</strong></li>
              <li>L2 - L7 requirements<br /><strong>100 Basic + 50 Silver + 25 Gold + 10 Platinum</strong></li>
            </ul>
          </div>
          <button className="planbtn" onClick={() => handleBuyClick('Diamond')}>Buy Plan</button>
          <div className="star_effect">
            <img src="/images/star_icon.png" />
          </div>
        </div>
      </div>

      <div className="col-sm-4">
        <div className="packages_block vip_block">
          <div className="star_icon">
            <img src="/images/star_icon.png" />
          </div>
          <div className="top_package_cnt">
            <div className="top_hd">
              <div className="star">
                <img src="/images/vip_star2.png" />
              </div>
              <h3>VIP</h3>
              <span>Exclusive</span>
            </div>
            <div className="price">$6K - $50K</div>
            <ul>
              <li>1% Daily ROI</li>
              <li>UP to 300% Return</li>
              <li>Direct Referral - <strong>100</strong></li>
              <li>Additional Direct Referral<br /><strong>50 Silver + 40 Gold + 20 Platinum + 10 Diamond</strong></li>
              <li>L2 - L7 requirements<br /><strong>200 Basic + 100 Silver + 50 Gold + 20 Platinum + 10 Diamond</strong></li>
            </ul>
          </div>
          <button className="planbtn" onClick={() => handleBuyClick('VIP')}>Buy Plan</button>
        </div>
      </div>

    </div>
  </>
}