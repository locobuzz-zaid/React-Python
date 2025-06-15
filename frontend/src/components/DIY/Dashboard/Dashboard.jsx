import React, { useState, useRef, useEffect, useMemo } from "react";
import {
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

const { Panel } = Collapse;
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

const Dashboard = ({ dashboardId = "default" }) => {
  // Create initial dashboard with one section for first dashboard, minimal for new ones
  const createInitialDashboard = () => {
    if (dashboardId === "1") {
      // First dashboard gets full sections
      return [
        {
          name: `Analytics Section - ${dashboardId}`,
          charts_list: [
            {
              id: 1,
              type: "line",
              name: "Performance Trends",
              options: {
                ...dummyChartData.line,
                title: { text: `Performance Trends - ${dashboardId}` }
              },
              x: 0,
              y: 0,
              w: 4,
              h: 4,
            },
            {
              id: 2,
              type: "bar",
              name: "Category Analysis",
              options: {
                ...dummyChartData.bar,
                title: { text: `Category Analysis - ${dashboardId}` }
              },
              x: 4,
              y: 0,
              w: 4,
              h: 4,
            },
            {
              id: 3,
              type: "pie",
              name: "Market Share",
              options: {
                ...dummyChartData.pie,
                title: { text: `Market Share - ${dashboardId}` }
              },
              x: 8,
              y: 0,
              w: 4,
              h: 4,
            },
          ],
        },
        {
          name: `Reports Section - ${dashboardId}`,
          charts_list: [
            {
              id: 4,
              type: "area",
              name: "Growth Trends",
              options: {
                ...dummyChartData.area,
                title: { text: `Growth Trends - ${dashboardId}` }
              },
              x: 0,
              y: 0,
              w: 6,
              h: 4,
            },
            {
              id: 5,
              type: "column",
              name: "Monthly Revenue",
              options: {
                ...dummyChartData.column,
                title: { text: `Monthly Revenue - ${dashboardId}` }
              },
              x: 6,
              y: 0,
              w: 6,
              h: 4,
            },
          ],
        },
        {
          name: `KPI Section - ${dashboardId}`,
          charts_list: [
            {
              id: 6,
              type: "line",
              name: "KPI Tracking",
              options: {
                ...dummyChartData.line,
                title: { text: `KPI Tracking - ${dashboardId}` }
              },
              x: 0,
              y: 0,
              w: 12,
              h: 4,
            },
          ],
        },
      ];
    } else {
      // New dashboards get only one section
      return [
        {
          name: `Section 1 - ${dashboardId}`,
          charts_list: [],
        },
      ];
    }
  };

  // Dashboard state: array of sections, each with charts_list
  const [dashboard, setDashboard] = useState(createInitialDashboard);
  const [dashboardName, setDashboardName] = useState(`Dashboard ${dashboardId}`);
  const [dashboardDesc, setDashboardDesc] = useState(
    dashboardId === "1" ? "This is your main dashboard." : `Dashboard ${dashboardId}`
  );
  const [addChartModal, setAddChartModal] = useState(false);
  const [editChartModal, setEditChartModal] = useState(false);
  const [addChartForm] = Form.useForm();
  const [editChartForm] = Form.useForm();
  const [editChartInfo, setEditChartInfo] = useState({
    sectionIdx: null,
    chartIdx: null,
  });

  const gridRef1 = useRef();
  const gridRef2 = useRef();
  const gridRef3 = useRef();
  
  // Create dynamic grid refs based on dashboard sections
  const gridRefs = useMemo(() => {
    const refs = [gridRef1, gridRef2, gridRef3];
    // Add more refs for additional sections beyond the first 3
    while (refs.length < dashboard.length) {
      refs.push(React.createRef());
    }
    return refs;
  }, [dashboard.length]);

  // GridStack init
  useEffect(() => {
    dashboard.forEach((section, idx) => {
      if (gridRefs[idx]?.current && !gridRefs[idx].current.gridstack) {
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
  }, [dashboard, gridRefs]);

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
  }, [dashboard, gridRefs]);

  // Add Chart Modal handlers
  const openAddChartModal = () => setAddChartModal(true);
  const closeAddChartModal = () => {
    setAddChartModal(false);
    addChartForm.resetFields();
  };

  // Edit Chart Modal handlers - keeping for potential future use
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

  // Add Section handler
  const handleAddSection = () => {
    const newSection = {
      name: `New Section - ${dashboardId}`,
      charts_list: [],
      editMode: false,
    };

    setDashboard((prev) => [...prev, newSection]);
    message.success("New section added successfully!");
  };

  return (
    <div className="dashboard-main-content">
      {/* Dashboard Header */}
      <div
        style={{
          background: "#fafafa",
          padding: "12px 24px",
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
            onClick={handleAddSection}
          >
            Add Section
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

      {/* Dashboard Content */}
      <div style={{ padding: "16px 24px" }}>
        {dashboard.map((section, sectionIdx) => (
          <div key={sectionIdx} style={{ marginBottom: "16px" }}>
            <div
              className="collapsible-section-wrapper"
              onMouseEnter={(e) => {
                const button = e.currentTarget.querySelector('.hover-add-chart-btn-header');
                if (button) {
                  button.style.display = 'block';
                  button.style.opacity = '1';
                }
              }}
              onMouseLeave={(e) => {
                const button = e.currentTarget.querySelector('.hover-add-chart-btn-header');
                if (button) {
                  button.style.display = 'none';
                  button.style.opacity = '0';
                }
              }}
            >
              {/* Hover Add Chart Button on Section Header */}
              {/* <Button
                className="hover-add-chart-btn-header"
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  openAddChartModal();
                }}
                style={{
                  display: 'none',
                }}
              >
                Add Chart
              </Button> */}

              <Collapse defaultActiveKey={["1"]} style={{ border: 'none', backgroundColor: 'pink' }}>
                <Panel
                  header={                  <Input
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
                    style={{ fontWeight: "bold", fontSize: 14, width: 200 }} // Reduced font size from 18 to 14
                  />
                  }
                  key="1"
                  extra={<span>  <Button
                className="hover-add-chart-btn-header"
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  openAddChartModal();
                }}
                style={{
                  display: 'none',
                }}
              >
                Add Chart
              </Button></span>}
                  // style={{ border: 'none' }}
                >
                  <Divider style={{ margin: '8px 0' }} />
                  {/* Section container with reduced height */}
                  <div
                    className="section-container"
                    style={{
                      position: "relative",
                      minHeight: 180, // Further reduced from 250 to 180
                    }}
                  >
                    <div
                      className="grid-stack"
                      ref={gridRefs[sectionIdx]}
                      style={{ minHeight: 180 }} // Reduced from 250 to 180
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
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>
        ))}
      </div>

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
