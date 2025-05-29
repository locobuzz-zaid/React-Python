import React from "react";
import { Layout, Button, Row, Col, Tooltip } from "antd";
import { SearchOutlined, UsergroupAddOutlined } from "@ant-design/icons";

const { Header } = Layout;

const TopNavbar = () => {
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
        background: "#000000",
        zIndex: "9999",
        position: "fixed",
      }}
    >
      <Row justify="space-between" align="middle" style={{ height: "100%" }}>
        <Col span={8}>
          <div className="logo-header">
            <div className="logo-square">NV</div>
            <span className="logo-text">NewzVerse</span>
          </div>
        </Col>
        <Col span={8} style={{ textAlign: "right", paddingRight: 24 }}>
          {/* <SearchOutlined
            style={{ fontSize: "24px", color: "#fff", marginRight: 16 }}
          /> */}
          <Tooltip title="Invite Member" placement="bottom">
            <UsergroupAddOutlined
              style={{
                cursor: "pointer",
                fontSize: "24px",
                color: "#fff",
                marginRight: 16,
              }}
            />
          </Tooltip>
          <Tooltip title="Coming Soon" placement="bottom">
            <Button type="text" style={{ color: "#fff", fontWeight: "bold" }}>
              Plan & Pricing
            </Button>
          </Tooltip>
        </Col>
      </Row>
    </Header>
  );
};

export default TopNavbar;
