import React, { useState } from "react";
import { Tabs, Button } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import Dashboard from "../Dashboard/Dashboard";
import "./DraggableTabs.css";

const { TabPane } = Tabs;

const DraggableTabs = () => {
  const [tabs, setTabs] = useState([
    {
      key: "1",
      title: "Dashboard 1",
      closable: false,
    },
    {
      key: "2",  
      title: "Dashboard 2",
      closable: true,
    },
    {
      key: "3",
      title: "Dashboard 3", 
      closable: true,
    },
  ]);
  const [activeKey, setActiveKey] = useState("1");
  
  // Add new tab
  const addTab = () => {
    const newKey = String(Date.now()); // Use timestamp for unique keys
    const newTab = {
      key: newKey,
      title: `Dashboard ${tabs.length + 1}`,
      closable: true,
    };
    setTabs([...tabs, newTab]);
    setActiveKey(newKey);
  };
  
  // Remove tab
  const removeTab = (targetKey) => {
    if (tabs.length === 1) return; // Don't allow removing the last tab
    
    const newTabs = tabs.filter((tab) => tab.key !== targetKey);
    setTabs(newTabs);
    
    if (activeKey === targetKey) {
      const index = tabs.findIndex((tab) => tab.key === targetKey);
      const newActiveKey = newTabs[index] ? newTabs[index].key : newTabs[index - 1]?.key;
      setActiveKey(newActiveKey);
    }
  };
  
  // Update tab title
  const updateTabTitle = (key, newTitle) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.key === key ? { ...tab, title: newTitle } : tab
      )
    );
  };
  
  // Handle tab change
  const onChange = (key) => {
    setActiveKey(key);
  };
  
  // Handle tab edit (remove)
  const onEdit = (targetKey, action) => {
    if (action === "remove") {
      removeTab(targetKey);
    }
  };
  
  return (
    <div className="draggable-tabs-wrapper">
      <div className="draggable-tabs-header">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={addTab}
          className="add-tab-button"
          size="small"
          style={{ marginBottom: 16 }}
        >
          Add Dashboard
        </Button>
      </div>
      
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        className="draggable-tabs"
        hideAdd={true}
      >
        {tabs.map((tab) => (
          <TabPane
            tab={
              <div className="tab-title">
                <span
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const newTitle = e.target.textContent.trim();
                    if (newTitle) {
                      updateTabTitle(tab.key, newTitle);
                    } else {
                      updateTabTitle(tab.key, `Dashboard ${tab.key}`);
                      e.target.textContent = `Dashboard ${tab.key}`;
                    }
                  }}
                  style={{ outline: 'none', cursor: 'text' }}
                >
                  {tab.title}
                </span>
                {tab.closable && tabs.length > 1 && (
                  <CloseOutlined
                    className="tab-close-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTab(tab.key);
                    }}
                    style={{ marginLeft: 8 }}
                  />
                )}
              </div>
            }
            key={tab.key}
            closable={tab.closable}
          >
            <Dashboard dashboardId={tab.key} />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default DraggableTabs;
