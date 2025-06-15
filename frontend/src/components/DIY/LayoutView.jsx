import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import DraggableTabs from "./DraggableTabs";
import "./LayoutView.css";
// import AnalyticsView from "./AnalyticsView";
// import DeepDive2 from "./DeepDive/DeepDive2";
// import DeepDive3 from "./DeepDive/DeepDive3";
// import { CuratedNewsView } from "./Dashboard/CuratedNewsView";
// import { HighVelocityViewAll } from "./Dashboard/HighVelocityViewAll";
// import DeepDiveAnalytics from "./DeepDive/DeepDiveAnalytics";
// import Settings from "./Settings/Settings";

const { Content } = Layout;

const LayoutView = () => {
  let dashboardDeepDiveLevel = 1; // Hardcoded for now, replace with actual logic

  const [selectedMenu, setSelectedMenu] = useState("1");

  const handleMenuSelect = (key) => {
    setSelectedMenu(key);
  };

  return (
    <div>
      {/* <TopNavbar /> */}
      {dashboardDeepDiveLevel === 1 ? (
        <>
          <Layout style={{ minHeight: "100vh" }}>
            <Sidebar
              onMenuSelect={handleMenuSelect}
              selectedMenu={selectedMenu}
            />
            <Layout
              className="site-layout custom_scrollbar"
              style={{ marginLeft: 80, marginTop: 0 }}
              id="style-1"
            >
              <Content style={{ overflow: "initial" }}>
                {selectedMenu === "1" ? (
                  <DraggableTabs />
                ) : selectedMenu === "2" ? (
                  "Analytics"
                ) : selectedMenu === "3" ? (
                  "Settings"
                ) : selectedMenu === "4" ? (
                  "Profile"
                ) : (
                  ""
                )}
              </Content>
            </Layout>
          </Layout>
        </>
      ) : (
        "No Page Found"
      )}
    </div>
  );
};

export default LayoutView;
