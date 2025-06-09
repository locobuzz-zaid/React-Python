import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CustomModal from "./CustomModal";

const { Sider } = Layout;

const Sidebar = ({ onMenuSelect, selectedMenu }) => {
  const navigate = useNavigate();

  const [logoutModal, setLogoutModal] = useState(false);

  // const handleLogoutUser = () => {
  //   localStorage.clear();
  //   navigate("/");
  // };

  const handleLogoutUser = () => {
    setLogoutModal(true);
  };

  return (
    <>
      <Sider
        theme="light"
        width={80}
        className="dashboard-left-sidebar-container"
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          style={{ flex: 1, overflow: "hidden", borderRight: 0 }} // Prevents scrollbar
          onSelect={({ key }) => onMenuSelect(key)}
        >
          <Menu.Item
            className="sidebar-menu-item"
            key="1"
            icon={<AppstoreOutlined className="sidebar-menu-item-icon" />}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            className="sidebar-menu-item"
            key="2"
            icon={<BarChartOutlined className="sidebar-menu-item-icon" />}
          >
            Analytics
          </Menu.Item>
          <Menu.Item
            className="sidebar-menu-item"
            key="3"
            icon={<SettingOutlined className="sidebar-menu-item-icon" />}
          >
            Settings
          </Menu.Item>
          <Menu.Item
            className="sidebar-menu-item"
            key="4"
            icon={<UserOutlined className="sidebar-menu-item-icon" />}
          >
            Profile
          </Menu.Item>
        </Menu>
        {/* Logout button at the bottom */}
        <div
          style={{
            borderTop: "1px solid #EDF2F6",
            padding: "10px 0",
            position: "absolute",
            bottom: "10px",
            left: "5px",
          }}
        >
          <Menu mode="inline" selectable={false} style={{ borderRight: 0 }}>
            <Menu.Item
              style={{ marginTop: "10px" }}
              onClick={handleLogoutUser}
              className="sidebar-menu-item"
              key="5"
              icon={<LogoutOutlined />}
            >
              Logout
            </Menu.Item>
          </Menu>
        </div>
      </Sider>

      {logoutModal ? (
        <CustomModal
          isModalOpen={logoutModal}
          setLogoutModal={setLogoutModal}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Sidebar;
