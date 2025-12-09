import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useUserStore from '../../store/userStore.js';
import { profile } from '../../libs/authApi.js';

export default function UserLayout() {
  const { user, setUser, isLoaded } = useUserStore();

  useEffect(() => {
    if (!isLoaded) {
      profile()
        .then(res => { setUser(res.data.user), console.log(res.data.user) })
        .catch(err => console.error(err));
    }
  }, [isLoaded, setUser]);

  return (


    <Outlet />


  );
}