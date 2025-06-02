import React, { useState } from "react";
import { Upload, Button, Table, Card, Select, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import axios from "axios";
import "./index.css";

const { Dragger } = Upload;
const { Option } = Select;

const DataVisualizer = () => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedXAxis, setSelectedXAxis] = useState("");
  const [selectedYAxis, setSelectedYAxis] = useState("");
  const [chartType, setChartType] = useState("line");
  const [chartOptions, setChartOptions] = useState({});
  const [fileName, setFileName] = useState("");

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: ".xlsx,.xls,.csv",
    customRequest: async ({ file, onSuccess, onError }) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:8000/api/upload-excel",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const { data, headers } = response.data;

        // Transform data for Antd Table
        const tableColumns = headers.map((header) => ({
          title: header,
          dataIndex: header,
          key: header,
        }));

        const tableRows = data.map((row, index) => ({
          key: index,
          ...row,
        }));

        setColumns(tableColumns);
        setTableData(tableRows);
        setFileName(file.name);
        message.success(`${file.name} uploaded successfully.`);
        onSuccess();
      } catch (error) {
        message.error(`${file.name} upload failed: ${error.message}`);
        onError();
      }
    },
  };

  const handleGenerateChart = () => {
    if (!selectedXAxis || !selectedYAxis) {
      message.error("Please select both X and Y axis");
      return;
    }

    const xAxisData = tableData.map((item) => item[selectedXAxis]);
    const yAxisData = tableData.map((item) => parseFloat(item[selectedYAxis]));

    const options = {
      chart: {
        type: chartType,
      },
      title: {
        text: `${selectedYAxis} by ${selectedXAxis}`,
      },
      xAxis: {
        categories: xAxisData,
        title: {
          text: selectedXAxis,
        },
      },
      yAxis: {
        title: {
          text: selectedYAxis,
        },
      },
      series: [
        {
          name: selectedYAxis,
          data: yAxisData,
        },
      ],
    };

    setChartOptions(options);
  };

  const exportToExcel = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/export-excel",
        {
          data: tableData,
          fileName: fileName || "exported-data",
        },
        {
          responseType: "blob",
        }
      );

      console.log("Export response:", response);

      saveAs(
        new Blob([response.data]),
        `${fileName || "exported-data"}-${new Date().getTime()}.xlsx`
      );
      message.success("Data exported successfully!");
    } catch (error) {
      message.error("Failed to export data: " + error.message);
    }
  };

  const exportChartAsImage = () => {
    // This requires Highcharts exporting module to be loaded
    const chart = document.querySelector(".highcharts-container");
    if (chart) {
      const link = document.createElement("a");
      link.download = `chart-${new Date().getTime()}.png`;
      link.href = chart.querySelector("svg").outerHTML;
      link.click();
    }
  };

  return (
    <div className="data-visualizer-container">
      <Card title="Upload Excel Data" className="upload-card">
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag Excel file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for single Excel file upload (.xlsx, .xls, .csv)
          </p>
        </Dragger>
      </Card>

      {/* {console.log("Table Data:", tableData)} */}
      {tableData.length > 0 && (
        <>
          <Card title="Data Preview" className="data-card">
            <Table
              columns={columns}
              dataSource={tableData}
              scroll={{ x: true }}
              pagination={{ pageSize: 5 }}
            />
            <Button
              type="primary"
              onClick={exportToExcel}
              className="export-btn"
            >
              Export to Excel
            </Button>
          </Card>

          <Card title="Create Chart" className="chart-card">
            <div className="chart-controls">
              <div>
                <label>Select X-Axis:</label>
                <Select
                  style={{ width: 200, marginLeft: 10 }}
                  value={selectedXAxis}
                  onChange={setSelectedXAxis}
                >
                  {columns.map((col) => (
                    <Option key={col.dataIndex} value={col.dataIndex}>
                      {col.title}
                    </Option>
                  ))}
                </Select>
              </div>

              <div>
                <label>Select Y-Axis:</label>
                <Select
                  style={{ width: 200, marginLeft: 10 }}
                  value={selectedYAxis}
                  onChange={setSelectedYAxis}
                >
                  {columns.map((col) => (
                    <Option key={col.dataIndex} value={col.dataIndex}>
                      {col.title}
                    </Option>
                  ))}
                </Select>
              </div>

              <div>
                <label>Chart Type:</label>
                <Select
                  style={{ width: 200, marginLeft: 10 }}
                  value={chartType}
                  onChange={setChartType}
                >
                  <Option value="line">Line</Option>
                  <Option value="bar">Bar</Option>
                  <Option value="column">Column</Option>
                  <Option value="area">Area</Option>
                  <Option value="pie">Pie</Option>
                </Select>
              </div>

              <Button type="primary" onClick={handleGenerateChart}>
                Generate Chart
              </Button>
            </div>

            <div className="chart-container">
              {/* {console.log(
                "chartOptions :",
                chartOptions,
                "Highcharts :",
                Highcharts
              )} */}
              {Object.keys(chartOptions).length > 0 && (
                <>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                  />
                  <Button
                    onClick={exportChartAsImage}
                    className="export-chart-btn"
                  >
                    Export Chart as Image
                  </Button>
                </>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default DataVisualizer;
