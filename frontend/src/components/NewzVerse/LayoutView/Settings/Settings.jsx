import React, { useState } from "react";
import AccountSetup from "../../Pages/AccountSetup";
import { Layout, Menu } from "antd";

const { Sider, Content } = Layout;

const settingsList = [
  {
    id: 1,
    name: "Account Set Up",
  },
  {
    id: 2,
    name: "Timeline & Activity",
  },
  {
    id: 3,
    name: "Alert Manager",
  },
  {
    id: 4,
    name: "Plans & Pricing",
  },
];

const Settings = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Account Set Up");

  const handleSelectedMenuItem = (key) => {
    setSelectedMenuItem(key);
  };

  return (
    <Layout
      style={{ minHeight: "100vh", marginTop: "60px", background: "red" }}
    >
      {/* Left Sidebar */}
      <Sider
        width={200}
        theme="light"
        style={{
          borderRight: "1px solid #EDF2F6",
          marginLeft: "80px",
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          style={{ height: "100%", borderRight: 0, borderRightColor: "red" }}
          onSelect={({ key }) => {
            handleSelectedMenuItem(key);
          }}
        >
          {settingsList?.map((item) => (
            <Menu.Item
              style={{
                height: "35px",
                fontWeight: selectedMenuItem === item?.name ? "500" : "",
                color: selectedMenuItem === item?.name ? "black" : "",
                background:
                  selectedMenuItem === item?.name
                    ? item?.primary_color_code
                    : "",
                borderRight:
                  selectedMenuItem === item?.name ? `3px solid black` : "",
              }}
              key={item?.name}
            >
              {item?.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout>
        <Content
          style={{
            padding: "24px",
            marginLeft: "200px",
            background: "#fff",
          }}
        >
          {selectedMenuItem === "Account Set Up" ? (
            <AccountSetup />
          ) : (
            selectedMenuItem
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Settings;
