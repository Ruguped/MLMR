// Plan configuration for styling and display
const PLAN_CONFIG = {
  Basic: {
    cssClass: '',
    subtitle: 'Entry Level',
    starIconPosition: 'left',
    hasStarEffect: false
  },
  Silver: {
    cssClass: 'silver_block',
    subtitle: 'Popular Choice',
    starIconPosition: 'right',
    hasStarEffect: true
  },
  Gold: {
    cssClass: 'gold_block',
    subtitle: 'Premium',
    starIconPosition: 'left',
    hasStarEffect: true
  },
  Platinum: {
    cssClass: 'platinum_block',
    subtitle: 'Professional',
    starIconPosition: 'none',
    hasStarEffect: true,
    starEffectPosition: 'right'
  },
  Diamond: {
    cssClass: 'diamond_block',
    subtitle: 'Elite',
    starIconPosition: 'none',
    hasStarEffect: true,
    starEffectPosition: 'right'
  },
  VIP: {
    cssClass: 'vip_block',
    subtitle: 'Exclusive',
    starIconPosition: 'left',
    hasStarEffect: false
  }
}

// Format date to readable string
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount)
}

export default function MyPlanCard({
  planName,
  amount,
  dailyROI,
  maxReturnPercentage,
  maxReturn,
  totalEarned,
  remainingReturn,
  dailyEarning,
  isActive,
  purchasedAt,
  maxedOutAt
}) {
  // Get plan configuration
  const config = PLAN_CONFIG[planName] || PLAN_CONFIG.Basic

  // Calculate progress percentage
  const progressPercent = maxReturn > 0 ? (totalEarned / maxReturn) * 100 : 0

  // Determine status
  const status = isActive ? 'active' : 'completed'
  const statusText = isActive ? 'Active' : 'Completed'

  // Date to display
  const displayDate = isActive
    ? `Purchased: ${formatDate(purchasedAt)}`
    : `Completed: ${formatDate(maxedOutAt || purchasedAt)}`

  // Star image path
  const starImage = `/images/${planName.toLowerCase()}_star2.png`

  return (
    <div className={`packages_block ${config.cssClass}`}>
      {/* Star Icon - only show for plans that have it */}
      {config.starIconPosition !== 'none' && (
        <div className="star_icon">
          <img src="/images/star_icon.png" alt="" />
        </div>
      )}

      <div className="top_package_cnt">
        <div className="top_hd">
          <div className="star">
            <img src={starImage} alt={planName} />
          </div>
          <h3>{planName}</h3>
          <span>{config.subtitle}</span>
        </div>

        <div className="price">{formatCurrency(amount)}</div>
        <div className={`status_badge ${status}`}>{statusText}</div>

        <ul>
          <li><strong>{dailyROI}%</strong> Daily ROI</li>
          <li><strong>{formatCurrency(dailyEarning)}</strong> Daily Earning</li>
          <li><strong>{maxReturnPercentage}%</strong> Max Return</li>
        </ul>

        <div className="earning_progress">
          <div className="progress_info">
            <span>Earned</span>
            <span>{formatCurrency(totalEarned)} / {formatCurrency(maxReturn)}</span>
          </div>
          <div className="progress_track">
            <div
              className={`progress_fill ${!isActive ? 'completed' : ''}`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="remaining_box">
          <span>Remaining</span>
          <strong>{formatCurrency(remainingReturn)}</strong>
        </div>
      </div>

      {/* Star Effect - for plans that have it */}
      {config.hasStarEffect && (
        <div className="star_effect">
          <img src="/images/star_icon2.png" alt="" />
        </div>
      )}

      <div className="purchase_date">{displayDate}</div>
    </div>
  )
}
