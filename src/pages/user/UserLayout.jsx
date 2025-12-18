import { Sidebar } from '../../components/layout/Sidebar.jsx';
import { useEffect, useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import useUserStore from '../../store/userStore.js';
import { profile } from '../../libs/authApi.js';
import { useQueryClient, useQuery } from '@tanstack/react-query';

export default function UserLayout() {
  const { user, setUser } = useUserStore();
  const queryClient = useQueryClient();



  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);


  // useEffect(() => {
  //   if (!isLoaded) {
  //     profile()
  //       .then(res => { setUser(res.data.user), console.log(res.data.user) })
  //       .catch(err => console.error(err));
  //   }
  // }, [isLoaded, setUser]);

  const {data, isLoading , isError} = useQuery({
    queryKey:['Users'],
    queryFn:async ()=> {const res = await profile();
            setUser(res.data.user);
             return res.data.user;
            }
}) 





  // Scroll behavior - add active class to leftside_menu on scroll (desktop only)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 767) {
        setIsSidebarActive(window.scrollY > 50);
      } else {
        setIsSidebarActive(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Toggle handlers
  const handleToggleOpen = () => {
    setIsSidebarOpen(prev => !prev);
  };
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };


if(isError){
  return <h1>Error here ....</h1>
}



  return (
    <>
      <div className={`dashboard profile_bg_none${isSidebarOpen ? ' dashboard_open' : ''}`}>
        <div className="mobile_view" id="toggleBtn" onClick={handleToggleOpen}>
          <div><i className="fa-solid fa-house" />Dashboard</div><span><i className="fa-solid fa-angle-down" /></span>
        </div>
        <Sidebar isSidebarOpen={isSidebarOpen} isSidebarActive={isSidebarActive} handleCloseSidebar={handleCloseSidebar} />

        
      {isLoading ? <h1 style={{ textAlign: 'center',marginLeft:'50%'}}>Loading...</h1> : 
        <Outlet />}
      </div>


    </>

  );
}
