export default function BuyPlans() {
  return <>
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
          <button className="planbtn">Buy Plan</button>
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
          <button className="planbtn">Buy Plan</button>
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
          <button className="planbtn">Buy Plan</button>
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
          <button className="planbtn">Buy Plan</button>
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
          <button className="planbtn">Buy Plan</button>
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
          <button className="planbtn">Buy Plan</button>
        </div>
      </div>

    </div>
  </>
}