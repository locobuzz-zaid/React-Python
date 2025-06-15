import React, { useEffect, useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Navbar from "./components/NewzVerse/Landing/Navbar";
import { useLocation } from "react-router-dom";
import FeedbackButton from "./FeedbackButton";

const LandingPage = React.lazy(() =>
  import("./components/NewzVerse/Landing/Landing")
);
const SignUp = React.lazy(() => import("./components/NewzVerse/Pages/SignUp"));
const SignIn = React.lazy(() => import("./components/NewzVerse/Pages/SignIn"));
const ChangePassword = React.lazy(() =>
  import("./components/NewzVerse/Pages/ChangePassword")
);
const LayoutView = React.lazy(() =>
  import("./components/NewzVerse/LayoutView/LayoutView")
);
const MainPage = React.lazy(() => import("./components/ExcelData/index"));
const Notes = React.lazy(() => import("./components/Notes/Notes"));
const DIY = React.lazy(() => import("./components/DIY/LayoutView"));

const PathRoutes = () => {
  const navigate = useNavigate(); 
  const location = useLocation();

  let p_token = localStorage.getItem("p_token");
  const [isShowChatHistorySidebar, setIsShowChatHistorySidebar] = useState(
    p_token && p_token !== null ? true : false
  );
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (location.pathname === "/") {
      // Reset Chat Response
     
    } else if (location.pathname === "/sign-up") {
      document.body.style.overflow = "hidden";
    } else if (location.pathname === "/chat-with-data") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup function to reset overflow when component unmounts or path changes
    return () => {
      document.body.style.overflow = "";
    };
  }, [location.pathname]);

  // Redirect to landing page, if not logged in and try to change path
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/");
    } else if (!p_token && location.pathname === "/excel-upload") {
      navigate("/excel-upload");
    } else if (!p_token && location.pathname === "/sign-in") {
      navigate("/sign-in");
    } else if (!p_token && location.pathname === "/sign-up") {
      // Do Nothing, otherwise data reset
    } else if (!p_token && location.pathname === "/change-password") {
      // Do Nothing, otherwise data reset
    } else if (!p_token && location.pathname === "/dashboard") {
      navigate("/");
    } else if (location.pathname === "/diy") {
      navigate("/diy");
    } else if (p_token && location.pathname === "/dashboard") {
      navigate("/dashboard");
    } else if (p_token && location.pathname === "/notes") {
      navigate("/notes");
    } else {
      navigate("/");
    }
  }, [location.pathname]);

  return (
    <>
      {location.pathname === "/" ? (
        <Navbar
          isShowSidebar={isShowSidebar}
          setIsShowSidebar={setIsShowSidebar}
          isShowChatHistorySidebar={isShowChatHistorySidebar}
          setIsShowChatHistorySidebar={setIsShowChatHistorySidebar}
          text={text}
          setText={setText}
        />
      ) : (
        ""
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <div className="suspense-loader-container">
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              }
            >
              <ErrorBoundary>
                <LandingPage />
              </ErrorBoundary>
            </Suspense>
          }
        />

        <Route
          path="/sign-up"
          element={
            <Suspense
              fallback={
                <div className="suspense-loader-container">
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              }
            >
              <ErrorBoundary>
                <SignUp />
              </ErrorBoundary>
            </Suspense>
          }
        />

        <Route
          path="/sign-in"
          element={
            <Suspense
              fallback={
                <div className="suspense-loader-container">
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              }
            >
              <ErrorBoundary>
                <SignIn />
              </ErrorBoundary>
            </Suspense>
          }
        />

        <Route
          path="/change-password"
          element={
            <Suspense
              fallback={
                <div className="suspense-loader-container">
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              }
            >
              <ErrorBoundary>
                <ChangePassword />
              </ErrorBoundary>
            </Suspense>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Suspense
              fallback={
                <div className="suspense-loader-container">
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              }
            >
              <ErrorBoundary>
                <LayoutView />
              </ErrorBoundary>
            </Suspense>
          }
        />

        {/* Excel Upload */}
        <Route
          path="/excel-upload"
          element={
            <Suspense
              fallback={
                <div className="suspense-loader-container">
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              }
            >
              <ErrorBoundary>
                <MainPage />
              </ErrorBoundary>
            </Suspense>
          }
        />

        {/* DIY */}
        <Route
          path="/diy"
          element={
            <Suspense
              fallback={
                <div className="suspense-loader-container">
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              }
            >
              <ErrorBoundary>
                <DIY />
              </ErrorBoundary>
            </Suspense>
          }
        />

        {/* Notes */}
        <Route
          path="/notes"
          element={
            <Suspense
              fallback={
                <div className="suspense-loader-container">
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              }
            >
              <ErrorBoundary>
                <Notes />
              </ErrorBoundary>
            </Suspense>
          }
        />
      </Routes>

      <FeedbackButton />
    </>
  );
};

export default PathRoutes;
