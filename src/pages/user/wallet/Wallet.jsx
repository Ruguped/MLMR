

import { useState } from 'react';
import DepositHistory from './history/DepositHistory';
import useUserStore from '../../../store/userStore';
import SideProfile from '../../../components/layout/SideProfile';

export default function Wallet() {
  const [showDepositHistory, setShowDepositHistory] = useState(false);
  const { user } = useUserStore();



  const { depositWallet, investmentWallet, returnsWallet, roiBalance,totalCommission } = user;

  return <div className="dashboard_right">
      <SideProfile />
    <div className="amount_history_s">
      <h2>Amount</h2>
      <div className="amount_info_list">
        <ul>
          <li>
            <h4>Deposit Amount</h4>
           <span style={{ fontSize: '22px', fontWeight: 'bold'}}> ${depositWallet}</span>          </li>
          <li>
            <h4>ROI Amount</h4>
           <span style={{ fontSize: '22px', fontWeight: 'bold'}}> ${roiBalance}</span>
          </li>
          <li>
            <h4>Withdrawable Amount
              (ROI + Commission)</h4>
           <span style={{ fontSize: '22px', fontWeight: 'bold'}}> ${returnsWallet}</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="amount_history_s">
      <h2>History</h2>
      <div className="amount_info_list historydata">
        <ul>
          <li>
            <h4>Deposit Amount</h4>
            <button className="btn" onClick={() => setShowDepositHistory(true)}>View More</button>
          </li>
          <li>
            <h4>ROI Amount</h4>
            <button className="btn">View More</button>
          </li>
          <li>
            <h4>Withdrawable Amount
              (ROI + Commission)</h4>
            <button className="btn">View More</button>
          </li>
        </ul>
      </div>
    </div>
    <div className="wallect_s">
      <h2><img src="/images/wallet_vector.svg" />Wallet</h2>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Plan</th>
            <th>Reference</th>
            <th>Comminsion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
          <tr>
            <td>
              <div className="user_profile">
                <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                </div>
                <div className="user_profile_cnt">
                  <h3>Raj</h3>
                  <p>Level 1</p>
                </div>
              </div>
            </td>
            <td>Silver</td>
            <td>5</td>
            <td className="green">688.664&nbsp;USD</td>
          </tr>
        </tbody>
      </table>
      <div className="pagination">
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <button className="page-btn arrow">›</button>
      </div>
    </div>

    {/* Deposit History Popup */}
    {showDepositHistory && (
      <DepositHistory onClose={() => setShowDepositHistory(false)} />
    )}

  </div>;
}