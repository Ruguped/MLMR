import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../../libs/api';
import SideProfile from "../../../components/layout/SideProfile";
import { Link } from 'react-router-dom';

export default function Referrals() {
  const [page, setPage] = useState(1);
  const [level, setLevel] = useState('all');
  const [order, setOrder] = useState('newest');

  // Fetch commission history with pagination and filters
  const { data, isLoading, error } = useQuery({
    queryKey: ['commission-history', page, level, order],
    queryFn: async () => {
      const response = await api.get('/api/referral/commission-history', {
        params: {
          page,
          limit: 10,
          level,
          sortOrder: order
        }
      });
      console.log(response.data);
      return response.data;
    },
    keepPreviousData: true, // Smooth UX when changing pages
  });




  return <div className="dashboard_right">
    <SideProfile />
    <div className="wallect_s">
      <h2><img src="/images/wallet_vector.svg" />Referral
        <select value={level} onChange={e => { setLevel(e.target.value); setPage(1); }}>
          <option value='all'>All</option>
          <option value='1'>L1</option>
          <option value='2'>L2</option>
          <option value='3'>L3</option>
          <option value='4'>L4</option>
          <option value='5'>L5</option>
          <option value='6'>L6</option>
          <option value='7'>L7</option>
        </select>
        <select value={order} onChange={e => { setOrder(e.target.value); setPage(1); }}>
          <option value='newest'>Newest</option>
          <option value='oldest'>Oldest</option>
        </select>
        <Link to="/user/team">VIEW ALL TEAM</Link>  
      </h2>
      <div className="table-responsive">
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
            {isLoading ? (
              <tr><td colSpan="4" className="text-center">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan="4" className="text-center text-danger">Error loading data</td></tr>
            ) : data?.history?.length === 0 ? (
              <tr><td colSpan="4" className="text-center">No commission history found</td></tr>
            ) : (
              data?.history?.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="user_profile">
                      <div className="user_img">
                        <img src="/images/user_dash_profile.svg" alt="user" className="round_img" />
                      </div>
                      <div className="user_profile_cnt">
                        <h3>{item.refereeUsername}</h3>
                        <p>{item.levelLabel}</p>
                      </div>
                    </div>
                  </td>
                  <td>{item.planBought}</td>
                  <td>{item.level}</td>
                  <td className="green">{item.commissionEarned}&nbsp;USD</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {Array.from({ length: data?.totalPages || 1 }, (_, i) => (
          <button
            key={i + 1}
            className={`page-btn ${page === i + 1 ? 'active' : ''}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        {page < (data?.totalPages || 1) && (
          <button
            className="page-btn arrow"
            onClick={() => setPage(p => p + 1)}
          >
            ›
          </button>
        )}
      </div>
    </div>
    <div className="referral_reward_block">
      <div className="reward_cnt">
        <h2>Total Referral Reward: 6 USDT</h2>
        <h3>Earn 3 USDT for every friend you
          invite!</h3>
        <p>Invite a friend to Exchanges and get 3 USDT once they
          complete their KYC and first trade.</p>
        <div className="referralcode">
          <label>Referral</label>
          <div className="info_input">
            <div className="d-flex">
              <input type="text" placeholder="LUCK656594" />
              <span>Copy</span>
            </div>
          </div>
        </div>
        <ul className="socialmedia">
          <li><a href="#"><i className="fa-brands fa-instagram" /></a></li>
          <li><a href="#"><i className="fa-brands fa-x-twitter" /></a></li>
          <li><a href="#"><i className="fa-brands fa-facebook-f" /></a></li>
          <li><a href="#"><i className="fa-brands fa-youtube" /></a></li>
          <li><a href="#"><i className="fa-brands fa-telegram" /></a></li>
        </ul>
      </div>
      <div className="referral_offer_vector">
        <img src="/images/referral_offer_vector.svg" />
      </div>
    </div>
    <div className="referral_stats">
      <h5>Referral Stats</h5>
      <ul>
        <li>12 <span>Total Referrals(L1-L7)</span></li>
        <li>85 <span>Direct Referrals(L1)</span></li>
        <li>12,12345.2 <span>Total Commission</span></li>
      </ul>
      <a className="analyticsbtn" href="#">Detailed Analytics</a>
    </div>
    <div className="commision_rate">
      <h6>Commission Rates</h6>
      <ul>
        <li>L1: 10%</li>
        <li>L2: 5%</li>
        <li>L3: 3%</li>
        <li>L4-7: 1%</li>
      </ul>
    </div>
  </div>
}