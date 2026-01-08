import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../../libs/api';
import useMyPackageStore from '../../../store/useMyPackageStore';
import BuyPlans from './buyPlans/BuyPlans';
import MyPlans from './buyPlans/MyPlans';
import { useLocation } from 'react-router-dom';
import SideProfile from '../../../components/layout/SideProfile';

export default function Plans() {
  const [toggle, setToggle] = useState(0)
  const location = useLocation()

  useEffect(() => {
    if (location.state?.from === 'dashboard') {
      setToggle(1);
    }
  }, [location.state]);

  // API call with inline async, updates store
  const { isLoading, error } = useQuery({
    queryKey: ['my-packages'],
    queryFn: async () => {
      const response = await api.get('/api/Investment/my-packages');
      useMyPackageStore.getState().setMyPackage(response.data);
      return response.data;
    }
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="dashboard_right">
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="dashboard_right">
        <div className="row">
          <div className="col-12 text-center py-5">
            <p className="text-danger">Error loading packages. Please try again.</p>
          </div>
        </div>
      </div>
    )
  }

  return <div className="dashboard_right">
    <SideProfile />

    <div className="plan_section">
      <h2>
        <button onClick={() => setToggle(0)} style={toggle === 0 ? {} : { border: "none" }}>Plans</button>

        <button onClick={() => setToggle(1)} style={toggle === 1 ? {} : { border: "none" }}>My Plans</button></h2>
      {toggle === 0 ? <BuyPlans /> : <MyPlans />}
    </div>
  </div>
}