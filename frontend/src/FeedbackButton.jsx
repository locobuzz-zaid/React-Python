import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, Upload } from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setToolFeedbackAPI } from "./redux/actions/NewzVerse/NewzVerseAPI";

const { TextArea } = Input;
const { Option } = Select;

const FeedbackButton = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);

  const handleCancel = () => setIsModalOpen(false);

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        // console.log("Form", values);
        const file = values.image?.fileList?.[0]?.originFileObj;

        // if (!file) {
        //   console.log("Please upload an image.");
        //   return;
        // }

        // Convert image to base64
        const getBase64 = (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });
        const base64Image = await getBase64(file);

        const payloadObj = {
          module: values.module,
          priority: values.priority,
          issue_category: values.issue_category,
          description: values.description,
          image: base64Image,
        };

        dispatch(setToolFeedbackAPI(payloadObj));
        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((errorInfo) => {
        console.warn("Validation Failed:", errorInfo);
      });
  };

  return (
    <>
      {/* Floating Icon Button */}
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        size="large"
        className="floating-button"
        onClick={showModal}
        style={{ background: "#101011" }}
      />

      <Modal
        title="Submit Feedback"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        style={{ marginTop: "-30px" }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="module" label="Module" rules={[{ required: true }]}>
            <Select placeholder="Select module">
              <Option value="Sign in">Sign in</Option>
              <Option value="Sign up">Sign up</Option>
              <Option value="Forgot password">Forgot password</Option>
              <Option value="Change password">Change password</Option>
              <Option value="account setting">account setting</Option>
              <Option value="Dashboard - single company view">
                Dashboard - single company view
              </Option>
              <Option value="Dashboard - competitor view">
                Dashboard - competitor view
              </Option>
              <Option value="Dashboard - Aggregated view">
                Dashboard - Aggregated view
              </Option>
              <Option value="Analytics page">Analytics page</Option>
              <Option value="Left navigation">Left navigation</Option>
              <Option value="profile">profile</Option>
              <Option value="Header">Header</Option>
              <Option value="Crash">Crash</Option>
              <Option value="Event list - L2">Event list - L2</Option>
              <Option value="Article list - L3">Article list - L3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Priority">
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
              <Option value="Urgent">Urgent</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="issue_category"
            label="Issue Category"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Issue Category">
              <Option value="Design Bug">Design Bug</Option>
              <Option value="Functional Bug">Functional Bug</Option>
              <Option value="Data Bug">Data Bug</Option>
              <Option value="Suggestion Bug">Suggestion Bug</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <TextArea placeholder="Enter Description" rows={3} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Upload Screenshot"
            rules={[{ required: true }]}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FeedbackButton;
