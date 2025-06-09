import React, { useState, useRef, useEffect } from "react";
import {
  Tabs,
  Typography,
  Tag,
  Input,
  Button,
  Collapse,
  Divider,
  Modal,
  Form,
  Select,
  message,
  Card,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  SaveOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Paragraph } = Typography;
const { Option } = Select;

const chartTypes = [
  { label: "Line", value: "line" },
  { label: "Bar", value: "bar" },
  { label: "Pie", value: "pie" },
  { label: "Area", value: "area" },
  { label: "Column", value: "column" },
];

const dummyChartData = {
  line: {
    chart: { type: "line" },
    title: { text: "Line Chart" },
    series: [{ data: [1, 3, 2, 4, 6, 3, 5], name: "Line" }],
  },
  bar: {
    chart: { type: "bar" },
    title: { text: "Bar Chart" },
    series: [{ data: [5, 3, 4, 7, 2], name: "Bar" }],
  },
  pie: {
    chart: { type: "pie" },
    title: { text: "Pie Chart" },
    series: [
      {
        name: "Share",
        data: [
          { name: "A", y: 30 },
          { name: "B", y: 40 },
          { name: "C", y: 30 },
        ],
      },
    ],
  },
  area: {
    chart: { type: "area" },
    title: { text: "Area Chart" },
    series: [{ data: [2, 1, 3, 5, 4], name: "Area" }],
  },
  column: {
    chart: { type: "column" },
    title: { text: "Column Chart" },
    series: [{ data: [3, 2, 5, 7, 6], name: "Column" }],
  },
};

const DEFAULT_WIDTH = 4;
const DEFAULT_HEIGHT = 4;

const Dashboard = () => {
  // Dashboard state: array of sections, each with charts_list
  const [dashboard, setDashboard] = useState([
    {
      name: "Section 1",
      description: "This is a description for Section 1.",
      tags: ["charts", "demo"],
      charts_list: [
        {
          id: 1,
          type: "line",
          options: dummyChartData.line,
          x: 0,
          y: 0,
          w: 4,
          h: 4,
        },
        {
          id: 2,
          type: "bar",
          options: dummyChartData.bar,
          x: 4,
          y: 0,
          w: 4,
          h: 4,
        },
        {
          id: 3,
          type: "pie",
          options: dummyChartData.pie,
          x: 8,
          y: 0,
          w: 4,
          h: 4,
        },
      ],
    },
    {
      name: "Section 2",
      description: "",
      tags: [],
      charts_list: [
        {
          id: 4,
          type: "area",
          options: dummyChartData.area,
          x: 0,
          y: 0,
          w: 6,
          h: 4,
        },
        {
          id: 5,
          type: "column",
          options: dummyChartData.column,
          x: 6,
          y: 0,
          w: 6,
          h: 4,
        },
      ],
    },
  ]);
  const [dashboardName, setDashboardName] = useState("My Dashboard");
  const [dashboardDesc, setDashboardDesc] = useState(
    "This is a demo dashboard."
  );
  const [activeTab, setActiveTab] = useState("1");
  const [addChartModal, setAddChartModal] = useState(false);
  const [editChartModal, setEditChartModal] = useState(false);
  const [addChartForm] = Form.useForm();
  const [editChartForm] = Form.useForm();
  const [editChartInfo, setEditChartInfo] = useState({
    sectionIdx: null,
    chartIdx: null,
  });

  const gridRefs = [useRef(), useRef()];

  // GridStack init
  useEffect(() => {
    dashboard.forEach((section, idx) => {
      if (gridRefs[idx].current && !gridRefs[idx].current.gridstack) {
        const grid = GridStack.init(
          {
            float: true,
            resizable: { handles: "all" },
            draggable: { handle: ".ant-card-head" },
          },
          gridRefs[idx].current
        );

        // Add resizestop listener
        grid.on("resizestop", function (event, el) {
          // Find chart inside this grid item
          const chartEl = el.querySelector(
            ".highcharts-container"
          )?.parentElement;
          if (chartEl && chartEl.__chartRef) {
            chartEl.__chartRef.reflow();
          } else {
            // fallback: trigger reflow on all charts in this grid
            el.querySelectorAll(".highcharts-container").forEach(
              (container) => {
                const chartInstance = container.__chartRef;
                if (chartInstance) chartInstance.reflow();
              }
            );
          }
        });
      }
    });
    // eslint-disable-next-line
  }, [dashboard]);

  // Listen for GridStack changes
  useEffect(() => {
    dashboard.forEach((section, idx) => {
      const grid = gridRefs[idx]?.current?.gridstack;
      if (grid && !grid._hasChangeHandler) {
        grid.on("change", function (event, items) {
          setDashboard((prev) =>
            prev.map((sec, sidx) => {
              if (sidx !== idx) return sec;
              const updatedCharts = sec.charts_list.map((chart) => {
                const updatedItem = items.find(
                  (item) =>
                    String(item.el.getAttribute("data-gs-id")) ===
                    String(chart.id)
                );
                return updatedItem
                  ? {
                      ...chart,
                      x: updatedItem.x,
                      y: updatedItem.y,
                      w: updatedItem.w,
                      h: updatedItem.h,
                    }
                  : chart;
              });
              return { ...sec, charts_list: updatedCharts };
            })
          );
        });
        grid._hasChangeHandler = true; // So we don't add multiple handlers
      }
    });
  }, [dashboard]);

  // Section 1 tag handlers
  const handleAddTag = (sectionIdx, tag) => {
    setDashboard((prev) =>
      prev.map((sec, idx) =>
        idx === sectionIdx && tag && !sec.tags.includes(tag)
          ? { ...sec, tags: [...sec.tags, tag] }
          : sec
      )
    );
  };
  const handleRemoveTag = (sectionIdx, removedTag) => {
    setDashboard((prev) =>
      prev.map((sec, idx) =>
        idx === sectionIdx
          ? { ...sec, tags: sec.tags.filter((tag) => tag !== removedTag) }
          : sec
      )
    );
  };

  // Add Chart Modal handlers
  const openAddChartModal = () => setAddChartModal(true);
  const closeAddChartModal = () => {
    setAddChartModal(false);
    addChartForm.resetFields();
  };

  // Edit Chart Modal handlers
  const openEditChartModal = (sectionIdx, chartIdx) => {
    setEditChartInfo({ sectionIdx, chartIdx });
    const chart = dashboard[sectionIdx].charts_list[chartIdx];
    editChartForm.setFieldsValue({
      chartType: chart.type,
    });
    setEditChartModal(true);
  };
  const closeEditChartModal = () => {
    setEditChartModal(false);
    setEditChartInfo({ sectionIdx: null, chartIdx: null });
    editChartForm.resetFields();
  };

  // Add Chart
  const handleAddChart = (values) => {
    const { section, chartType, chartName } = values;
    const idx = Number(section);
    const isSection1 = idx === 0;
    const chartsPerRow = isSection1 ? 3 : 2;
    const chartWidth = isSection1 ? 4 : 6;
    const chartHeight = 4;

    const charts = dashboard[idx].charts_list;
    const nextIndex = charts.length;

    const x = (nextIndex % chartsPerRow) * chartWidth;
    const y = Math.floor(nextIndex / chartsPerRow) * chartHeight;

    const newChartId = Date.now(); // 👈 create this first so you can use below

    setDashboard((prev) =>
      prev.map((sec, sidx) =>
        sidx === idx
          ? {
              ...sec,
              charts_list: [
                ...sec.charts_list,
                {
                  id: newChartId,
                  type: chartType,
                  name: chartName,
                  options: dummyChartData[chartType],
                  x,
                  y,
                  w: chartWidth,
                  h: chartHeight,
                },
              ],
            }
          : sec
      )
    );

    // 👇 this makes GridStack "see" the new item
    setTimeout(() => {
      const grid = gridRefs[idx]?.current?.gridstack;
      if (grid) {
        const el = gridRefs[idx].current.querySelector(
          `[data-gs-id="${newChartId}"]`
        );
        if (el) grid.makeWidget(el);
      }
    }, 0);

    addChartForm.resetFields();
    setAddChartModal(false);
    message.success("Chart added!");
  };

  // Delete Chart
  const handleDeleteChart = (sectionIdx, chartIdx) => {
    setDashboard((prev) =>
      prev.map((sec, sidx) =>
        sidx === sectionIdx
          ? {
              ...sec,
              charts_list: sec.charts_list.filter(
                (_, cidx) => cidx !== chartIdx
              ),
            }
          : sec
      )
    );
    message.success("Chart deleted!");
  };

  // Update Chart
  const handleEditChart = (values) => {
    const { chartType } = values;
    const { sectionIdx, chartIdx } = editChartInfo;
    setDashboard((prev) =>
      prev.map((sec, sidx) =>
        sidx === sectionIdx
          ? {
              ...sec,
              charts_list: sec.charts_list.map((c, cidx) =>
                cidx === chartIdx
                  ? {
                      ...c,
                      type: chartType,
                      options: dummyChartData[chartType],
                    }
                  : c
              ),
            }
          : sec
      )
    );
    closeEditChartModal();
    message.success("Chart updated!");
  };

  // Save Dashboard handler
  const handleSaveDashboard = () => {
    const dashboardData = {
      name: dashboardName,
      description: dashboardDesc,
      sections: dashboard,
    };
    // Replace with API call if needed
    console.log("Saved dashboard:", dashboardData);
    message.success("Dashboard saved! (Check console for data)");
  };

  // Tab change handler
  const handleTabClick = (key) => setActiveTab(key);

  return (
    <div className="dashboard-main-content">
      {/* Dashboard Navbar */}
      <div
        style={{
          background: "#f5f5f5",
          padding: "16px 24px",
          borderBottom: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ flex: 1 }}>
          <Input
            value={dashboardName}
            onChange={(e) => setDashboardName(e.target.value)}
            style={{
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 4,
              background: "#fff",
            }}
            bordered={false}
            placeholder="Dashboard Name"
          />
          <Input.TextArea
            value={dashboardDesc}
            onChange={(e) => setDashboardDesc(e.target.value)}
            style={{ background: "#fff" }}
            autoSize={{ minRows: 1, maxRows: 3 }}
            bordered={false}
            placeholder="Dashboard Description"
          />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={openAddChartModal}
          >
            Add Chart
          </Button>
          <Button
            icon={<SaveOutlined />}
            type="default"
            onClick={handleSaveDashboard}
          >
            Save
          </Button>
        </div>
      </div>

      {/* Tabs and Sections */}
      <Tabs
        onChange={handleTabClick}
        defaultActiveKey="1"
        activeKey={activeTab}
        className="sticky-tabs"
        style={{ padding: 24, marginTop: "60px" }}
      >
        {dashboard.map((section, sectionIdx) => (
          <TabPane tab={section.name} key={String(sectionIdx + 1)}>
            <Collapse defaultActiveKey={["1"]} style={{ marginBottom: 24 }}>
              <Panel
                header={
                  <Input
                    value={section.name}
                    onChange={(e) =>
                      setDashboard((prev) =>
                        prev.map((sec, idx) =>
                          idx === sectionIdx
                            ? { ...sec, name: e.target.value }
                            : sec
                        )
                      )
                    }
                    style={{ fontWeight: "bold", fontSize: 18, width: 200 }}
                  />
                }
                key="1"
                extra={
                  <>
                    {sectionIdx === 0 && (
                      <>
                        <Button
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDashboard((prev) =>
                              prev.map((sec, idx) =>
                                idx === sectionIdx
                                  ? { ...sec, editMode: !sec.editMode }
                                  : sec
                              )
                            );
                          }}
                          style={{ marginRight: 8 }}
                        >
                          {section.editMode ? "Save" : "Edit"}
                        </Button>
                        <Button
                          size="small"
                          type="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            openAddChartModal();
                          }}
                        >
                          Add Chart
                        </Button>
                      </>
                    )}
                  </>
                }
              >
                {sectionIdx === 0 ? (
                  <>
                    <Paragraph
                      editable={{
                        onChange: (val) =>
                          setDashboard((prev) =>
                            prev.map((sec, idx) =>
                              idx === sectionIdx
                                ? { ...sec, description: val }
                                : sec
                            )
                          ),
                      }}
                      style={{ marginBottom: 8 }}
                    >
                      {section.description}
                    </Paragraph>
                    <div style={{ marginBottom: 8 }}>
                      {section.tags.map((tag) => (
                        <Tag
                          key={tag}
                          closable
                          onClose={() => handleRemoveTag(sectionIdx, tag)}
                          style={{ marginBottom: 4 }}
                        >
                          {tag}
                        </Tag>
                      ))}
                      <Input
                        size="small"
                        style={{ width: 100, marginLeft: 8 }}
                        value={section.inputTag || ""}
                        onChange={(e) =>
                          setDashboard((prev) =>
                            prev.map((sec, idx) =>
                              idx === sectionIdx
                                ? { ...sec, inputTag: e.target.value }
                                : sec
                            )
                          )
                        }
                        onPressEnter={() => {
                          handleAddTag(sectionIdx, section.inputTag);
                          setDashboard((prev) =>
                            prev.map((sec, idx) =>
                              idx === sectionIdx
                                ? { ...sec, inputTag: "" }
                                : sec
                            )
                          );
                        }}
                        placeholder="Add tag"
                      />
                      <Button
                        size="small"
                        onClick={() => {
                          handleAddTag(sectionIdx, section.inputTag);
                          setDashboard((prev) =>
                            prev.map((sec, idx) =>
                              idx === sectionIdx
                                ? { ...sec, inputTag: "" }
                                : sec
                            )
                          );
                        }}
                        style={{ marginLeft: 4 }}
                      >
                        Add
                      </Button>
                    </div>
                  </>
                ) : null}
                <Divider />
                {/* {console.log("Rendering section:", dashboard[sectionIdx])} */}
                <div
                  className="grid-stack"
                  ref={gridRefs[sectionIdx]}
                  style={{ minHeight: 400 }}
                >
                  {(() => {
                    const charts = section.charts_list;
                    if (!charts.length) return null;

                    return charts.map((chart, idx) => {
                      return (
                        <div
                          className="grid-stack-item"
                          key={chart.id}
                          gs-x={chart.x}
                          gs-y={chart.y}
                          gs-w={chart.w}
                          gs-h={chart.h}
                          data-gs-id={chart.id} // Add this line!
                        >
                          <div className="grid-stack-item-content">
                            <Card
                              title={
                                chart.name ||
                                `${
                                  chart.type.charAt(0).toUpperCase() +
                                  chart.type.slice(1)
                                } Chart`
                              }
                              extra={
                                <>
                                  <Button
                                    icon={<EditOutlined />}
                                    size="small"
                                    onClick={() =>
                                      openEditChartModal(sectionIdx, idx)
                                    }
                                    style={{ marginRight: 8 }}
                                  />
                                  <Popconfirm
                                    title="Delete this chart?"
                                    onConfirm={() =>
                                      handleDeleteChart(sectionIdx, idx)
                                    }
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <Button
                                      icon={<DeleteOutlined />}
                                      size="small"
                                      danger
                                    />
                                  </Popconfirm>
                                </>
                              }
                            >
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={chart.options}
                                ref={(chartComponent) => {
                                  if (chartComponent && chartComponent.chart) {
                                    const chartInstance = chartComponent.chart;
                                    // Store reference in parent div so GridStack listener can find it
                                    const chartContainer =
                                      chartInstance.renderTo?.parentElement;
                                    if (chartContainer) {
                                      chartContainer.__chartRef = chartInstance;
                                    }
                                  }
                                }}
                              />
                            </Card>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </Panel>
            </Collapse>
          </TabPane>
        ))}
      </Tabs>

      {/* Add Chart Modal */}
      <Modal
        title="Add Chart"
        open={addChartModal}
        onCancel={closeAddChartModal}
        footer={null}
        destroyOnClose
      >
        <Form form={addChartForm} layout="vertical" onFinish={handleAddChart}>
          <Form.Item
            label="Section"
            name="section"
            rules={[{ required: true, message: "Please select a section" }]}
          >
            <Select placeholder="Select section">
              {dashboard.map((sec, idx) => (
                <Option key={idx} value={String(idx)}>
                  {sec.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Chart Type"
            name="chartType"
            rules={[{ required: true, message: "Please select a chart type" }]}
          >
            <Select placeholder="Select chart type">
              {chartTypes.map((ct) => (
                <Option key={ct.value} value={ct.value}>
                  {ct.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Chart Name"
            name="chartName"
            rules={[{ required: true, message: "Please enter chart name" }]}
          >
            <Input placeholder="Enter chart name" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Chart
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Chart Modal */}
      <Modal
        title="Edit Chart"
        open={editChartModal}
        onCancel={closeEditChartModal}
        footer={null}
        destroyOnClose
      >
        <Form form={editChartForm} layout="vertical" onFinish={handleEditChart}>
          <Form.Item
            label="Chart Type"
            name="chartType"
            rules={[{ required: true, message: "Please select a chart type" }]}
          >
            <Select placeholder="Select chart type">
              {chartTypes.map((ct) => (
                <Option key={ct.value} value={ct.value}>
                  {ct.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Chart
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
