import React, { useEffect, useRef, useState } from "react";
import { Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { validatePassword } from "../../../redux/constants";
import incorrectPasswordIcon from "../../../assets/incorrect-password-icon.svg";
import "./pages.css";
import {
  setRedirectToDashboard,
  setSignUpStep,
} from "../../../redux/actions/NewzVerse/NewzVerse";
import {
  createAccountAPI,
  createUserAPI,
  getAiEmailInfoAPI,
  signUpAPI,
  signUpGenerateOtpAPI,
  validateOtpAPI,
} from "../../../redux/actions/NewzVerse/NewzVerseAPI";
import NVlogo from "../../../assets/Pages/sign_up_logo.svg";
import { getDynamicSvgIcons } from "../../../redux/constants/NewzVerseConst";
import AccountSetup from "./AccountSetup";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import otpVerifiedCheckIcon from "../../../assets/Pages/otp_verified_check_icon.svg";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userNameInput = useRef(null);
  const emailAddressInput = useRef(null);

  const otpValidateLoader = useSelector(
    (state) => state?.NewzVerse?.otp_validate_loader
  );
  const redirectToDashboard = useSelector(
    (state) => state?.NewzVerse?.redirect_to_dashboard
  );

  // Newz
  const signUpLoader = useSelector((state) => state?.NewzVerse?.sign_up_loader);
  const signUpStep = useSelector((state) => state?.NewzVerse?.sign_up_step);
  const verifiedOtpFlag = useSelector(
    (state) => state?.NewzVerse?.verified_otp_flag
  );

  const [emailAddress, setEmailAddress] = useState(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpValue, setotpValue] = useState("");
  const [emailError, setEmailError] = useState("");

  // Step 1
  const [userName, setUserName] = useState(null);
  const [nameValidateError, setNameValidateError] = useState(null);

  const [createPasswordError, setCreatePasswordError] = useState("");
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errors, setErrors] = useState([]);

  // Step 3
  const [minutes, setMinutes] = React.useState(4);
  const [seconds, setSeconds] = React.useState(59);
  const [timerResetFlag, setTimerResetFlag] = useState(false);

  // Step 4

  // Redirect to dashboard
  useEffect(() => {
    if (redirectToDashboard) {
      setTimeout(() => {
        navigate("/dashboard");
        dispatch(setRedirectToDashboard(false));
        dispatch(setSignUpStep(1));
      }, 8000);
    }
  }, [redirectToDashboard]);

  // Timer useEffect
  useEffect(() => {
    if (signUpStep !== 3) return;

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          setMinutes((prevMinutes) => {
            if (prevMinutes === 0) {
              clearInterval(interval);
              return 0;
            } else {
              setSeconds(59); // reset seconds
              return prevMinutes - 1;
            }
          });
          return 0;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [signUpStep, timerResetFlag]);

  // Auto Focus useEffect
  useEffect(() => {
    if (signUpStep === 1) {
      userNameInput?.current?.focus();
    }

    if (signUpStep === 2) {
      emailAddressInput?.current?.focus();
    }
  }, [signUpStep]);

  var urlParams; // url encrypted parameters

  //Function to get url params from URL and set it to urlParams variable
  (window.onpopstate = function () {
    var match,
      pl = /\+/g, // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) {
        return decodeURIComponent(s.replace(pl, " "));
      },
      query = window.location.search.substring(1);

    urlParams = {};
    while ((match = search.exec(query)))
      urlParams[decode(match[1])] = decode(match[2]);
  })();

  let ref_id = localStorage.getItem("ref_id");
  useEffect(() => {
    if (!ref_id && urlParams?.refid) {
      localStorage.setItem("ref_id", urlParams?.refid);

      // Remove extra query from the URL
      navigate("/sign-up");
    }

    // Show message
    if (urlParams?.message) {
      let msg = urlParams?.message;
      message.open({
        type: "error",
        content: msg,
      });

      // Remove extra query from the URL
      navigate("/sign-up");
    }
  }, []);

  const handleBack = () => {
    dispatch(setSignUpStep(signUpStep - 1));
  };
  const handleSignInPage = () => {
    navigate("/sign-in");
  };

  // Step 1 Start
  const handleChangeUserName = (e) => {
    const input = e?.target?.value;

    // Allow only letters (no numbers or special characters)
    const onlyLetters = /^[A-Za-z\s]*$/;

    if (onlyLetters.test(input)) {
      setUserName(input);
      setNameValidateError(null);
    } else {
      setNameValidateError("Only letters are allowed");
    }
  };
  const handleNextStep = (event, stepCount) => {
    if ((event.key === "Enter" || event.key === undefined) && userName) {
      dispatch(setSignUpStep(stepCount));
    } else if (
      event.key !== "Alt" &&
      event.key !== "Shift" &&
      event.key !== "I" &&
      event.key !== "Control"
    ) {
      setNameValidateError("Please enter your full name");
    }
  };
  // Step 1 End

  // Step 2 Start
  const handleChangeEmailAddress = (e) => {
    setEmailAddress(e?.target?.value);
    setEmailError("");
  };
  const handleChangePassword = (e) => {
    const newPassword = e?.target?.value?.trim();
    setPassword(newPassword);
    setErrors(validatePassword(newPassword));
    setCreatePasswordError(null);
  };
  const handleChangeConfirmPassword = (e) => {
    const newPassword = e?.target?.value?.trim();
    setConfirmPassword(newPassword);
    // setErrors(validatePassword(newPassword));
    setCreatePasswordError(null);
  };
  const verifyEmailIdApiCall = async (event) => {
    if (event.key === "Enter" || event.key === undefined) {
      const isValidEmail =
        /^(?!.*\.\.)[a-zA-Z\d](?:[\w.-]*[a-zA-Z\d])?@[a-zA-Z\d-]+(\.[a-zA-Z]{2,})+$/;

      if (emailAddress === "" || emailAddress === null) {
        setEmailError("Enter your work email id.");
      } else if (password === "" || confirmPassword === null) {
        setCreatePasswordError("Enter your password.");
      } else if (password !== confirmPassword) {
        setCreatePasswordError("Password does not match.");
      } else if (
        emailAddress &&
        emailAddress.match(isValidEmail) &&
        password &&
        confirmPassword &&
        password === confirmPassword
      ) {
        setEmailError("");
        setCreatePasswordError("");
        setErrors([]);

        let payloadObj = {
          name: userName,
          email: emailAddress,
          password: password,
        };
        dispatch(signUpGenerateOtpAPI(payloadObj));
        // dispatch(createUserAPI(payloadObj));
      } else {
        setEmailError("Looks like an invalid email.");
      }
    }
  };
  // Step 2 End

  // Step 3 Start
  const handleChangeOtpValue = (e, index) => {
    let value = e.target.value;
    if (e?.key === "Enter") {
      handleValidateOtp();
    } else if (e?.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      setotpValue(newOtp.join(""));
      e?.target?.previousSibling?.focus();
    } else {
      if (value.match(/^\d$/) && value !== "") {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setotpValue(newOtp.join(""));
        if (otpValue?.length < 5) {
          e?.target?.nextSibling?.focus();
        }
      }
    }
  };
  const handleResendOTP = (event) => {
    setMinutes(4);
    setSeconds(59);
    dispatch(setSignUpStep(3));
    setTimerResetFlag((prev) => !prev);

    setEmailError("");
    setCreatePasswordError("");
    setErrors([]);

    let payloadObj = {
      name: userName,
      email: emailAddress,
      password: password,
    };
    dispatch(signUpAPI(payloadObj));
  };
  const handleValidateOtp = () => {
    let payloadObj = {
      name: userName,
      email: emailAddress,
      password: password,
      otp: otpValue,
      sign_up_flow: true,
    };
    // dispatch(validateOtpAPI(payloadObj));
    dispatch(createUserAPI(payloadObj));
  };
  const handlePaste = (e) => {
    let length = 6;
    e.preventDefault();
    const pastedData = e?.clipboardData?.getData("text").replace(/[^0-9]/g, "");
    if (!pastedData) return;

    const newOtp = [...otp];
    pastedData?.split("")?.forEach((digit, i) => {
      if (i < length) newOtp[i] = digit;

      newOtp[i] = digit;
      setOtp(newOtp);
      setotpValue(newOtp.join(""));
    });

    setOtp(newOtp);

    // Move focus to last filled field
    document
      .getElementById(`otp-input-${Math?.min(pastedData?.length, length) - 1}`)
      ?.focus();
  };
  // Step 3 End

  // Step 4 Start

  // Step 4 End

  // Step 5 Start
  const handleRedirectToDashboard = () => {
    navigate("/dashboard");
    dispatch(setRedirectToDashboard(false));
    dispatch(setSignUpStep(1));
  };
  // Step 5 End

  const steps = [
    {
      id: 2,
      title: "User Details",
      description: "Let's understand you better",
      icon_name: "user_details",
    },
    {
      id: 3,
      title: "Verification",
      description: "Just to keep your account secure",
      icon_name: "user_verification",
    },
    {
      id: 4,
      title: "Account Set Up",
      description: "Monitor companies that matter",
      icon_name: "user_account_set_up",
    },
  ];

  const navigateToLanding = () => {
    navigate("/");
    dispatch(setSignUpStep(1));
  };

  return (
    <div className="sign-up-main-container custom_scroll1">
      <div className="sign-up-parent-section">
        {signUpStep === 3 ? (
          ""
        ) : (
          <div className="sign-up-stepper-section sidebar">
            <h2
              className="sign-up-stepper-section-logo"
              onClick={navigateToLanding}
            >
              <img className="sign-up-logo-icon" src={NVlogo} />
              Analytics.AI
            </h2>
            <div className="stepper">
              {steps?.map((step, index) => (
                <div
                  key={step?.id}
                  className={`step ${signUpStep === step?.id ? "active" : ""}`}
                >
                  <div className="step-icon">
                    {getDynamicSvgIcons(
                      step?.icon_name,
                      signUpStep === step?.id ? "#1A1A1A" : "#94A3B8",
                      "24",
                      "24"
                    )}
                    {signUpStep > step?.id ? (
                      <div className="sign-up-stepper-section-checked-icon">
                        {getDynamicSvgIcons(
                          "green_check_circle",
                          "#4CAF50",
                          "16",
                          "16"
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="step-content">
                    <h3
                      className={`step-title ${
                        signUpStep === step?.id ? "active" : ""
                      }`}
                    >
                      {step?.title}
                    </h3>
                    <p
                      className={`step-description ${
                        signUpStep === step?.id ? "active" : ""
                      }`}
                    >
                      {step?.description}
                    </p>
                  </div>
                  {index !== steps?.length - 1 && (
                    <div className="step-line"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className="sign-up-right-section"
          style={{ display: signUpStep === 4 ? "block" : "" }}
        >
          {signUpStep === 1 ? (
            <div className="sign-up-pop-up">
              <p className="sign-up-heading">
                Welcome to Analytics.AI,{" "}
                <span className="sign-up-heading-bold">{userName}</span>
              </p>
              <Input
                // ref={userNameInput}
                className={`${
                  nameValidateError ? "sign-up-input-error" : "sign-up-input"
                }`}
                placeholder="Full Name"
                value={userName}
                onChange={(e) => handleChangeUserName(e)}
              />
              {nameValidateError ? (
                <p className="sign-up-validation-error">
                  {nameValidateError ? nameValidateError : ""}
                </p>
              ) : (
                ""
              )}
              <Input
                className={`${
                  emailError ? "sign-up-input-error" : "sign-up-input"
                }`}
                placeholder="Work Email ID"
                value={emailAddress}
                onChange={(e) => handleChangeEmailAddress(e)}
              />
              {emailError ? (
                <p className="sign-up-validation-error">
                  {emailError ? emailError : ""}
                </p>
              ) : (
                ""
              )}
              <Input.Password
                value={password}
                onChange={(e) => handleChangePassword(e)}
                className={`${
                  createPasswordError
                    ? "sign-in-password-input-error"
                    : "sign-in-password-input"
                }`}
                placeholder="Set Password"
                iconRender={(visible) =>
                  password && visible ? (
                    <EyeTwoTone
                      style={{ color: "#6a6a6a" }}
                      className="password-show-icon"
                    />
                  ) : (
                    password && (
                      <EyeInvisibleOutlined
                        style={{ color: "#6a6a6a" }}
                        className="password-show-icon"
                      />
                    )
                  )
                }
              />
              <Input.Password
                value={confirmPassword}
                onChange={(e) => handleChangeConfirmPassword(e)}
                className={`${
                  createPasswordError
                    ? "sign-in-password-input-error"
                    : "sign-in-password-input"
                }`}
                placeholder="Re-enter Password"
                iconRender={(visible) =>
                  confirmPassword && visible ? (
                    <EyeTwoTone
                      style={{ color: "#6a6a6a" }}
                      className="password-show-icon"
                    />
                  ) : (
                    confirmPassword && (
                      <EyeInvisibleOutlined
                        style={{ color: "#6a6a6a" }}
                        className="password-show-icon"
                      />
                    )
                  )
                }
              />
              {createPasswordError ? (
                <p className="sign-up-validation-error">
                  {createPasswordError ? createPasswordError : ""}
                </p>
              ) : (
                ""
              )}
              {errors?.length ? (
                <ul className="password-validation-error-parent">
                  {errors?.map((error, index) => (
                    <div className="d-flex">
                      <img src={incorrectPasswordIcon} />{" "}
                      <li className="password-validation-error" key={index}>
                        {error}
                      </li>
                    </div>
                  ))}
                </ul>
              ) : (
                ""
              )}
              <Button
                disabled={
                  !emailAddress || !password || !confirmPassword
                    ? true
                    : signUpLoader
                    ? true
                    : false
                }
                className="sign_up_dark_btn"
                onClick={verifyEmailIdApiCall}
                loading={signUpLoader ? true : false}
              >
                Verify Email ID
              </Button>
              <p className="sign-up-para-text">
                Already have an account?{" "}
                <b
                  onClick={handleSignInPage}
                  className="sign-up-para-text-link"
                >
                  Sign in
                </b>
              </p>
            </div>
          ) : signUpStep === 2 ? (
            <div className="sign-up-pop-up">
              <p className="sign-up-heading">Verify Email ID</p>
              <p className="sign-up-sub-heading">
                6 digit OTP sent on your email <b>{emailAddress}, </b>
                please check your email.
              </p>
              <div className="otpinput-container">
                {otp?.map((digit, index) => (
                  <input
                    key={index}
                    type="number"
                    id={`otp-input-${index}`}
                    value={digit}
                    onChange={(e) => handleChangeOtpValue(e, index)}
                    onKeyDown={(e) => handleChangeOtpValue(e, index)}
                    maxLength={1}
                    className="otpinput"
                    autoFocus={index === 0}
                    onPaste={handlePaste}
                  />
                ))}
              </div>
              <br />

              <div className="re-send-otp_btn_container">
                <div className="re-send-otp_timer">
                  <span className="re-send-otp_timer-text">
                    OTP will expire in
                  </span>{" "}
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </div>
                <div
                  className={`${
                    minutes === 0 && seconds === 0
                      ? "re-send-otp_btn"
                      : signUpLoader
                      ? "re-send-otp_btn_disabled"
                      : "re-send-otp_btn_disabled"
                  }`}
                  onClick={minutes === 0 && seconds === 0 && handleResendOTP}
                >
                  Resend OTP
                </div>
              </div>

              {verifiedOtpFlag ? (
                <Button className="sign_up_verified_btn">
                  <img
                    src={otpVerifiedCheckIcon}
                    style={{ marginRight: "10px" }}
                  />
                  Verified
                </Button>
              ) : (
                <Button
                  disabled={!otpValue ? true : otpValidateLoader ? true : false}
                  className="sign_up_dark_btn"
                  onClick={handleValidateOtp}
                  loading={otpValidateLoader ? true : false}
                >
                  Verify OTP
                </Button>
              )}
            </div>
          ) : signUpStep === 3 ? (
            <div className="sign-up-pop-up">
              <DotLottieReact
                className="sign-in-pop-up-img"
                src="https://lottie.host/00eb3559-3fae-45ad-a466-2557e58d202a/JvyJlpY8DR.lottie"
                loop
                autoplay
              />
              <p className="sign-in-heading">
                Your account created successfully! 🚀{" "}
              </p>
              <p className="sign-up-sub-heading">
                Click below to redirect to dashboard if you’re not launched to
                the page within 10 seconds
              </p>
              <Button
                disabled={signUpLoader ? true : false}
                className="sign_up_dark_btn"
                onClick={handleRedirectToDashboard}
                loading={signUpLoader ? true : false}
              >
                Go to dashboard
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
