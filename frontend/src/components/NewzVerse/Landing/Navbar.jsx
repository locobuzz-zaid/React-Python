import React, { useState, useEffect, useCallback, useRef } from "react";
import { Tooltip, Button, Popover, Image, Spin } from "antd";
import profileIcon from "../../../assets/my_profile_icon.svg";
import logoutIcon from "../../../assets/logout_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NVlogo from "../../../assets/Pages/sign_up_logo.svg";

const Navbar = ({
  isShowSidebar,
  setIsShowSidebar,
  isShowChatHistorySidebar,
  setIsShowChatHistorySidebar,
  text,
  setText,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let p_token = localStorage.getItem("p_token");

  const catMenu = useRef(null);

  const [showNavbar, setShowNavbar] = React.useState(false);
  const [scrollPosition, setScrollPosition] = useState(null);
  const [emailTags, setEmailTags] = useState([]);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [profilePopUpDesktop, setProfilePopUpDesktop] = useState(false);
  const [profilePopUpMobile, setProfilePopUpMobile] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState({
    flag: false,
    title: null,
    sub_title: null,
    option: null,
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (catMenu.current && !catMenu.current.contains(event.target)) {
        if (showNavbar) {
          setShowNavbar(false);
        }
      }
    }
    // Bind
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [catMenu, showNavbar]);

  const toggleSidebar = useCallback(() => {
    setIsShowSidebar((prev) => !prev);
  }, []);

  const handleLandingPage = () => {
    navigate("/");

    // Close Mobile sidebar
    if (showNavbar) {
      setShowNavbar(false);
    }
  };

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  // Logout Flow
  const handleLogoutUser = () => {
    setShowCustomModal({
      flag: true,
      title: "Log out?",
      sub_title: "Are you sure you want to log out?",
      option: "log_out",
    });

    setProfilePopUpMobile(false);
    setProfilePopUpDesktop(false);
  };

  // Enable User Profile
  const handleMyProfile = () => {
    // dispatch(setUserProfileModalFlag(true));

    // Redirect to landing page
    navigate("/profile");

    setProfilePopUpMobile(false);
    setProfilePopUpDesktop(false);
  };
  const profileContentPopUp = (
    <div className="profile-box-container">
      <div onClick={handleMyProfile} className="my_profile_btn">
        <img
          src={profileIcon}
          height="20px"
          style={{ marginRight: "5px" }}
          alt="profileIcon"
        />{" "}
        My Profile
      </div>
      <div className="my_profile_btn_divider"></div>
      <div onClick={handleLogoutUser} className="user_logout_btn">
        <img
          src={logoutIcon}
          height="20px"
          style={{ marginRight: "5px" }}
          alt="logoutIcon"
        />{" "}
        Log Out
      </div>
    </div>
  );

  const handleProfilePopUpMobile = (newOpen) => {
    setProfilePopUpMobile(newOpen);
  };

  // Them code
  // const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app_theme", theme);
  }, [theme]);

  const handleThemeMode = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };
  const handleSignIn = () => {
    navigate("/sign-in");
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <nav className="navbar-parent-container" ref={catMenu}>
      <div className="container1">
        <div className="navbar-desktop-logo" onClick={handleLandingPage}>
          <img className="navbar-desktop-logo-icon" src={NVlogo} />
          NewzVerse
        </div>

        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <div className="desktop-navbar-content-component">
            <div style={{ display: "flex" }}>
              {!p_token && window.location.pathname === "/" ? (
                <>
                  <Button className="sign-in_btn" onClick={handleSignIn}>
                    Sign In
                  </Button>
                  <Button className="sign-up_btn" onClick={handleSignUp}>
                    Sign Up
                  </Button>
                </>
              ) : (
                <Button className="sign-up_btn" onClick={handleDashboard}>
                  Dashboard
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
