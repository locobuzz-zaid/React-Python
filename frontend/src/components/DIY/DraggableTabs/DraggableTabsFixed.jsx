import React, { useState, useRef, useCallback } from "react";
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

const DraggableTab = ({ tab, index, moveTab, children }) => {
  const ref = useRef(null);
  
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.TAB,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) {
        return;
      }
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      
      moveTab(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TAB,
    item: () => {
      return { id: tab.key, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  drag(drop(ref));
  
  return (
    <div
      ref={ref}
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        display: 'inline-block'
      }}
      data-handler-id={handlerId}
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
  
  const moveTab = useCallback((dragIndex, hoverIndex) => {
    setTabs((prevTabs) => {
      const dragTab = prevTabs[dragIndex];
      const newTabs = [...prevTabs];
      newTabs.splice(dragIndex, 1);
      newTabs.splice(hoverIndex, 0, dragTab);
      return newTabs;
    });
  }, []);
  
  const addTab = () => {
    const newKey = String(Date.now());
    const newTab = {
      key: newKey,
      title: `Dashboard ${tabs.length + 1}`,
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
  
  const updateTabTitle = (key, newTitle) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.key === key ? { ...tab, title: newTitle } : tab
      )
    );
  };
  
  const onChange = (key) => {
    setActiveKey(key);
  };
  
  const onEdit = (targetKey, action) => {
    if (action === "remove") {
      removeTab(targetKey);
    }
  };
  
  const renderTabBar = (props, DefaultTabBar) => (
    <DndProvider backend={HTML5Backend}>
      <div className="draggable-tabs-container">
        <DefaultTabBar {...props}>
          {(node) => {
            const index = tabs.findIndex((tab) => tab.key === node.key);
            const tab = tabs[index];
            return (
              <DraggableTab
                key={node.key}
                tab={tab}
                index={index}
                moveTab={moveTab}
              >
                {node}
              </DraggableTab>
            );
          }}
        </DefaultTabBar>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={addTab}
          className="add-tab-button"
          size="small"
          style={{ marginLeft: 8 }}
        >
          Add Dashboard
        </Button>
      </div>
    </DndProvider>
  );
  
  return (
    <div className="draggable-tabs-wrapper">
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        renderTabBar={renderTabBar}
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
