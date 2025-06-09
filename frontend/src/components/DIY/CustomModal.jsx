import React, { useEffect, useState } from "react";
import { Button, Checkbox, message, Modal, Select } from "antd";
import { useNavigate } from "react-router-dom";

const CustomModal = ({ isModalOpen, setLogoutModal }) => {
  const navigate = useNavigate();

  const handleOk = () => {
    setLogoutModal(false);
    localStorage.clear();

    navigate("/");
  };

  const handleCancel = () => {
    setLogoutModal(false);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        title="Log out?"
        onOk={handleOk}
        onCancel={handleCancel}
        className="custom-modal-logout"
        footer={[
          <Button key="back" onClick={handleCancel}>
            No
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Yes
          </Button>,
        ]}
      >
        Are you sure you want to log out?
      </Modal>
    </>
  );
};
export default CustomModal;
