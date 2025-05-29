import React, { useEffect, useRef, useState } from "react";
import { Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./pages.css";
import { validatePassword } from "../../../redux/constants";
import incorrectPasswordIcon from "../../../assets/incorrect-password-icon.svg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { setChangePasswordStep } from "../../../redux/actions/NewzVerse/NewzVerse";
import {
  changePasswordAPI,
  generateOtpAPI,
  setPasswordAPI,
  signInAPI,
  validateChangePasswordAPI,
  validateOtpAPI,
} from "../../../redux/actions/NewzVerse/NewzVerseAPI";
import NVlogo from "../../../assets/Pages/sign_up_logo.svg";
import { getDynamicSvgIcons } from "../../../redux/constants/NewzVerseConst";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInput = useRef(null);
  const mailInput = useRef(null);

  // Newz
  const changePasswordStep = useSelector(
    (state) => state?.NewzVerse?.change_password_step
  );

  const [emailAddress, setEmailAddress] = useState(null);
  const [emailError, setEmailError] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpValue, setotpValue] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [minutes, setMinutes] = React.useState(4);
  const [seconds, setSeconds] = React.useState(59);

  const [createPasswordError, setCreatePasswordError] = useState("");
  const [oldPassword, setOldPassword] = useState(null);
  const [password, setPassword] = useState(null);

  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errors, setErrors] = useState([]);

  let p_token = localStorage.getItem("p_token");

  // Timer useEffect
  useEffect(() => {
    if (changePasswordStep !== 2) return; // Only start the timer when changePasswordStep is 3

    const myInterval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          setMinutes((prevMinutes) => {
            if (prevMinutes === 0) {
              clearInterval(myInterval); // Stop when timer reaches 0:00
              return 0;
            }
            return prevMinutes - 1;
          });
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(myInterval);
  }, [changePasswordStep]);

  useEffect(() => {
    if (changePasswordStep === 1) {
      userInput?.current?.focus();
    }

    if (changePasswordStep === 2) {
      mailInput?.current?.focus();
    }
  }, [changePasswordStep]);

  // Step 1
  const handleChangeOldPassword = (e) => {
    setOldPassword(e?.target?.value);
    setPasswordError(null);
  };
  const handleChangePassword = (e) => {
    const newPassword = e.target.value?.trim();
    setPassword(newPassword);
    setErrors(validatePassword(newPassword));
    setCreatePasswordError(null);
    setPasswordError(null);
  };
  const handleChangeConfirmPassword = (e) => {
    const newPassword = e.target.value?.trim();
    setConfirmPassword(newPassword);
    setErrors(validatePassword(newPassword));
    setCreatePasswordError(null);
    setPasswordError(null);
  };
  const handleCreateNewPassword = (event) => {
    if (oldPassword === "" || oldPassword === null) {
      setCreatePasswordError("Enter your old password.");
    } else if (
      password === "" ||
      password === null ||
      confirmPassword === "" ||
      confirmPassword === null
    ) {
      setCreatePasswordError("Enter your password.");
    } else if (password === confirmPassword) {
      setCreatePasswordError("");
      let obj = {
        old_password: oldPassword,
        new_password: password,
        p_token: p_token ? p_token : null,
        current_password: null,
      };
      // dispatch(changePasswordAPI(obj));
    } else {
      setCreatePasswordError("Password does not match.");
    }

    // temp
    dispatch(setChangePasswordStep(2));
  };
  // Step 2
  const handleValidateOtp = () => {
    let obj = {
      email: emailAddress,
      otp: otpValue,
    };
    // dispatch(validateChangePasswordAPI(obj));

    // temp
    dispatch(setChangePasswordStep(3));
  };
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
    dispatch(setChangePasswordStep(3));
  };
  const handleResendOTP = (event) => {
    handleSignUpApiCall(event);
    setMinutes(4);
    setSeconds(59);
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
  // Step 3
  const handleRedirectToSignIn = () => {
    navigate("/sign-in");
  };

  const steps = [
    {
      id: 1,
      title: "Change Password",
      description: "Create a Unique Password",
      icon_name: "user_reset_password",
    },
    {
      id: 2,
      title: "Verification",
      description: "Verify using your OTP",
      icon_name: "user_verification",
    },
    {
      id: 3,
      title: "Let’s Sign In Again!",
      description: "Access Your Account Again!",
      icon_name: "user_email",
    },
  ];

  const navigateToLanding = () => {
    navigate("/");
    dispatch(setChangePasswordStep(1));
  };

  return (
    <div className="sign-up-main-container custom_scroll1">
      <div className="sign-up-parent-section">
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
                className={`step ${
                  changePasswordStep === step?.id ? "active" : ""
                }`}
              >
                <div className="step-icon">
                  {getDynamicSvgIcons(
                    step?.icon_name,
                    changePasswordStep === step?.id ? "#1A1A1A" : "#94A3B8",
                    "24",
                    "24"
                  )}
                  {changePasswordStep > step?.id ? (
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
                      changePasswordStep === step?.id ? "active" : ""
                    }`}
                  >
                    {step?.title}
                  </h3>
                  <p
                    className={`step-description ${
                      changePasswordStep === step?.id ? "active" : ""
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

        <div className="sign-up-right-section">
          {changePasswordStep === 1 ? (
            <div className="sign-in-pop-up">
              <p className="sign-up-heading">Change Password</p>
              <p className="sign-up-sub-heading">
                Reset the password for your registered e-mail id
                mark.zen@amazon.com
              </p>
              <Input.Password
                value={oldPassword}
                onChange={(e) => handleChangeOldPassword(e)}
                className="sign-in-password-input"
                placeholder="Old Password"
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
                value={password}
                onChange={(e) => handleChangePassword(e)}
                className="sign-in-password-input"
                placeholder="New Password"
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
                disabled={signUpLoader ? true : false}
                className="sign_up_dark_btn"
                onClick={handleCreateNewPassword}
                loading={signUpLoader ? true : false}
              >
                Create Password
              </Button>
            </div>
          ) : changePasswordStep === 2 ? (
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
                <div className="re-send-otp_timer">
                  <span className="re-send-otp_timer-text">
                    OTP will expire in
                  </span>{" "}
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </div>
              </div>
              <Button
                disabled={!otpValue ? true : otpValidateLoader ? true : false}
                className="sign_up_dark_btn"
                onClick={handleValidateOtp}
                loading={otpValidateLoader ? true : false}
              >
                Verify OTP
              </Button>
            </div>
          ) : changePasswordStep === 3 ? (
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

export default ChangePassword;
