import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from "../hooks/useAuth"

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/project(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const UserInformation = ( { username}) => (
  <div className="flex items-center">
    
   <span className="text-white">{username} مرحبا </span>
  </div>
);


const DashHeader = () => {
  
  const {username} = useAuth()
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  if (isLoading) return <p className="text-white">Logging Out...</p>;

  if (isError) return <p className="text-white">Error: {error.data?.message}</p>;

  let dashClass = null;
  if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
    dashClass = "dash-header__container--small";
  }

  const logoutButton = (
    <button
      className="icon-button text-xl"
      title="تسجيل الخروج"
      onClick={sendLogout}
    >
    <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const content = (
    <header className="dash-header bg-gray-800 p-4">
      <div className={`dash-header__container ${dashClass} flex justify-between items-center mx-auto max-w-screen-lg`}>
        <Link to="/">
          <h1 className="dash-header__title text-3xl font-bold text-white">QRCRR</h1>
        </Link>
        <nav className="dash-header__nav text-white text-right flex items-center space-x-4">
          {/* add more buttons later */}
          <UserInformation username={username} />
          {logoutButton}
        </nav>
      </div>
    </header>
  );

  return content;
};

export default DashHeader;
