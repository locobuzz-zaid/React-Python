import React, { useState, useCallback, useRef } from "react";
import { Tabs, Button } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Dashboard from "../Dashboard/Dashboard";
import "./DraggableTabs.css";

const { TabPane } = Tabs;

const ItemTypes = {
  TAB: 'tab',
};

const DraggableTab = ({ index, moveTab, children }) => {
  const ref = useRef(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TAB,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TAB,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTab(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      className={`draggable-tab ${isDragging ? 'dragging' : ''}`}
    >
      {children}
    </div>
  );
};

const DraggableTabs = () => {
  const [tabs, setTabs] = useState([
    {
      key: "1",
      title: "Analytics Overview",
      closable: false,
    },
  ]);
  const [activeKey, setActiveKey] = useState("1");
  
  const moveTab = useCallback((dragIndex, hoverIndex) => {
    setTabs((prevTabs) => {
      const dragTab = prevTabs[dragIndex];
      const newTabs = [...prevTabs];
      newTabs.splice(dragIndex, 1);
      newTabs.splice(hoverIndex, 0, dragTab);
      return newTabs;
    });
  }, []);
  
  const updateTabTitle = useCallback((tabKey, newTitle) => {
    setTabs((prevTabs) => 
      prevTabs.map((tab) => 
        tab.key === tabKey ? { ...tab, title: newTitle } : tab
      )
    );
  }, []);
  
  const addTab = () => {
    const newKey = String(Date.now());
    const dashboardNames = [
      "Sales Analytics",
      "Marketing Insights", 
      "User Behavior",
      "Performance Metrics",
      "Financial Overview",
      "Customer Journey",
      "Product Analytics",
      "Operations Dashboard",
      "Growth Metrics",
      "Strategic Planning"
    ];
    
    const randomName = dashboardNames[Math.floor(Math.random() * dashboardNames.length)];
    const newTab = {
      key: newKey,
      title: randomName,
      closable: true,
    };
    setTabs([...tabs, newTab]);
    setActiveKey(newKey);
  };
  
  const removeTab = (targetKey) => {
    if (tabs.length === 1) return;
    
    const newTabs = tabs.filter((tab) => tab.key !== targetKey);
    setTabs(newTabs);
    
    if (activeKey === targetKey) {
      const index = tabs.findIndex((tab) => tab.key === targetKey);
      const newActiveKey = newTabs[index] ? newTabs[index].key : newTabs[index - 1]?.key;
      setActiveKey(newActiveKey);
    }
  };
  
  const onChange = (key) => {
    setActiveKey(key);
  };
  
  const onEdit = (targetKey, action) => {
    if (action === "remove") {
      removeTab(targetKey);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="draggable-tabs-wrapper">
        {/* Tabs */}
        <Tabs
          type="editable-card"
          onChange={onChange}
          activeKey={activeKey}
          onEdit={onEdit}
          className="draggable-tabs"
          hideAdd={true}
          tabBarGutter={8}
          renderTabBar={(props, DefaultTabBar) => (
            <div className="custom-tab-bar">
              <DefaultTabBar {...props} />
              <Button
                type="default"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={addTab}
                className="add-tab-button"
                size="small"
                title="Add Dashboard"
                style={{ 
                  display: 'flex !important',
                  visibility: 'visible !important',
                  opacity: '1 !important'
                }}
                ghost={false}
              />
            </div>
          )}
        >
          {tabs.map((tab, index) => (
            <TabPane
              tab={
                <DraggableTab index={index} moveTab={moveTab}>
                  <div className="tab-title">
                    <span>
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
                </DraggableTab>
              }
              key={tab.key}
              closable={false}
            >
              <Dashboard 
                dashboardId={tab.key} 
                initialTitle={tab.title}
                onDashboardNameChange={(newName) => updateTabTitle(tab.key, newName)}
              />
            </TabPane>
          ))}
        </Tabs>
      </div>
    </DndProvider>
  );
};

export default DraggableTabs;
