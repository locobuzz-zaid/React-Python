import React, { useEffect, useRef, useState } from "react";
import { Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./pages.css";
import { validatePassword } from "../../../redux/constants";
import incorrectPasswordIcon from "../../../assets/incorrect-password-icon.svg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  setRedirectToSignIn,
  setSignInStep,
} from "../../../redux/actions/NewzVerse/NewzVerse";
import {
  createUserAPI,
  generateOtpAPI,
  setPasswordAPI,
  signInAPI,
  signUpAPI,
  validateOtpAPI,
} from "../../../redux/actions/NewzVerse/NewzVerseAPI";
import NVlogo from "../../../assets/Pages/sign_up_logo.svg";
import { getDynamicSvgIcons } from "../../../redux/constants/NewzVerseConst";
import otpVerifiedCheckIcon from "../../../assets/Pages/otp_verified_check_icon.svg";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInput = useRef(null);
  const mailInput = useRef(null);

  const signUpLoader = useSelector((state) => state?.NewzVerse?.sign_up_loader);
  const otpValidateLoader = useSelector(
    (state) => state?.NewzVerse?.otp_validate_loader
  );
  const verifiedOtpFlag = useSelector(
    (state) => state?.NewzVerse?.verified_otp_flag
  );
  const redirectToSignIn = useSelector(
    (state) => state?.NewzVerse?.redirect_to_sign_in
  );

  // Newz
  const signInStep = useSelector((state) => state?.NewzVerse?.sign_in_step);

  const [emailAddress, setEmailAddress] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [userPasswordError, setUserPasswordError] = useState(null);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpValue, setotpValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [minutes, setMinutes] = React.useState(4);
  const [seconds, setSeconds] = React.useState(59);
  const [timerResetFlag, setTimerResetFlag] = useState(false);

  const [createPasswordError, setCreatePasswordError] = useState("");
  const [password, setPassword] = useState(null);

  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errors, setErrors] = useState([]);

  let tmp_token = localStorage.getItem("tmp_token");

  // Redirect to dashboard
  useEffect(() => {
    if (redirectToSignIn) {
      setTimeout(() => {
        dispatch(setSignInStep(1));
        dispatch(setRedirectToSignIn(false));

        setEmailAddress(null);
        setUserPassword(null);
        setConfirmPassword(null);
        setPassword(null);
        setotpValue(null);
        setOtp(["", "", "", "", "", ""]);

        setCreatePasswordError(null);
        setEmailError(null);
      }, 8000);
    }
  }, [redirectToSignIn]);

  // Timer useEffect
  useEffect(() => {
    if (signInStep !== 3) return;

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
  }, [signInStep, timerResetFlag]);

  useEffect(() => {
    if (signInStep === 1) {
      userInput?.current?.focus();
    }

    if (signInStep === 2) {
      mailInput?.current?.focus();
    }
  }, [signInStep]);

  const handleChangeUserId = (e) => {
    setEmailAddress(e?.target?.value);
    setEmailError("");
  };

  const handleChangeUserPassword = (e) => {
    setUserPassword(e?.target?.value);
    setUserPasswordError(null);
  };

  const handleUserSignInApiCall = async (event) => {
    if (event.key === "Enter" || event.key === undefined) {
      const isValidEmail =
        /^(?!.*\.\.)[a-zA-Z\d](?:[\w.-]*[a-zA-Z\d])?@[a-zA-Z\d-]+(\.[a-zA-Z]{2,})+$/;
      if (emailAddress === "" || emailAddress === null) {
        setEmailError("Enter your work email id.");
      } else if (userPassword === "" || userPassword === null) {
        setUserPasswordError("Enter your password.");
      } else if (
        emailAddress &&
        emailAddress.match(isValidEmail) &&
        userPassword
      ) {
        setEmailError("");
        let obj = {
          name: "DOM",
          email: emailAddress,
          password: userPassword,
        };

        // dispatch(signInAPI(obj));
        dispatch(createUserAPI(obj));
      } else {
        setEmailError("Looks like an invalid email.");
      }
    }
  };

  const handleForgotPassword = () => {
    dispatch(setSignInStep(2));
    setEmailError(null);
    setEmailAddress(null);
  };

  const handleSignUpPage = () => {
    navigate("/sign-up");
  };

  // OTP FLOW START
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

  // Step 3
  const handleValidateOtp = () => {
    let obj = {
      email: emailAddress,
      otp: otpValue,
      forgot_password_flow: true,
    };
    dispatch(validateOtpAPI(obj));
  };

  const handleSignUpApiCall = (event) => {
    if (event.key === "Enter" || event.key === undefined) {
      const isValidEmail =
        /^(?!.*\.\.)[a-zA-Z\d](?:[\w.-]*[a-zA-Z\d])?@[a-zA-Z\d-]+(\.[a-zA-Z]{2,})+$/;

      if (emailAddress === "" || emailAddress === null) {
        setEmailError("Enter your work email id.");
      } else if (emailAddress && emailAddress.match(isValidEmail)) {
        setEmailError("");

        let obj = {
          email: emailAddress,
        };
        dispatch(generateOtpAPI(obj));
      } else {
        setEmailError("Looks like an invalid email.");
      }
    }
  };

  const handleResendOTP = (event) => {
    setMinutes(4);
    setSeconds(59);
    dispatch(setSignInStep(3));
    setTimerResetFlag((prev) => !prev);

    setEmailError("");
    setCreatePasswordError("");
    setErrors([]);

    let obj = {
      email: emailAddress,
    };
    dispatch(generateOtpAPI(obj));
  };

  const handleBack = () => {
    if (signInStep === 2) {
      setEmailAddress(null);
      setUserPassword(null);
      setUserPasswordError(null);
      dispatch(setSignInStep(signInStep - 1));
    } else {
      dispatch(setSignInStep(signInStep - 1));
    }
  };

  const handleChangeEmailAddress = (e) => {
    setEmailAddress(e?.target?.value);
    setEmailError("");
  };

  const handleChangePassword = (e) => {
    const newPassword = e?.target?.value?.trim();
    setPassword(newPassword);
    setErrors(validatePassword(newPassword));
    setCreatePasswordError(null);
    setPasswordError(null);
  };
  const handleChangeConfirmPassword = (e) => {
    const newPassword = e?.target?.value?.trim();
    setConfirmPassword(newPassword);
    setErrors(validatePassword(newPassword));
    setCreatePasswordError(null);
    setPasswordError(null);
  };

  // Step 4
  const handleCreateNewPassword = (event) => {
    if (password === "" || confirmPassword === null) {
      setCreatePasswordError("Enter your password.");
    } else if (password === confirmPassword) {
      setCreatePasswordError("");
      let obj = {
        password: password,
        tmp_token: tmp_token ? tmp_token : null,
        current_password: null,
      };
      dispatch(setPasswordAPI(obj));
    } else {
      setCreatePasswordError("Password does not match.");
    }
  };

  const handleRedirectToSignIn = () => {
    dispatch(setSignInStep(1));
    dispatch(setRedirectToSignIn(false));

    setEmailAddress(null);
    setUserPassword(null);
    setConfirmPassword(null);
    setPassword(null);
    setotpValue(null);
    setOtp(["", "", "", "", "", ""]);

    setCreatePasswordError(null);
    setEmailError(null);
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

  const steps = [
    {
      id: 2,
      title: "Your email ID",
      description: "Drop your email here!",
      icon_name: "user_email",
    },
    {
      id: 3,
      title: "Verification",
      description: "Verify using your OTP",
      icon_name: "user_verification",
    },
    {
      id: 4,
      title: "Reset Password",
      description: "Reset password & you’re good to go!",
      icon_name: "user_reset_password",
    },
  ];

  const navigateToLanding = () => {
    navigate("/");
    dispatch(setSignInStep(1));
  };

  return (
    <div className="sign-up-main-container custom_scroll1">
      <div className="sign-up-parent-section">
        {signInStep === 5 ? (
          ""
        ) : signInStep === 1 ? (
          <div className="sign-up-left-section">
            <div className="sign-up-logo" onClick={navigateToLanding}>
              <img className="sign-up-logo-icon" src={NVlogo} />
              NewzVerse
            </div>
            <div className="sign-up-left-section-content">
              <h1>
                Reducing the <br />
                <span className="sign-up-left-section-bold">NOISE</span>
                <span className="sign-up-star-img">
                  {getDynamicSvgIcons(
                    "sign_up_star_icon",
                    "#1A1A1A",
                    "65",
                    "65"
                  )}
                </span>
              </h1>
              <p>
                Track and Analyze real-time News from Twitter, LinkedIn, and
                Media Houses — so you can focus on what truly matters.
              </p>
            </div>
          </div>
        ) : (
          <div className="sign-up-stepper-section sidebar">
            <h2
              className="sign-up-stepper-section-logo"
              onClick={navigateToLanding}
            >
              <img className="sign-up-logo-icon" src={NVlogo} />
              NewzVerse
            </h2>
            <div className="stepper">
              {steps?.map((step, index) => (
                <div
                  key={step?.id}
                  className={`step ${signInStep === step?.id ? "active" : ""}`}
                >
                  <div className="step-icon">
                    {getDynamicSvgIcons(
                      step?.icon_name,
                      signInStep === step?.id ? "#1A1A1A" : "#94A3B8",
                      "24",
                      "24"
                    )}
                    {signInStep > step?.id ? (
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
                        signInStep === step?.id ? "active" : ""
                      }`}
                    >
                      {step?.title}
                    </h3>
                    <p
                      className={`step-description ${
                        signInStep === step?.id ? "active" : ""
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

        <div className="sign-up-right-section">
          {/* {signInStep !== 1 && (
            <div className="sign-up-nav">
              {signInStep > 1 && (
                <button onClick={handleBack} className="sign-up-back-button">
                  {getDynamicSvgIcons("user_back_button", "#000", "24", "24")}{" "}
                  Back
                </button>
              )}
            </div>
          )} */}

          {signInStep === 1 ? (
            <div className="sign-in-pop-up">
              <p className="sign-up-heading">Welcome back! Sign in</p>
              <Input
                // ref={userInput}
                className={`${
                  emailError ? "sign-up-input-error" : "sign-up-input"
                }`}
                placeholder="Work Email ID"
                value={emailAddress}
                onChange={(e) => handleChangeUserId(e)}
              />
              {emailError ? (
                <p className="sign-up-validation-error">
                  {emailError ? emailError : ""}
                </p>
              ) : (
                ""
              )}
              <Input.Password
                value={userPassword}
                onChange={(e) => handleChangeUserPassword(e)}
                className={`${
                  userPasswordError
                    ? "sign-in-password-input-error"
                    : "sign-in-password-input"
                }`}
                placeholder="Password"
                iconRender={(visible) =>
                  userPassword && visible ? (
                    <EyeTwoTone
                      style={{ color: "#6a6a6a" }}
                      className="password-show-icon"
                    />
                  ) : (
                    userPassword && (
                      <EyeInvisibleOutlined
                        style={{ color: "#6a6a6a" }}
                        className="password-show-icon"
                      />
                    )
                  )
                }
                onKeyDown={(e) => handleUserSignInApiCall(e)}
              />
              {userPasswordError ? (
                <p className="sign-up-validation-error">
                  {userPasswordError ? userPasswordError : ""}
                </p>
              ) : (
                ""
              )}
              <p
                onClick={handleForgotPassword}
                className="sign-in-forgot-password-text"
              >
                Forgot password
              </p>

              <Button
                disabled={signUpLoader ? true : false}
                loading={signUpLoader ? true : false}
                className="sign_up_dark_btn"
                onClick={handleUserSignInApiCall}
              >
                Sign In
              </Button>
              <p className="sign-up-para-text">
                Don't have an account yet?{" "}
                <b
                  onClick={handleSignUpPage}
                  className="sign-up-para-text-link"
                >
                  Sign up
                </b>
              </p>
            </div>
          ) : signInStep === 2 ? (
            <div className="sign-in-pop-up">
              <p className="sign-up-heading">Forgot password</p>
              <p className="sign-up-sub-heading">
                Please enter your email ID to verify and reset your password.
              </p>
              <Input
                // ref={mailInput}
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
              <Button
                disabled={!emailAddress ? true : signUpLoader ? true : false}
                className="sign_up_dark_btn"
                onClick={handleSignUpApiCall}
                loading={signUpLoader ? true : false}
              >
                Verify Email ID
              </Button>
            </div>
          ) : signInStep === 3 ? (
            <div className="sign-in-pop-up">
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
          ) : signInStep === 4 ? (
            <div className="sign-in-pop-up">
              <p className="sign-up-heading">Set New Password</p>
              <Input
                disabled={true}
                className="sign-up-input"
                placeholder="Work Email ID"
                value={emailAddress}
              />
              <Input.Password
                value={password}
                onChange={(e) => handleChangePassword(e)}
                className="sign-in-password-input"
                placeholder="Enter Password"
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
                className="sign-in-password-input"
                placeholder="Confirm Password"
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
                disabled={signUpLoader ? true : false}
                className="sign_up_dark_btn"
                onClick={handleCreateNewPassword}
                loading={signUpLoader ? true : false}
              >
                Create Password
              </Button>
            </div>
          ) : signInStep === 5 ? (
            <div className="sign-in-pop-up">
              <DotLottieReact
                className="sign-in-pop-up-img"
                src="https://lottie.host/00eb3559-3fae-45ad-a466-2557e58d202a/JvyJlpY8DR.lottie"
                loop
                autoplay
              />
              <p className="sign-in-heading">
                Your Password is reset successfully! 🚀{" "}
              </p>
              <p className="sign-up-sub-heading">
                Click below to login if you’re not launched to the page within
                10 seconds
              </p>
              <Button
                disabled={signUpLoader ? true : false}
                className="sign_up_dark_btn"
                onClick={handleRedirectToSignIn}
                loading={signUpLoader ? true : false}
              >
                Didn’t launch? Click here
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

export default SignIn;
