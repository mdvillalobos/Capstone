import { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import axios from 'axios';

const useInactivityLogout = (timeout = 600000, isActive = true) => {
  const { setUser } = useContext(UserContext);
  const [ isPopupVisible, setIsPopupVisible ] = useState(false);
  const timerRef = useRef(null);
  
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.post('/api/logout')
    } catch (error) {
      console.error(`Logout Error ${ error.message }`);
    }
  }

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsPopupVisible(true); 
      Logout();
    }, timeout);
  };

  const handleUserActivity = () => resetTimer();

  const handlePopupConfirm = () => {
    setIsPopupVisible(false); 
    setUser(null)
    navigate('/')
  };

  useEffect(() => {
    if (isActive) {
      resetTimer();
      window.addEventListener('mousemove', handleUserActivity);
      window.addEventListener('keydown', handleUserActivity);
    }

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [timeout, Logout, isActive]);

  return { isPopupVisible, handlePopupConfirm };
};

export default useInactivityLogout;
