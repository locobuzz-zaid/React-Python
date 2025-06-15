import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Typography,
  Tag,
  Input,
  Button,
  Collapse,
  Divider,
  Modal,
  Drawer,
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
  CloseOutlined,
} from "@ant-design/icons";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";

const { Panel } = Collapse;
const { Option } = Select;

const chartTypes = [
  { 
    label: "Line Chart", 
    value: "line", 
    description: "Visualize trends over time",
    color: "#1890ff",
    svgIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22,6 13,15 8,10 2,16" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="16,6 22,6 22,12" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    label: "Bar Chart", 
    value: "bar", 
    description: "Compare different categories",
    color: "#52c41a",
    svgIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="20" x2="12" y2="10" strokeLinecap="round"/>
        <line x1="18" y1="20" x2="18" y2="4" strokeLinecap="round"/>
        <line x1="6" y1="20" x2="6" y2="16" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    label: "List View", 
    value: "list", 
    description: "Display data in list format",
    color: "#722ed1",
    svgIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="8" y1="6" x2="21" y2="6" strokeLinecap="round"/>
        <line x1="8" y1="12" x2="21" y2="12" strokeLinecap="round"/>
        <line x1="8" y1="18" x2="21" y2="18" strokeLinecap="round"/>
        <line x1="3" y1="6" x2="3.01" y2="6" strokeLinecap="round"/>
        <line x1="3" y1="12" x2="3.01" y2="12" strokeLinecap="round"/>
        <line x1="3" y1="18" x2="3.01" y2="18" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    label: "Area Chart", 
    value: "area", 
    description: "Show data trends with filled areas",
    color: "#13c2c2",
    svgIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13,2 3,14 12,14 21,4" strokeLinecap="round" strokeLinejoin="round"/>
        <polygon points="3,22 21,22 21,16 3,16" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    label: "Scatter Plot", 
    value: "scatter", 
    description: "Plot data points on X-Y axis",
    color: "#faad14",
    svgIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="5" cy="5" r="1" fill="currentColor"/>
        <circle cx="12" cy="8" r="1" fill="currentColor"/>
        <circle cx="18" cy="4" r="1" fill="currentColor"/>
        <circle cx="8" cy="15" r="1" fill="currentColor"/>
        <circle cx="15" cy="12" r="1" fill="currentColor"/>
        <circle cx="20" cy="18" r="1" fill="currentColor"/>
      </svg>
    )
  },
  { 
    label: "Pie Chart", 
    value: "pie", 
    description: "Show proportional data",
    color: "#eb2f96",
    svgIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" strokeLinecap="round"/>
        <polyline points="12,6 12,12 16,10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    label: "Donut Chart", 
    value: "doughnut", 
    description: "Pie chart with center space",
    color: "#f5222d",
    svgIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="10" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    label: "Table View", 
    value: "table", 
    description: "Display data in table format",
    color: "#9254de",
    svgIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeLinecap="round"/>
        <line x1="9" y1="9" x2="21" y2="9" strokeLinecap="round"/>
        <line x1="9" y1="15" x2="21" y2="15" strokeLinecap="round"/>
        <line x1="3" y1="9" x2="6" y2="9" strokeLinecap="round"/>
        <line x1="3" y1="15" x2="6" y2="15" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    label: "Calendar", 
    value: "calendar", 
    description: "Show data by dates",
    color: "#1890ff",
    svgIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round"/>
        <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round"/>
        <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round"/>
        <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    label: "Gauge", 
    value: "gauge", 
    description: "Display KPI metrics",
    color: "#52c41a",
    svgIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" strokeLinecap="round"/>
        <polyline points="8,12 12,8 16,12" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

const dummyChartData = {
  line: {
    chart: { 
      type: "line",
      height: null, // Let chart size itself
      backgroundColor: 'transparent'
    },
    title: { text: "" },
    series: [{ data: [1, 3, 2, 4, 6, 3, 5], name: "Line" }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            enabled: false
          }
        }
      }]
    }
  },
  bar: {
    chart: { 
      type: "bar",
      height: null,
      backgroundColor: 'transparent'
    },
    title: { text: "" },
    series: [{ data: [5, 3, 4, 7, 2], name: "Bar" }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            enabled: false
          }
        }
      }]
    }
  },
  pie: {
    chart: { 
      type: "pie",
      height: null,
      backgroundColor: 'transparent'
    },
    title: { text: "" },
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
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            enabled: false
          }
        }
      }]
    }
  },
  area: {
    chart: { 
      type: "area",
      height: null,
      backgroundColor: 'transparent'
    },
    title: { text: "" },
    series: [{ data: [2, 1, 3, 5, 4], name: "Area" }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            enabled: false
          }
        }
      }]
    }
  },
  column: {
    chart: { 
      type: "column",
      height: null,
      backgroundColor: 'transparent'
    },
    title: { text: "" },
    series: [{ data: [3, 2, 5, 7, 6], name: "Column" }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            enabled: false
          }
        }
      }]
    }
  },
};

const DEFAULT_WIDTH = 4;
const DEFAULT_HEIGHT = 4;

const Dashboard = ({ dashboardId = "default", onDashboardNameChange, initialTitle }) => {
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
                title: { text: "" },
                chart: {
                  ...dummyChartData.line.chart,
                  height: null,
                  backgroundColor: 'transparent'
                }
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
                title: { text: "" },
                chart: {
                  ...dummyChartData.bar.chart,
                  height: null,
                  backgroundColor: 'transparent'
                }
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
                title: { text: "" },
                chart: {
                  ...dummyChartData.pie.chart,
                  height: null,
                  backgroundColor: 'transparent'
                }
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
                title: { text: "" },
                chart: {
                  ...dummyChartData.area.chart,
                  height: null,
                  backgroundColor: 'transparent'
                }
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
                title: { text: "" },
                chart: {
                  ...dummyChartData.column.chart,
                  height: null,
                  backgroundColor: 'transparent'
                }
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
                title: { text: "" },
                chart: {
                  ...dummyChartData.line.chart,
                  height: null,
                  backgroundColor: 'transparent'
                }
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
  const [dashboardName, setDashboardName] = useState(
    initialTitle || (dashboardId === "1" ? "Analytics Overview" : `Dashboard ${dashboardId}`)
  );
  const [dashboardDesc, setDashboardDesc] = useState(
    dashboardId === "1" ? "This is your main dashboard." : `Dashboard ${dashboardId}`
  );
  const [addChartDrawer, setAddChartDrawer] = useState(false);
  const [editChartModal, setEditChartModal] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState(null);
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
          // Find chart inside this grid item and trigger reflow
          const chartEl = el.querySelector(".highcharts-container");
          if (chartEl && chartEl.__chartRef) {
            setTimeout(() => {
              chartEl.__chartRef.reflow();
            }, 100);
          } else {
            // fallback: trigger reflow on all charts in this grid
            el.querySelectorAll(".highcharts-container").forEach(
              (container) => {
                const chartInstance = container.__chartRef;
                if (chartInstance) {
                  setTimeout(() => {
                    chartInstance.reflow();
                  }, 100);
                }
              }
            );
          }
        });

        // Add resize listener for window resize
        const handleResize = () => {
          const gridEl = gridRefs[idx].current;
          if (gridEl) {
            gridEl.querySelectorAll(".highcharts-container").forEach(
              (container) => {
                const chartInstance = container.__chartRef;
                if (chartInstance) {
                  setTimeout(() => {
                    chartInstance.reflow();
                  }, 100);
                }
              }
            );
          }
        };

        window.addEventListener('resize', handleResize);
        
        // Store cleanup function
        gridRefs[idx].current._resizeCleanup = () => {
          window.removeEventListener('resize', handleResize);
        };
      }
    });
  }, [dashboard, gridRefs]);

  // Add cleanup effect for resize listeners
  useEffect(() => {
    return () => {
      gridRefs.forEach(ref => {
        if (ref.current && ref.current._resizeCleanup) {
          ref.current._resizeCleanup();
        }
      });
    };
  }, [gridRefs]);

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

  // Add Chart Drawer handlers
  const openAddChartDrawer = () => setAddChartDrawer(true);
  const closeAddChartDrawer = () => {
    setAddChartDrawer(false);
    setSelectedChartType(null);
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
    const { section, chartName } = values;
    const chartType = selectedChartType;
    
    if (!chartType) {
      message.error('Please select a chart type');
      return;
    }
    
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
                  options: {
                    ...dummyChartData[chartType],
                    chart: {
                      ...dummyChartData[chartType].chart,
                      height: null, // Ensure responsive height
                      backgroundColor: 'transparent'
                    }
                  },
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
    setAddChartDrawer(false);
    setSelectedChartType(null);
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
                      options: {
                        ...dummyChartData[chartType],
                        chart: {
                          ...dummyChartData[chartType].chart,
                          height: null, // Ensure responsive height
                          backgroundColor: 'transparent'
                        }
                      },
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
            onChange={(e) => {
              setDashboardName(e.target.value);
              onDashboardNameChange?.(e.target.value);
            }}
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
              <Collapse 
                defaultActiveKey={["1"]} 
                style={{ 
                  border: 'none', 
                  backgroundColor: 'pink',
                  width: '100%',
                  height: "45px"
                }}
                ghost
              >
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
                    style={{ fontWeight: "bold", fontSize: 12, width: 200 }} // Reduced font size from 18 to 14
                  />
                  }
                  key="1"
                  extra={
                    <Button
                      className="hover-add-chart-btn-header"
                      type="primary"
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        openAddChartDrawer();
                      }}
                      style={{
                        display: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Add Chart
                    </Button>
                  }
                >
                  <div
                    className="section-container"
                    style={{
                      position: "relative",
                      width: "100%",
                      minHeight: "auto", // Remove fixed height
                    }}
                  >
                    <div
                      className="grid-stack"
                      ref={gridRefs[sectionIdx]}
                      style={{ 
                        width: "100%",
                        minHeight: "auto" // Remove fixed height to be fully responsive
                      }}
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
                            <div className="grid-stack-item-content" style={{ height: "100%", width: "100%" }}>
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
                                style={{ 
                                  height: "100%", 
                                  width: "100%",
                                  display: "flex",
                                  flexDirection: "column"
                                }}
                                bodyStyle={{ 
                                  flex: 1, 
                                  padding: "8px",
                                  height: "calc(100% - 57px)", // Account for header
                                  overflow: "visible" // Remove any overflow scroll
                                }}
                              >
                                <div style={{ 
                                  height: "100%", 
                                  width: "100%",
                                  minHeight: "200px" // Minimum height for charts
                                }}>
                                  <HighchartsReact
                                    highcharts={Highcharts}
                                    options={{
                                      ...chart.options,
                                      chart: {
                                        ...chart.options.chart,
                                        height: null, // Let chart size itself
                                        backgroundColor: 'transparent',
                                        style: {
                                          fontFamily: 'inherit'
                                        }
                                      }
                                    }}
                                    containerProps={{ 
                                      style: { 
                                        height: "100%", 
                                        width: "100%" 
                                      } 
                                    }}
                                    ref={(chartComponent) => {
                                      if (chartComponent && chartComponent.chart) {
                                        const chartInstance = chartComponent.chart;
                                        // Store reference in container for resize handling
                                        const chartContainer = chartInstance.renderTo;
                                        if (chartContainer) {
                                          chartContainer.__chartRef = chartInstance;
                                        }
                                      }
                                    }}
                                  />
                                </div>
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

      {/* Add Chart Drawer */}
      <Drawer
        title={
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            fontSize: '18px',
            fontWeight: '600',
            color: '#333'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Add New Chart
            </span>
          </div>
        }
        placement="right"
        open={addChartDrawer}
        onClose={closeAddChartDrawer}
        width={520}
        destroyOnClose
        maskClosable={true}
        keyboard={true}
        closeIcon={
          <CloseOutlined 
            style={{ 
              fontSize: '16px', 
              color: '#666',
              padding: '6px',
              borderRadius: '4px',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }} 
            onMouseEnter={(e) => {
              e.target.style.background = '#f5f5f5';
              e.target.style.color = '#333';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#666';
            }}
          />
        }
        headerStyle={{
          borderBottom: '1px solid #f0f0f0',
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
          borderRadius: '0'
        }}
        bodyStyle={{
          padding: '24px',
          background: '#fff',
          height: 'calc(100vh - 120px)',
          overflow: 'auto'
        }}
        footerStyle={{
          padding: '16px 24px',
          borderTop: '1px solid #f0f0f0',
          background: '#fafafa',
          boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.05)'
        }}
        footer={
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
            <Button 
              onClick={closeAddChartDrawer}
              style={{ 
                minWidth: '90px',
                height: '36px',
                borderRadius: '6px'
              }}
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              onClick={() => addChartForm.submit()}
              disabled={!selectedChartType}
              style={{ 
                minWidth: '90px',
                height: '36px',
                borderRadius: '6px',
                background: selectedChartType 
                  ? 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)'
                  : '#f5f5f5',
                border: 'none',
                boxShadow: selectedChartType 
                  ? '0 2px 4px rgba(24, 144, 255, 0.3)'
                  : 'none',
                color: selectedChartType ? '#fff' : '#bfbfbf',
                transition: 'all 0.3s ease',
                transform: selectedChartType ? 'scale(1)' : 'scale(0.95)'
              }}
              loading={false}
            >
              {selectedChartType ? '✨ Create Chart' : 'Create Chart'}
            </Button>
          </div>
        }
      >
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          gap: '4px'
        }}>
          <Form 
            form={addChartForm} 
            layout="vertical" 
            onFinish={handleAddChart}
            style={{ flex: 1 }}
            requiredMark="optional"
          >

            <Form.Item
              label={
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  🏷️ Chart Name
                </span>
              }
              name="chartName"
              rules={[{ required: true, message: "Please enter chart name" }]}
              style={{ marginBottom: '32px' }}
            >
              <Input 
                placeholder="Enter a descriptive name for your chart"
                size="large"
                style={{ borderRadius: '8px' }}
                maxLength={50}
                showCount
                suffix={
                  <span style={{ color: '#bfbfbf', fontSize: '12px' }}>
                    ✏️
                  </span>
                }
              />
            </Form.Item>

            <Form.Item
              label={
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  🎯 Target Section
                </span>
              }
              name="section"
              rules={[{ required: true, message: "Please select a section" }]}
              style={{ marginBottom: '24px' }}
            >
              <Select 
                placeholder="Choose which section to add the chart to"
                size="large"
                style={{ borderRadius: '8px' }}
                suffixIcon={<span style={{ color: '#1890ff' }}>▼</span>}
              >
                {dashboard.map((sec, idx) => (
                  <Option key={idx} value={String(idx)}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      padding: '4px 0'
                    }}>
                      <span style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        background: idx === 0 ? '#1890ff' : idx === 1 ? '#52c41a' : '#faad14',
                        boxShadow: `0 0 0 2px ${idx === 0 ? '#e6f7ff' : idx === 1 ? '#f6ffed' : '#fff7e6'}`
                      }}></span>
                      <span style={{ fontWeight: '500' }}>{sec.name}</span>
                      <span style={{ 
                        fontSize: '11px', 
                        color: '#999',
                        background: '#f5f5f5',
                        padding: '2px 6px',
                        borderRadius: '10px'
                      }}>
                        {sec.charts_list.length} chart{sec.charts_list.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  📈 Chart Type
                </span>
              }
              name="chartType"
              rules={[{ 
                validator: () => {
                  if (!selectedChartType) {
                    return Promise.reject(new Error('Please select a chart type'));
                  }
                  return Promise.resolve();
                }
              }]}
              style={{ marginBottom: '24px' }}
            >
              <div className="chart-type-grid row">
                {chartTypes.map((chartType) => (
                  <div

                    key={chartType.value}
                    className={`col-3 chart-type-card ${selectedChartType === chartType.value ? 'selected' : ''}`}
                    onClick={() => setSelectedChartType(chartType.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedChartType(chartType.value);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={selectedChartType === chartType.value}
                    aria-label={`Select ${chartType.label} chart type - ${chartType.description}`}
                    style={{
                      borderColor: selectedChartType === chartType.value 
                        ? chartType.color 
                        : '#f0f0f0',
                      background: selectedChartType === chartType.value 
                        ? `${chartType.color}08` 
                        : '#fff',
                      boxShadow: selectedChartType === chartType.value 
                        ? `0 4px 12px ${chartType.color}25` 
                        : '0 2px 4px rgba(0,0,0,0.05)',
                      padding: '12px',
                    }}
                  >
                    {/* Chart icon */}
                    <div 
                      className="chart-type-icon"
                      style={{
                        color: selectedChartType === chartType.value 
                          ? chartType.color 
                          : '#8c8c8c',
                        filter: selectedChartType === chartType.value 
                          ? 'none' 
                          : 'grayscale(0.2)'
                      }}
                    >
                      {chartType.svgIcon}
                    </div>
                    
                    {/* Chart name */}
                    <div 
                      className="chart-type-name"
                      style={{
                        fontWeight: selectedChartType === chartType.value ? '600' : '500',
                        color: selectedChartType === chartType.value 
                          ? chartType.color 
                          : '#333'
                      }}
                    >
                      {chartType.label}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Helper message when no chart type is selected */}
              {!selectedChartType && (
                <div style={{
                  marginTop: '12px',
                  padding: '12px',
                  background: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#6c757d',
                    fontStyle: 'italic'
                  }}>
                    👆 Click on a chart type above to select it
                  </span>
                </div>
              )}
            </Form.Item>
          </Form>
        </div>
      </Drawer>     
    </div>
  );
};

export default Dashboard;
